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

  recordList = this.recordService.recordList;
  rockRecordCount = this.recordService.rockRecordCount;
  recordsWithYear = this.recordService.recordsWithYear;

  handleRecordEvent(event: RecordEvent): void {
    this.recordService.removeRecord(event.id);
  }
}
