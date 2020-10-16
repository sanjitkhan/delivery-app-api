import { prop } from "@typegoose/typegoose";
import { CategoryDto } from "./category.dto";

export class Category implements CategoryDto {
  id: string;

  @prop()
  name: string;
}