import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './components/items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Appdb'),
    ItemsModule
  ],
})

export class AppModule {}
