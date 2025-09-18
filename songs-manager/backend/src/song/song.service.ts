import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { CsvParserUtil } from '../utils/csv-parser.util';

@Injectable()
export class SongService {
  private readonly logger = new Logger(SongService.name);

  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly csvParserUtil: CsvParserUtil,
  ) {}

  async processCSVFile(filePath: string): Promise<Song[]> {
    this.logger.log(`Processing CSV file: ${filePath}`);

    try {
      const csvData = await this.csvParserUtil.parseCSVFile(filePath);
      const songs: Song[] = [];

      for (const row of csvData) {
        try {
          const songData = this.transformCSVRowToSong(row);
          const song = await this.create(songData);
          songs.push(song);
        } catch (error) {
          this.logger.warn(`Failed to process row: ${JSON.stringify(row)}`, error.message);
        }
      }

      this.logger.log(`Successfully processed ${songs.length} songs from CSV`);
      return songs;
    } catch (error) {
      this.logger.error('Failed to process CSV file', error);
      throw new BadRequestException(`Failed to process CSV file: ${error.message}`);
    }
  }

  private transformCSVRowToSong(row: any): CreateSongDto {
    return {
      title: (row['song name'] || row.title || '').toString().toLowerCase().trim(),
      band: (row.band || row.artist || '').toString().toLowerCase().trim(),
      album: row.album ? row.album.toString().toLowerCase().trim() : undefined,
      year: row.year ? parseInt(row.year.toString()) : undefined,
      genre: row.genre ? row.genre.toString().toLowerCase().trim() : undefined,
    };
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    try {
      const song = this.songRepository.create(createSongDto);
      return await this.songRepository.save(song);
    } catch (error) {
      this.logger.error('Failed to create song', error);
      throw new BadRequestException('Failed to create song');
    }
  }

  async findAll(): Promise<Song[]> {
    try {
      return await this.songRepository.find({
        order: {
          band: 'ASC',
          title: 'ASC',
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch songs', error);
      throw new BadRequestException('Failed to fetch songs');
    }
  }

  async clearAll(): Promise<void> {
    try {
      await this.songRepository.clear();
      this.logger.log('All songs cleared from database');
    } catch (error) {
      this.logger.error('Failed to clear songs', error);
      throw new BadRequestException('Failed to clear songs');
    }
  }
}