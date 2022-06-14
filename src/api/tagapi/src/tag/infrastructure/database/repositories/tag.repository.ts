import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ITagRepository, TagDomain } from "src/tag/domain";
import { TagModel } from "src/tag/infrastructure/database/models";
import { DatabaseException } from "src/tag/infrastructure/database/exceptions";


@Injectable()
export class TagRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagModel)
    private repository: Repository<TagModel>,
    @InjectMapper('classes') private mapper: Mapper) { }

  async GetAll(status: number): Promise<TagDomain[]> {
    try {
      const dataModel = await this.repository.find({
        where: {
          status
        },
      })

      return await this.mapper.mapArrayAsync(dataModel, TagModel, TagDomain);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async GetById(id: string): Promise<TagDomain> {
    try {
      const dataModel = await this.repository.findOneBy({ id });

      return await this.mapper.mapAsync(dataModel, TagModel, TagDomain);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async GetByKey(key: string): Promise<TagDomain[]> {
    try {
      const dataModel = await this.repository.findBy({ key });

      return await this.mapper.mapArrayAsync(dataModel, TagModel, TagDomain)
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async Insert(model: TagDomain): Promise<void> {
    try {
      const data = await this.mapper.mapAsync(model, TagDomain, TagModel);

      await this.repository.insert(data)
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async InsertMultiple(models: TagDomain[]): Promise<void> {
    try {
      const data = await this.mapper.mapArrayAsync(models, TagDomain, TagModel);

      await this.repository.insert(data);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async Update(id: string, model: TagDomain): Promise<void> {
    const dataFound = await this.GetById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    try {
      const dataToUpdate = await this.mapper.mapAsync(model, TagDomain, TagModel);

      await this.repository.update({ id }, dataToUpdate);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async Delete(id: string): Promise<void> {
    const dataFound = await this.GetById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

}