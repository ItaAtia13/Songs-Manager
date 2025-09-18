import { Song } from '../types/song.types';
import { apiService } from './api.service';

class SongService {
  async getAllSongs(): Promise<Song[]> {
    return await apiService.get<Song[]>('/songs');
  }

  async uploadCSV(file: File): Promise<{ message: string; count: number; songs: Song[] }> {
    const formData = new FormData();
    formData.append('file', file);
    return await apiService.postFormData('/songs/upload-csv', formData);
  }
}

export const songService = new SongService();