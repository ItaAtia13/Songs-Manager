import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  band: string;

  @IsOptional()
  @IsString()
  album?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  genre?: string;
}