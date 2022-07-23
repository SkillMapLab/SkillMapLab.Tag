import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateTagDto, UpdateTagDto } from './dtos';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TagsService {
  private Url = this.configService.get('HTTP_USERAPI_URL');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<any> {
    return this.httpService.post(`${this.Url}/tags`, createTagDto);
  }

  async createBatch(createTagDtos: CreateTagDto[]): Promise<any> {
    return this.httpService.post(`${this.Url}/tags/batch`, createTagDtos);
  }

  update(updateTagDto: UpdateTagDto) {
    return this.httpService.put(
      `${this.Url}/tags/${updateTagDto.id}`,
      updateTagDto,
    );
  }

  delete(id: string) {
    return this.httpService.delete(`${this.Url}/tags/${id}`);
  }
}
