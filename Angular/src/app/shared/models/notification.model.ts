import { Product } from "./product.model";

export class Notification {
  _id!: string;
  body!: string;
  date!: Date;
  read!: boolean;
  receiver!: string;
  sender!: string;
  senderUsername!: string;
  receiverUsername!: string;
  offeredProducts!: Product[];
  requestedProduct!: Product;
  notificationType!: string;
}
