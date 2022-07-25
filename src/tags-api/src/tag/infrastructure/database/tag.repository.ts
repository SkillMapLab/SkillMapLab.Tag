import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ITagRepository, TagDomain } from "src/tag/domain";
import { TagModel } from "src/tag/infrastructure/database/models";
import { DatabaseException } from "./database.exception";


@Injectable()
export class TagRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagModel)
    private repository: Repository<TagModel>,
    @InjectMapper('classes') private mapper: Mapper) { }

  async getAll(): Promise<TagDomain[]> {
    try {
      const dataModel = await this.repository.find();           

      return await this.mapper.mapArrayAsync(dataModel, TagModel, TagDomain);
    } catch (error) {      
      throw new DatabaseException(error.message);
    }
  }

  async getById(id: string): Promise<TagDomain> {
    try {
      const dataModel = await this.repository.findOneBy({ id });

      return await this.mapper.mapAsync(dataModel, TagModel, TagDomain);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async getByKey(key: string): Promise<TagDomain[]> {
    try {
      const dataModel = await this.repository.findBy({ key });

      return await this.mapper.mapArrayAsync(dataModel, TagModel, TagDomain)
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async insert(model: TagDomain): Promise<void> {
    try {
      const data = await this.mapper.mapAsync(model, TagDomain, TagModel);

      await this.repository.insert(data)
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async insertBatch(models: TagDomain[]): Promise<void> {
    try {
      const data = await this.mapper.mapArrayAsync(models, TagDomain, TagModel);

      await this.repository.insert(data);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async update(id: string, model: TagDomain): Promise<void> {
    const dataFound = await this.getById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    try {
      const dataToUpdate = await this.mapper.mapAsync(model, TagDomain, TagModel);

      await this.repository.update({ id }, dataToUpdate);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const dataFound = await this.getById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

}