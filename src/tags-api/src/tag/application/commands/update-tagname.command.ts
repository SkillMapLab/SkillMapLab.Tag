import { TagIdCommand } from "./tag-id.command";

export class ChangeTagNameCommand extends TagIdCommand{
  constructor(public id: string, public key: string, public name: string) {
    super(id)
   }
}