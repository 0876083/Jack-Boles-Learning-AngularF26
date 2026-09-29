import { Component } from '@angular/core';
import { Record } from '../shared/models/record';

@Component({
  imports: [],
  selector: 'app-record-list',
  styleUrl: './record-list.css',
  templateUrl: './record-list.html',
})
export class RecordList {
  recordList: Record[] = [
    {
      id: 1,
      artist: 'Foo Fighters',
      title: 'The Colour and the Shape',
      genre: 'Rock',
      yearReleased: 1997
    },
    {
      id: 2,
      artist: 'Nirvana',
      title: 'In Utero',
      genre: 'Grunge',
      yearReleased: 1993
    },
    {
      id: 3,
      artist: 'Green Day',
      title: 'Dookie',
      genre: 'Punk',
    },
    {
      id: 4,
      artist: 'Queens of the Stone Age',
      title: 'Songs for the Deaf',
      genre: 'Rock',
      yearReleased: 2002
    },
    {
      id: 5,
      artist: 'The Beatles',
      title: 'Abbey Road',
      genre: 'Rock',
      yearReleased: 1969
    },
    {
      id: 6,
      artist: 'Red Hot Chili Peppers',
      title: 'Californication',
      genre: 'Rock',
      yearReleased: 1999
    }
  ];
}
