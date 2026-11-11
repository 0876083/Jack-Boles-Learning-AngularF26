import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = signal(0);

  readonly isLoading = computed(() => this.requestCount() > 0);

  increase(): void {
    this.requestCount.update((count) => count + 1);
  }

  decrease(): void {
    this.requestCount.update((count) => Math.max(0, count - 1));
  }
}
