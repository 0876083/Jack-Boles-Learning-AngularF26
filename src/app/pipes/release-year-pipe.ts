import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseYear',
})
export class ReleaseYearPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== 'string' || !value.trim()) {
      return 'Unknown';
    }

    return value.substring(0, 4);
  }
}
