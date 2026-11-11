import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessage = signal<string | null>(null);

  readonly message = this.errorMessage.asReadonly();

  setError(message: string): void {
    this.errorMessage.set(message);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
