import { prop } from "@typegoose/typegoose";
import { Brand, Category, ProductDto } from "./product.dto";

export class Product implements ProductDto {
  id: string;

  @prop()
  name: string;

  @prop({
    enum: Brand
  })
  brand: Brand;

  @prop({
    _id: false,
    enum: Category,
    type: String
  })
  categories?: Category[];

  @prop({
    default: 0
  })
  stock?: number;

  @prop()
  price: number;
}