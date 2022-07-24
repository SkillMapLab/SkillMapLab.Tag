import { Nullable } from './nullable.domain';

export interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  getById(id: string): Promise<Nullable<T>>;
  insert(item: T): Promise<void>;
  save(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
