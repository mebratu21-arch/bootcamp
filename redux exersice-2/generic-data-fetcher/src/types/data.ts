export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
