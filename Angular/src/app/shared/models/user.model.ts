export class User {
  _id?: string = '';
  username: string = '';
  name: string = '';
  surname: string = '';
  address: string = '';
  phone!: Number;
  email: string = '';
  password: string = '';
  role?: string;
  birthday: Date = new Date();
  xChangedItems: number = 0;
  state: string = '';
  bio: string = '';
}
