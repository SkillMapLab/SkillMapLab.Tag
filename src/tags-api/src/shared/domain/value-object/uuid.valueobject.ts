import { v4 as uuidv4 } from 'uuid';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static generate(): string {
    return uuidv4().toString();
  }

  toString(): string {
    return this.value;
  }
}
