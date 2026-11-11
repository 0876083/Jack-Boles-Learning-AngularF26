import { computed, inject, Injectable, effect, signal } from '@angular/core';
import { Record } from '../shared/models/record';
import { RECORD_CONFIG } from '../shared/record-config';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private config = inject(RECORD_CONFIG);

  private records = signal<Record[]>([
    {
      collectionId: 1,
      artistName: 'Foo Fighters',
      collectionName: 'The Colour and the Shape',
      primaryGenreName: 'Rock',
      releaseDate: '1997',
      artworkUrl100: 'images/colour-and-shape.jpg'
    },
    {
      collectionId: 2,
      artistName: 'Nirvana',
      collectionName: 'In Utero',
      primaryGenreName: 'Grunge',
      releaseDate: '1993',
      artworkUrl100: 'images/in-utero.jpg'
    },
    {
      collectionId: 3,
      artistName: 'Green Day',
      collectionName: 'Dookie',
      primaryGenreName: 'Punk',
      releaseDate: '1994',
      artworkUrl100: 'images/dookie.jpg',
    },
    {
      collectionId: 4,
      artistName: 'Queens of the Stone Age',
      collectionName: 'Songs for the Deaf',
      primaryGenreName: 'Rock',
      releaseDate: '2002',
      artworkUrl100: 'images/songs-for-the-deaf.jpg'
    },
    {
      collectionId: 5,
      artistName: 'The Beatles',
      collectionName: 'Abbey Road',
      primaryGenreName: 'Rock',
      releaseDate: '1969',
      artworkUrl100: 'images/abbey-road.jpg'
    },
    {
      collectionId: 6,
      artistName: 'Red Hot Chili Peppers',
      collectionName: 'Californication',
      primaryGenreName: 'Rock',
      releaseDate: '1999',
      artworkUrl100: 'images/californication.jpg'
    }
  ]);

  readonly recordList = this.records.asReadonly();
  readonly defaultGenre = this.config.defaultGenre;

  addRecord(r: Record): void {
    this.records.update(list => [...list, r]);
  }

  removeRecord(id: number | string): void {
    this.records.update(list => list.filter(record => record.collectionId !== id));
  }

  updateRecord(updatedRecord: Record): void {
    this.records.update(records =>
      records.map(record =>
        record.collectionId === updatedRecord.collectionId ? updatedRecord : record
      )
    );
  }

  getRecord(id: number): Record | undefined {
    return this.records().find(record => record.collectionId === id);
  }

  nextId(): number {
    return Math.max(0, ...this.records().map((r) => Number(r.collectionId))) + 1;
  }

  readonly rockRecords = computed(() =>
    this.records().filter(record => record.primaryGenreName === this.config.defaultGenre)
  );

  readonly rockRecordCount = computed(() =>
    this.rockRecords().length
  );

  readonly recordsWithYear = computed(() =>
    this.records().filter(record => record.releaseDate)
  );

  constructor() {
    effect(() => {
      console.log('Record count:', this.records().length);
    });
  }
}
