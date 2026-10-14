import { computed, inject, Injectable, signal } from '@angular/core';
import { Record } from '../shared/models/record';
import { RECORD_CONFIG } from '../shared/record-config';

@Injectable()
export class MockRecordService {
  private config = inject(RECORD_CONFIG);

  private records = signal<Record[]>([
    {
      id: 1,
      artist: 'Mock Artist 1',
      title: 'Mock Title 1',
      genre: 'Rock',
      yearReleased: 2026,
      image: 'images/colour-and-shape.jpg'
    },
    {
      id: 2,
      artist: 'Mock Artist 2',
      title: 'Mock Title 2',
      genre: 'Grunge',
      yearReleased: 2026,
      image: 'images/in-utero.jpg'
    },
    {
      id: 3,
      artist: 'Mock Artist 3',
      title: 'Mock Title 3',
      genre: 'Punk',
      image: 'images/dookie.jpg'
    }
  ]);

  readonly recordList = this.records.asReadonly();

  addRecord(r: Record): void {
    this.records.update((list) => [...list, r]);
  }

  removeRecord(id: number | string): void {
    this.records.update(list => list.filter(record => record.id !== id));
  }

  readonly defaultGenre = this.config.defaultGenre;

  readonly rockRecords = computed(() =>
    this.records().filter(
      record => record.genre === this.config.defaultGenre
    )
  );

  readonly rockRecordCount = computed(() =>
    this.rockRecords().length
  );

  readonly recordsWithYear = computed(() =>
    this.records().filter(record => record.yearReleased)
  );
}
