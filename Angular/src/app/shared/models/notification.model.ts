import { User } from "./user.model";

export class Notification {
  _id!: string;
  body!: string;
  date!: Date;
  read!: boolean;
  receiver!: string;
  sender!: string;
  senderUsername!: string;
  receiverUsername!: string;
}