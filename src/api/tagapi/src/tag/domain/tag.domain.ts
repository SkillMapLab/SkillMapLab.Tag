export class Tag {
  Key: string;
  Name: string;
  Description: string;

  private constructor(
    public key: string,
    public name: string,
    public description: string,
  ) {
    this.Key = key;
    this.Name = name;
    this.Description = description;
  }

  static CreateTag(key: string, name: string, description: string = ''): Tag {
    return new Tag(key, name, description);
  }
}
