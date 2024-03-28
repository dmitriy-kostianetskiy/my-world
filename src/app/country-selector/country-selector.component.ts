import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CountrySelectorItem } from '../country-selector-container/countries-selector.store';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
  imports: [MatCheckboxModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
})
export class CountrySelectorComponent {
  @Input() searchTerm: string = '';
  @Input() countries: CountrySelectorItem[] = [];
  @Input() selectedCountries: string[] = [];

  @Output() selectedCountriesChange = new EventEmitter<string[]>();
  @Output() searchTermChange = new EventEmitter<string>();

  isCheckboxChecked(countryId: string) {
    return this.selectedCountries?.includes(countryId);
  }

  onCheckboxChange({ checked }: MatCheckboxChange, countryId: string): void {
    const newValue = checked
      ? [...this.selectedCountries, countryId]
      : this.selectedCountries.filter(item => item !== countryId);

    this.selectedCountriesChange.emit(newValue);
  }

  onSearchTermChange(value: string): void {
    this.searchTermChange.emit(value);
  }
}
