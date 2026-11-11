import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordService } from '../services/record';

@Component({
  imports: [RouterLink],
  selector: 'app-record-detail',
  styleUrl: './record-detail.css',
  templateUrl: './record-detail.html',
})
export class RecordDetail {
  protected recordService = inject(RecordService);

  id = input.required<string>();

  record = computed(() =>
    this.recordService.recordList().find(
      r => r.collectionId === Number(this.id()))
  );
}
