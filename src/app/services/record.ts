import { computed, Service, effect, signal } from '@angular/core';
import { Record } from '../shared/models/record';

@Service()
export class RecordService {
  private records = signal<Record[]>([
    {
      id: 1,
      artist: 'Foo Fighters',
      title: 'The Colour and the Shape',
      genre: 'Rock',
      yearReleased: 1997,
      image: 'images/colour-and-shape.jpg'
    },
    {
      id: 2,
      artist: 'Nirvana',
      title: 'In Utero',
      genre: 'Grunge',
      yearReleased: 1993,
      image: 'images/in-utero.jpg'
    },
    {
      id: 3,
      artist: 'Green Day',
      title: 'Dookie',
      genre: 'Punk',
      image: 'images/dookie.jpg'
    },
    {
      id: 4,
      artist: 'Queens of the Stone Age',
      title: 'Songs for the Deaf',
      genre: 'Rock',
      yearReleased: 2002,
      image: 'images/songs-for-the-deaf.jpg'
    },
    {
      id: 5,
      artist: 'The Beatles',
      title: 'Abbey Road',
      genre: 'Rock',
      yearReleased: 1969,
      image: 'images/abbey-road.jpg'
    },
    {
      id: 6,
      artist: 'Red Hot Chili Peppers',
      title: 'Californication',
      genre: 'Rock',
      yearReleased: 1999,
      image: 'images/californication.jpg'
    }
  ]);

  readonly recordList = this.records.asReadonly();

  addRecord(r: Record): void {
    this.records.update((list) => [...list, r]);
  }

  readonly rockRecords = computed(() =>
    this.records().filter(record => record.genre === 'Rock')
  );

  constructor() {
    effect(() => {
      console.log('Record count:', this.records().length);
    });
  }
}
