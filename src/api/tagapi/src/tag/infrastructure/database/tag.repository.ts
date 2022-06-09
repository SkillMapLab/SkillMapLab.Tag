import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tag } from "./schemas";
import { Tag as TagModel } from '../../domain'
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

@Injectable()
export class TagRepository {
  constructor(private repository: Repository<Tag>,
    @InjectMapper('classes') private mapper: Mapper) { }

  async FindAll(status: number): Promise<TagModel[]> {
    const data = await this.repository.find({ where: { status } });

    return await this.mapper.mapArrayAsync(data, Tag, TagModel);
  }

  async FindById(id: string): Promise<TagModel> {
    const data = await this.repository.findOneBy({ id });

    return await this.mapper.mapAsync(data, Tag, TagModel);
  }

  async FindByKey(key: string): Promise<TagModel> {
    const data = await this.repository.findOneBy({ key });

    return await this.mapper.mapAsync(data, Tag, TagModel);
  }

  async Insert(model: TagModel): Promise<void> {
    const data = await this.mapper.mapAsync(model, TagModel, Tag);

    await this.repository.insert(data)
  }

  async InsertMultiple(models: TagModel[]): Promise<void> {
    const data = await this.mapper.mapArrayAsync(models, TagModel, Tag);

    await this.repository.insert(data);
  }

  async Update(id: string, model: TagModel): Promise<void> {
    const dataFound = await this.FindById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    const dataToUpdate = await this.mapper.mapAsync(model, Tag, TagModel);

    await this.repository.update({ id }, dataToUpdate);
  }

  async Delete(id: string): Promise<void> {
    const dataFound = await this.FindById(id);

    if (!dataFound) throw new Error("Tag does not exists.");

    await this.repository.delete({ id });
  }

}