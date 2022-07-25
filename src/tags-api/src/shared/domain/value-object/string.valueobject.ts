export abstract class StringValueObject {
  readonly value: string;

  constructor(value: string) {
    if (this.guard) 
      throw new Error(`Value ${this.constructor.name} is not valid`);

    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  abstract guard(): boolean; 
}
