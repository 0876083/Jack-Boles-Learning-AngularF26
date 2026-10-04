import { Component, inject } from '@angular/core';
import { RecordListItem } from '../record-list-item/record-list-item';
import { RecordEvent } from '../shared/models/record-event';
import { RecordService } from '../services/record';

@Component({
  imports: [RecordListItem],
  selector: 'app-record-list',
  styleUrl: './record-list.css',
  templateUrl: './record-list.html',
})
export class RecordList {
  private recordService = inject(RecordService);

  protected recordList = this.recordService.recordList;

  handleRecordEvent(event: RecordEvent): void {
    console.log(event);
  }
}
