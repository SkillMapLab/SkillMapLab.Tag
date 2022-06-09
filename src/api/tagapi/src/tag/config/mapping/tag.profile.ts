import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingConfiguration, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { CreateTagDto, TagDtoInfo } from 'src/tag/application';
import { CreateTagCommand } from 'src/tag/application/commands';
import { TagDomain } from 'src/tag/domain';

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
          mapFrom((s) => GetStatusName(s.status))
        )
      );
      createMap(mapper, CreateTagDto, Tag,
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        forMember((d) => d.description, mapFrom((s) => s.description)),
      );
      createMap(mapper, CreateTagDto, CreateTagCommand,
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        forMember((d) => d.description, mapFrom((s) => s.description)),
      );
      createMap(mapper, TagDomain, Tag,
        forMember((d) => d.id, mapFrom((s) => s.id)),
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        forMember((d) => d.description, mapFrom((s) => s.description)),
      )
    };
  }
}


const GetStatusName = (value: number): string => {
  switch (value) {
    case 1:
      return "Active"
      break;
    default:
      return "Inactive"
      break;
  }
}