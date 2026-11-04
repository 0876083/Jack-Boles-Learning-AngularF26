import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  protected recordForm = this.fb.nonNullable.group({
    artist: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['Rock', Validators.required],
    yearReleased: [2026],
    image: [''],
  });

  protected onSubmit(): void {
    if (this.recordForm.invalid) {
      return;
    }

    const formValue = this.recordForm.getRawValue();

    this.recordService.addRecord({id: Date.now(), ...formValue});

    this.recordForm.reset();
  }
}
