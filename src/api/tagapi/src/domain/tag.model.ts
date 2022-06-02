export class Tag {
  Key: string;
  Name: string;
  Description: string;

  constructor(
    public key: string,
    public name: string,
    public description: string,
  ) {
    this.Key = key;
    this.Name = name;
    this.Description = description;
  }
}
