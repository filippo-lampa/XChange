import { User } from "./user.model";

export class Notification {
  senderId!: String;
  receiverId!: String;
  body!: String;
  date!: Date;
  read!: boolean;
  senderDetails!: User;
  receiverDetails!: User;
}
