import { Component, computed, inject, input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordService } from '../services/record';

@Component({
  imports: [RouterLink],
  selector: 'app-record-detail',
  styleUrl: './record-detail.css',
  templateUrl: './record-detail.html',
})
export class RecordDetail implements OnInit, OnDestroy {
  protected recordService = inject(RecordService);

  id = input.required<string>();

  record = computed(() =>
    this.recordService.recordList().find((r) => r.collectionId === Number(this.id())),
  );

  private openedAt = 0;

  ngOnInit(): void {
    const id = Number(this.id());
    const record = this.recordService.getRecord(id);

    this.openedAt = Date.now();

    console.log(`[lifecycle] opened: ${record?.collectionName ?? 'Unknown Record'}`);
  }

  ngOnDestroy(): void {
    const id = Number(this.id());
    const record = this.recordService.getRecord(id);

    const seconds = Math.round((Date.now() - this.openedAt) / 1000);

    console.log(
      `[lifecycle] closed: ${record?.collectionName ?? 'Unknown Record'} after ${seconds} seconds`,
    );
  }
}
