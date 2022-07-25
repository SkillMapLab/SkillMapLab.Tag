import { StringValueObject } from "src/shared/domain/value-object/string.valueobject";

export class Key extends StringValueObject{

  guard(): boolean {    
    if (this.value.length <= 0) return true;
    if (this.value.length > 10) return true;
  }
}