import { Category } from "./category.model";

export class Product {
  name!: string;
  _id?: string;
  category!: string;
  description!: string;
  views!: Number;
  uploadDate!: Date;
  interestedUsers?: Number;
  imageUrl!: string;
  sellerId!: string;
}
