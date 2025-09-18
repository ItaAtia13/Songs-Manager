export interface Song {
  id: string;
  title: string;
  band: string;
  album?: string;
  year?: number;
  genre?: string;
  createdAt: string;
  updatedAt: string;
}