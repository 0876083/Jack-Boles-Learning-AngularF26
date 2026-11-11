import { computed, inject, Injectable, signal } from '@angular/core';
import { Record } from '../shared/models/record';
import { RECORD_CONFIG } from '../shared/record-config';

@Injectable()
export class MockRecordService {
  private config = inject(RECORD_CONFIG);

  private records = signal<Record[]>([
    {
      collectionId: 1,
      artistName: 'Mock Artist 1',
      collectionName: 'Mock Title 1',
      primaryGenreName: 'Rock',
      releaseDate: '2026',
      artworkUrl100: 'images/colour-and-shape.jpg'
    },
    {
      collectionId: 2,
      artistName: 'Mock Artist 2',
      collectionName: 'Mock Title 2',
      primaryGenreName: 'Grunge',
      releaseDate: '2026',
      artworkUrl100: 'images/in-utero.jpg'
    },
    {
      collectionId: 3,
      artistName: 'Mock Artist 3',
      collectionName: 'Mock Title 3',
      primaryGenreName: 'Punk',
      releaseDate: '2025',
      artworkUrl100: 'images/dookie.jpg'
    }
  ]);

  readonly recordList = this.records.asReadonly();

  addRecord(r: Record): void {
    this.records.update((list) => [...list, r]);
  }

  removeRecord(id: number | string): void {
    this.records.update(list => list.filter(record => record.collectionId !== id));
  }

  updateRecord(r: Record): void {
    this.records.update(records =>
      records.map(record =>
        record.collectionId === r.collectionId ? r : record
      )
    );
  }

  readonly defaultGenre = this.config.defaultGenre;

  readonly rockRecords = computed(() =>
    this.records().filter(
      record => record.primaryGenreName === this.config.defaultGenre
    )
  );

  readonly rockRecordCount = computed(() =>
    this.rockRecords().length
  );

  readonly recordsWithYear = computed(() =>
    this.records().filter(record => record.releaseDate)
  );
}
