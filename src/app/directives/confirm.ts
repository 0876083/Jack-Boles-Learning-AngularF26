import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appConfirm]',
  host: {
    '(click)': 'ask()',
  }
})
export class Confirm {
  message = input.required<string>({ alias: 'appConfirm' });
  confirmed = output<void>();

  ask(): void {
    if (window.confirm(this.message())) {
      this.confirmed.emit();
    }
  }
}
