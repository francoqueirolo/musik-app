import { Track } from '../entities/Track';

export interface ITrackRepository {
  findById(id: string): Promise<Track | null>;
  findAll(): Promise<Track[]>;
  search(query: string): Promise<Track[]>;
  save(track: Track): Promise<void>;
}