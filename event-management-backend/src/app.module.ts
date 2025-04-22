import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event/event.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 Makes config available everywhere

    MongooseModule.forRoot('mongodb://localhost:27017/event-management'),
    UserModule,
    EventModule,
  ],
})
export class AppModule {}
