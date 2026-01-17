import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchStart, fetchSuccess, fetchError } from '../features/dataSlice';

interface DataFetcherProps<T> {
  url: string;
  render: (data: T) => React.ReactNode;
}

function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        dispatch(fetchSuccess(result));
      } catch (err: any) {
        dispatch(fetchError(err.message));
      }
    };

    fetchData();
  }, [url, dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  return <div className="data-container">{render(data as T)}</div>;
}

export default DataFetcher;
