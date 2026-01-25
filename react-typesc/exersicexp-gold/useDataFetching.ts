import { useState, useEffect, useRef } from 'react';

// Define the cache entry structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Define the cache storage type
type Cache = {
  [key: string]: CacheEntry<any>;
};

// Define the hook configuration
export interface UseDataFetchingConfig {
  maxAge: number; // Cache expiration time in milliseconds
}

// Define the hook return type
export interface UseDataFetchingReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  invalidateCache: () => void;
  cacheInfo: {
    isCached: boolean;
    cacheAge: number | null;
  };
}

// In-memory cache shared across all hook instances
const globalCache: Cache = {};

/**
 * Custom hook for data fetching with caching
 * Implements cache validation and invalidation logic
 */
export function useDataFetching<T>(
  url: string,
  config: UseDataFetchingConfig
): UseDataFetchingReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if cached data is still valid
  const isCacheValid = (cacheEntry: CacheEntry<T> | undefined): boolean => {
    if (!cacheEntry) return false;
    const age = Date.now() - cacheEntry.timestamp;
    return age < config.maxAge;
  };

  // Get cache age in milliseconds
  const getCacheAge = (): number | null => {
    const cacheEntry = globalCache[url] as CacheEntry<T> | undefined;
    if (!cacheEntry) return null;
    return Date.now() - cacheEntry.timestamp;
  };

  // Fetch data from the API
  const fetchData = async (bypassCache = false): Promise<void> => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    // Check cache first (unless bypassing)
    if (!bypassCache) {
      const cacheEntry = globalCache[url] as CacheEntry<T> | undefined;
      if (isCacheValid(cacheEntry)) {
        console.log(`[useDataFetching] Using cached data for ${url}`);
        setData(cacheEntry.data);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Fetch from API
    console.log(`[useDataFetching] Fetching fresh data from ${url}`);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchedData: T = await response.json();

      // Update cache
      globalCache[url] = {
        data: fetchedData,
        timestamp: Date.now(),
      };

      if (isMountedRef.current) {
        setData(fetchedData);
        setError(null);
      }
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      if (isMountedRef.current) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  // Invalidate cache for this URL
  const invalidateCache = (): void => {
    console.log(`[useDataFetching] Invalidating cache for ${url}`);
    delete globalCache[url];
  };

  // Refetch data (bypass cache)
  const refetch = async (): Promise<void> => {
    await fetchData(true);
  };

  // Fetch data on mount or when URL changes
  useEffect(() => {
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      // Cancel ongoing request on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, config.maxAge]);

  const cacheEntry = globalCache[url] as CacheEntry<T> | undefined;

  return {
    data,
    loading,
    error,
    refetch,
    invalidateCache,
    cacheInfo: {
      isCached: !!cacheEntry,
      cacheAge: getCacheAge(),
    },
  };
}
