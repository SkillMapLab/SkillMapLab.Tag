import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CreateTagDto, TagDtoInfo, UpdateTagDto } from './application/dto';
import { GetTagByIdQuery, GetTagByKeyQuery, GetTagsQuery } from './application/queries';
import { CreateTagCommand, DeleteTagCommand, UpdateTagCommand } from './application/commands';
@Injectable()
export class TagService {
  constructor(
    @InjectMapper('classes') private mapper: Mapper,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) { }

  async GetAll(status: number): Promise<TagDtoInfo[]> {
    return await this.queryBus.execute(new GetTagsQuery(status));
  }

  async GetById(id: string): Promise<TagDtoInfo> {
    return await this.queryBus.execute(new GetTagByIdQuery(id));
  }

  async GetByKey(key: string): Promise<TagDtoInfo[]> {
    return await this.queryBus.execute(new GetTagByKeyQuery(key));
  }

  async Create(tag: CreateTagDto): Promise<void> {
    const command = await this.mapper.mapAsync(tag, CreateTagDto, CreateTagCommand);

    await this.commandBus.execute(command);
  }

  async CreateBatch(tags: CreateTagDto[]): Promise<void> {
    const commands = await this.mapper.mapArrayAsync(tags, CreateTagDto, CreateTagCommand);

    await this.commandBus.execute(commands);
  }

  async Update(id: string, tag: UpdateTagDto): Promise<void> {
    const command = await this.mapper.mapAsync(tag, UpdateTagDto, UpdateTagCommand);
    command.id = id;

    return await this.commandBus.execute(command);
  }

  async Delete(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteTagCommand(id));
  }

}