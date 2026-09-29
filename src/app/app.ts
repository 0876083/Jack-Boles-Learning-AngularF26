import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordList } from './record-list/record-list';

@Component({
  imports: [RouterOutlet, RecordList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Jack-Boles-Learning-AngularF26');
}
