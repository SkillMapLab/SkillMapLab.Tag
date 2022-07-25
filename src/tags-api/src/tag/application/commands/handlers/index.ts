import { CreateTagCommandHandler } from './create-tag.handler';
import { UpdateTagCommandHandler } from './update-tagname.handler';
import { DisableTagCommandHandler } from './disable-tag.handler';
import { EnableTagCommandHandler } from './enable-tag.handler';

export const CommandHandlers = [CreateTagCommandHandler, UpdateTagCommandHandler, DisableTagCommandHandler]