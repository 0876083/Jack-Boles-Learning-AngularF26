import { Component, computed, effect, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordService } from '../services/record';

function noWhitespaceValidator(control: AbstractControl) {
  if (control.value !== '' && control.value.trim() === '') {
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
    artistName: ['', Validators.required],
    collectionName: ['', [
      Validators.required,
      Validators.minLength(2),
      noWhitespaceValidator
    ]],
    primaryGenreName: ['Rock', Validators.required],
    releaseDate: [''],
    artworkUrl100: [''],
  }, { validators: artistTitleValidator });

  constructor() {
    effect(() => {
      const id = this.id();

      if (id === undefined) {
        return;
      }

      const record = this.recordService.getRecord(Number(id));

      if (record) {
        this.recordForm.patchValue(record);
      }
    });
  }

  protected onSubmit(): void {
    if (this.recordForm.invalid) {
      return;
    }

    const formValue = this.recordForm.getRawValue();
    const collectionId = this.isEditMode() ? Number(this.id()) : this.recordService.nextId();

    if (this.isEditMode()) {
      this.recordService.updateRecord({ collectionId, ...formValue });
    } else {
      this.recordService.addRecord({ collectionId, ...formValue });
    }

    this.recordForm.reset();
    this.router.navigate(['/records', collectionId]);
  }
}
