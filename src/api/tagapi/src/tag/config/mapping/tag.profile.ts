import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingConfiguration, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { TagDtoInfo } from 'src/tag/application';

@Injectable()
export class TagsProfile extends AutomapperProfile {
  constructor(@InjectMapper('classes') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, Tag, TagDtoInfo,
        forMember(
          (d) => d.status,
          mapFrom((s) => GetStatus(s.status))
        )
      );
    };
  }
}


const GetStatus = (value: number): string => {
  switch (value) {
    case 1:
      return "Active"
      break;
    default:
      return "Inactive"
      break;
  }
}