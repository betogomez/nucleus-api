export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly picture: string,
    public readonly createdAt: Date,
  ) { }
}
