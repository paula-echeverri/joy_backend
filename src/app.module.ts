import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat-wth-joy'),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule {
  constructor() {
    // Add this to check if Mongoose connects successfully
    const mongoose = require('mongoose');
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection successful');
    });
    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
    });
  }
}
