import { useState, useEffect, useCallback } from 'react';
import { Song } from '../types/song.types';
import { songService } from '../services/song.service';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedSongs = await songService.getAllSongs();
      setSongs(fetchedSongs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch songs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs,
    loading,
    error,
    refetchSongs: fetchSongs,
  };
};