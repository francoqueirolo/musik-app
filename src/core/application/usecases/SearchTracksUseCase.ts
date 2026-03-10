import { Track } from '../../domain/entities/Track';
import { ITrackRepository } from '../../domain/repositories/ITrackRepository';

export class SearchTracksUseCase {
  constructor(private trackRepository: ITrackRepository) {}

  async execute(query: string): Promise<Track[]> {
    if (!query.trim()) {
      return [];
    }
    
    const sanitizedQuery = query.trim().toLowerCase();
    return await this.trackRepository.search(sanitizedQuery);
  }
}