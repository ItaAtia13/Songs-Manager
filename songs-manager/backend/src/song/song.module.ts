import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { CsvParserUtil } from '../utils/csv-parser.util';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService, CsvParserUtil],
})
export class SongModule {}