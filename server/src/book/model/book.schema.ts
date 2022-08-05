
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  name: string;
  @Prop()
  price: number;
  @Prop()
  descripton:string;

}
export const BookSchema = SchemaFactory.createForClass(Book);
