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
  protected rockRecordCount = this.recordService.rockRecordCount;
  protected recordsWithYear = this.recordService.recordsWithYear;
  protected isLoading = this.recordService.isLoading;
  protected error = this.recordService.error;

  handleRecordEvent(event: RecordEvent): void {
    if (event.action === 'deleted') {
      this.recordService.removeRecord(event.id);
    }
  }
}
