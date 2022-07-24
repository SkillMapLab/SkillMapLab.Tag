import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';


import { CreateTagCommand, UpdateTagCommand } from 'src/tag/application/commands';
import { TagDomain } from 'src/tag/domain';
import { TagModel } from 'src/tag/infrastructure/database/models';
import { CreateTagDto, TagDtoInfo, UpdateTagDto } from '../dto';

@Injectable()
export class TagsProfile extends AutomapperProfile {
  constructor(@InjectMapper('classes') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, TagModel, TagDtoInfo,
        forMember((d) => d.id, mapFrom((s) => s.id)),
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        forMember(
          (d) => d.status,
          mapFrom((s) => GetStatusName(s.status))
        )
      );
       createMap(mapper, TagDomain, TagDtoInfo,
        forMember((d) => d.id, mapFrom((s) => s.id)),
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        forMember(
          (d) => d.status,
          mapFrom((s) => GetStatusName(s.status))
        )
      );
      createMap(mapper, CreateTagDto, TagModel,
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),        
      );
      createMap(mapper, CreateTagDto, CreateTagCommand,
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
              );
      createMap(mapper, UpdateTagDto, UpdateTagCommand,
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),
        
      );
      createMap(mapper, TagDomain, TagModel,
        forMember((d) => d.id, mapFrom((s) => s.id)),
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),        
      )
        createMap(mapper, TagModel, TagDomain,
        forMember((d) => d.id, mapFrom((s) => s.id)),
        forMember((d) => d.key, mapFrom((s) => s.key)),
        forMember((d) => d.name, mapFrom((s) => s.name)),        
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