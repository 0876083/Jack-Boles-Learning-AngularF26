import { Component, input } from '@angular/core';
import { Record } from '../shared/models/record';

@Component({
  imports: [],
  selector: 'app-record-list-item',
  styleUrl: './record-list-item.css',
  templateUrl: './record-list-item.html',
})
export class RecordListItem {
  item = input.required<Record>();
}
