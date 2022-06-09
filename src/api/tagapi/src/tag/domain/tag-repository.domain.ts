import { TagDomain } from ".";

export interface ITagRepository {
  GetAll(status: number): Promise<TagDomain[]>;
  GetById(id: string): Promise<TagDomain>;
  GetByKey(key: string): Promise<TagDomain[]>;
  Insert(tag: TagDomain): Promise<void>;
  InsertMultiple(tags: TagDomain[]): Promise<void>;
  Update(id: string, tag: TagDomain): Promise<void>;
  Delete(id: string): Promise<void>;
} 