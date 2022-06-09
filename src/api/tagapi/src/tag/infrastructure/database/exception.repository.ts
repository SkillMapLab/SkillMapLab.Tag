import { InternalServerErrorException } from "@nestjs/common";

export class DatabaseException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}