import { IRepository } from "src/shared/domain";
import { TagDomain } from ".";

export interface ITagRepository extends IRepository<TagDomain> {
  getAll(): Promise<TagDomain[]>;
  getById(id: string): Promise<TagDomain>;
  getByKey(key: string): Promise<TagDomain[]>;
  insert(tag: TagDomain): Promise<void>;
  insertBatch(tags: TagDomain[]): Promise<void>;
  update(id: string, tag: TagDomain): Promise<void>;
  delete(id: string): Promise<void>;
} 