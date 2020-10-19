import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { UserService } from './user.service';
import { schemaOptions } from '../../config';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: User, schemaOptions }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
