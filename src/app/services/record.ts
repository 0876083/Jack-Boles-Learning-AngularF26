import { computed, inject, Injectable, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Record } from '../shared/models/record';
import { RECORD_CONFIG } from '../shared/record-config';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private config = inject(RECORD_CONFIG);

  private recordResource = httpResource<Record[]>(() => ({
    url: `${this.config.apiBaseUrl}/search`,
    params: {
      term: 'rock',
      media: 'music',
      entity: 'album',
      limit: 25,
    },
  }), {
    defaultValue: [],
    parse: (response: unknown) =>
      (response as { results: Record[] }).results,
  });

  private records = this.recordResource.value;
  private recordList = this.records.asReadonly();

  readonly isLoading = this.recordResource.isLoading;
  readonly error = this.recordResource.error;
  readonly defaultGenre = this.config.defaultGenre;

  addRecord(r: Record): void {
    this.records.update((list) => [...list, r]);
  }

  removeRecord(id: number): void {
    this.records.update((list) => list.filter((record) => record.collectionId !== id));
  }

  updateRecord(updatedRecord: Record): void {
    this.records.update((records) =>
      records.map((record) =>
        record.collectionId === updatedRecord.collectionId ? updatedRecord : record
      )
    );
  }

  getRecord(id: number): Record | undefined {
    return this.recordList().find((record) => record.collectionId === id);
  }

  nextId(): number {
    return Math.max(0, ...this.recordList().map((r) => r.collectionId)) + 1;
  }

  readonly rockRecords = computed(() =>
    this.recordList().filter((record) => record.primaryGenreName === this.config.defaultGenre)
  );

  readonly rockRecordCount = computed(() =>
    this.rockRecords().length
  );

  readonly recordsWithYear = computed(() =>
    this.recordList().filter((record) => record.releaseDate)
  );

  constructor() {
    effect(() => {
      console.log('Record count:', this.recordList().length);
    });
  }
}
