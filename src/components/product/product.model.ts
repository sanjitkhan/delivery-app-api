import { prop } from "@typegoose/typegoose";
import { Brand } from "../brand/brand.model";
import { Category } from "../category/category.model";
import { ProductDto } from "./product.dto";

export class Product implements ProductDto {
  id: string;

  @prop()
  name: string;

  @prop({ ref: () => Brand })
  brand: string;

  @prop({
    _id: false,
    ref: () => Category,
    type: String
  })
  categories?: string[];

  @prop({
    default: 0
  })
  stock?: number;

  @prop()
  price: number;
}