import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GuardService } from './services/guard';
import { LoadingService } from './services/loading';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected title = 'Record Collection'

  private guardService = inject(GuardService);
  protected loadingService = inject(LoadingService);

  protected guardEnabled = this.guardService.guardEnabled;

  protected toggleGuard(): void {
    this.guardService.toggleGuard();
  }
}
