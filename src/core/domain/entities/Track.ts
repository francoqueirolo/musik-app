export class Track {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly duration: number,
    public readonly url: string,
    public readonly albumArt?: string
  ) {
    this.validateTrack();
  }

  private validateTrack(): void {
    if (!this.id || !this.title || !this.artist || !this.url) {
      throw new Error('Track data is invalid');
    }
    if (this.duration <= 0) {
      throw new Error('Duration must be positive');
    }
  }

  get formattedDuration(): string {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}