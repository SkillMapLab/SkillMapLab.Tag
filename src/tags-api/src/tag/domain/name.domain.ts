import { StringValueObject } from "src/shared/domain/value-object/string.valueobject";

export class Name extends StringValueObject {
  guard(): boolean {
    if (this.value.length <= 0) return true;   
  }
}