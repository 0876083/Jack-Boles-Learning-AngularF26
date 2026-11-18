import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumLabel',
})
export class AlbumLabelPipe implements PipeTransform {
  transform(album: unknown, artist: unknown): string {
    if (typeof album !== 'string' || !album.trim()) {
      return 'Unknown Album';
    }

    if (typeof artist !== 'string' || !artist.trim()) {
      return album;
    }
    return `${album} - ${artist}`;
  }
}
