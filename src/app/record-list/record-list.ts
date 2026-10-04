import { Component } from '@angular/core';
import { Record } from '../shared/models/record';
import { RecordListItem } from '../record-list-item/record-list-item';
import { RecordEvent } from '../shared/models/record-event';


@Component({
  imports: [RecordListItem],
  selector: 'app-record-list',
  styleUrl: './record-list.css',
  templateUrl: './record-list.html',
})
export class RecordList {

  handleRecordEvent(event: RecordEvent): void {
    console.log(event);
  }
}
