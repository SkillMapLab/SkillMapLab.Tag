export interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  getById(id: string): Promise<T>;
  insert(item: T): Promise<void>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
