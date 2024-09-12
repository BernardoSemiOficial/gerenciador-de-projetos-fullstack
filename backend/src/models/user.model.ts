export class UserClient {
  public id: string;
  constructor(
    publicId: string,
    public email: string,
    public name: string,
    public created_at: Date,
    public updated_at: Date
  ) {
    this.id = publicId;
  }
}
