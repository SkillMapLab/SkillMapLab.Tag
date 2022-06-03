import { TagDto } from './tag.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTagDto extends PartialType(TagDto) {}
