import { Module } from '@nestjs/common';
import { BooksService } from './service/book.service';
import { BooksController } from './controller/book.controller';

import {MongooseModule} from '@nestjs/mongoose';
import {BookSchema,Book} from './model/book.schema';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema}]),
  ],
})
export class BooksModule {}
