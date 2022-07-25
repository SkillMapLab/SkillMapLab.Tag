import { StringValueObject } from "src/shared/domain/value-object/string.valueobject";

export class Name extends StringValueObject {
  guard(): boolean {
    if (this.value && this.value.toString().length <= 0) return true;   
  }
}