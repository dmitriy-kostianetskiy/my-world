import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-country-selector-search-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-selector-search-box.component.html',
  styleUrl: './country-selector-search-box.component.css',
  imports: [MatInputModule, FormsModule],
})
export class CountrySelectorSearchBoxComponent {
  @Input() searchTerm?: string = '';

  @Output() searchTermChange = new EventEmitter<string>();

  onSearchTermChange(value: string): void {
    this.searchTermChange.emit(value);
  }
}
