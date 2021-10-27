export default interface PagedResponse<T> {
  result: T[];
  total: number;
}