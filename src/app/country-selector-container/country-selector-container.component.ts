import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CountrySelectorComponent } from '../country-selector/country-selector.component';
import { CountriesSelectorStore } from './countries-selector.store';

@Component({
  selector: 'app-country-selector-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-selector-container.component.html',
  styleUrl: './country-selector-container.component.css',
  imports: [CountrySelectorComponent],
  providers: [CountriesSelectorStore],
})
export class CountrySelectorContainerComponent {
  private readonly countriesSelectorStore = inject(CountriesSelectorStore);

  readonly searchTerm = this.countriesSelectorStore.searchTerm;
  readonly searchResults = this.countriesSelectorStore.searchResults;

  @Input() selectedCountries: string[] = [];

  @Output() selectedCountriesChange = new EventEmitter<string[]>();

  onSearchTermChange(value: string): void {
    this.countriesSelectorStore.setSearchTerm(value);
  }

  onSelectedCountriesChange(value: string[]): void {
    this.selectedCountriesChange.emit(value);
  }
}
