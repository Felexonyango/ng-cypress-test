import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './book/book.module';
@Module({
  imports: [
    
     MongooseModule.forRoot('mongodb://localhost:27017/book'),
    UserModule,
    BooksModule
  
  
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
