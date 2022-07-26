export enum TagEvents {
  CREATED = 'TAG.CREATED',
  ENABLED = 'TAG.ENABLED',
  DISABLED = 'TAG.DISABLED',
  DELETED = 'TAG.DELETED',
}

export enum CommonQueues {
  TagsQueue = 'tags',
  TagsEventsQueue = 'tags.events',
}

export enum MessageTagEventsPatterns {
  CREATE = 'CREATE_TAG_EVENT',
}

export enum MessageTagPatterns {
  CREATE = 'CREATE_TAG',
  CREATE_BATCH = 'CREATE_BATCH',
  ENABLE = 'ENABLE_TAG',
  DISABLE = 'DISABLE_TAG',
  DELETE = 'DELETE_TAG',
}
