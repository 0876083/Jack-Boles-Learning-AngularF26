import { Component, input, output } from '@angular/core';
import { Record } from '../shared/models/record';
import { RecordEvent } from '../shared/models/record-event';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-record-list-item',
  styleUrl: './record-list-item.css',
  templateUrl: './record-list-item.html',
})
export class RecordListItem {
  record = input.required<Record>();
  recordEvent = output<RecordEvent>();

  protected openRecord(): void {
    this.recordEvent.emit({
      id: this.record().collectionId,
      action: 'opened',
    });
  }

  protected deleteRecord(): void {
    this.recordEvent.emit({
      id: this.record().collectionId,
      action: 'deleted'
    });
  }
}
