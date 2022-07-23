import { CreateTagCommandHandler } from './create-tag.handler';
import { UpdateTagCommandHandler } from './update-tag-handler';
import { DeleteTagCommandHandler } from './delete-tag.handler';

export const CommandHandlers = [CreateTagCommandHandler, UpdateTagCommandHandler, DeleteTagCommandHandler]