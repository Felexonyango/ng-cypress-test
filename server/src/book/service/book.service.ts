import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../model/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly model:Model <Book>){}

  async create(createBookDto: CreateBookDto) {
    return await (
      await this.model.create({
        ...createBookDto,
        createdAt: new Date(),
      })
    ).save();
  }

   async findAll():Promise<Book[]> {
    return  await  this.model.find()
  }


  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id:string, updateBookDto: UpdateBookDto) {
    return  await this.model.findByIdAndUpdate(id,updateBookDto)
  }

   async remove(id: string) {
    return   await this.model.findByIdAndRemove(id)
  }
}
