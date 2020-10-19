import { prop } from "@typegoose/typegoose";
import { UserDto } from "./user.dto";

export class User implements UserDto {
  id: string;

  @prop()
  username: string;

  @prop()
  password: string;
}