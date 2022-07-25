export abstract class StringValueObject {
  private _value : string;
  public get value() : string {
    return this._value;
  }

  public set value(v : string) {
    if (this.guard()) 
      throw new Error(`Invalid value: ${this._value}`);

    this._value = v;
  }
  
  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  abstract guard(): boolean; 
}
