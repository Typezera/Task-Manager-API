import { Exclude, Expose } from 'class-transformer';
export class ReadUserDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  createdAt: Date;
  //jwt <-- future
}
