import { Component, computed, effect, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordService } from '../services/record';

function noWhitespaceValidator(control: AbstractControl) {
  if (control.value.trim() !== '' && control.value.trim() === '') {
    return { whitespace: true };
  }

  return null;
}

function artistTitleValidator(group: AbstractControl)  {
  const artist = group.get('artist')?.value;
  const title = group.get('title')?.value;

  if (artist && title && artist.trim().toLowerCase() === title.trim().toLowerCase()) {
    return { artistTitleMatch: true };
  }

  return null;
}

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
    title: ['', [
      Validators.required,
      Validators.minLength(2),
      noWhitespaceValidator
    ]],
    genre: ['Rock', Validators.required],
    yearReleased: [2026],
    image: [''],
  }, { validators: artistTitleValidator });

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
    const id = this.isEditMode() ? Number(this.id()) : this.recordService.nextId();

    if (this.isEditMode()) {
      this.recordService.updateRecord({ id, ...formValue });
    } else {
      this.recordService.addRecord({ id, ...formValue });
    }

    this.recordForm.reset();
    this.router.navigate(['/records', id]);
  }
}
