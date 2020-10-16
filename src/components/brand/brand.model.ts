import { prop } from "@typegoose/typegoose";
import { BrandDto } from "./brand.dto";

export class Brand implements BrandDto {
  id: string;

  @prop()
  name: string;
}