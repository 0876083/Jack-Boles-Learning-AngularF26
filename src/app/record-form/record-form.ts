import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordService } from '../services/record';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-record-form',
  styleUrl: './record-form.css',
  templateUrl: './record-form.html',
})
export class RecordForm {
  private fb = inject(FormBuilder);
  private recordService = inject(RecordService);
  private router = inject(Router);

  id = input<string>();

  protected isEditMode = computed(() => this.id() !== undefined);

  protected recordForm = this.fb.nonNullable.group({
    artist: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['Rock', Validators.required],
    yearReleased: [2026],
    image: [''],
  });

  constructor() {
    effect(() => {
      const id = this.id();

      if (id === undefined) {
        return;
      }

      const record = this.recordService.getRecord(Number(id));
      if (record) {
        this.recordForm.patchValue({
          artist: record.artist,
          title: record.title,
          genre: record.genre,
          yearReleased: record.yearReleased ?? 2026,
          image: record.image,
        });
      }
    });
  }

  protected onSubmit(): void {
    if (this.recordForm.invalid) {
      return;
    }

    const formValue = this.recordForm.getRawValue();

    const id = this.isEditMode() ? Number(this.id()) : Date.now();

    if (this.isEditMode()) {
      this.recordService.updateRecord({ id, ...formValue });
    } else {
      this.recordService.addRecord({ id, ...formValue });
    }

    this.recordForm.reset();
    this.router.navigate(['/records', id]);
  }
}
