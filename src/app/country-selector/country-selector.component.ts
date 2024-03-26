import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Country } from '../model/country';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
  imports: [MatCheckboxModule],
})
export class CountrySelectorComponent {
  @Input() countries?: Country[] = [];
  @Input() selectedCountryIds?: string[] = [];

  @Output() addCountry = new EventEmitter<string>();
  @Output() removeCountry = new EventEmitter<string>();

  isCheckboxChecked(countryId: string) {
    return this.selectedCountryIds?.includes(countryId);
  }

  onCheckboxChange({ checked }: MatCheckboxChange, countryId: string): void {
    if (checked) {
      this.addCountry.emit(countryId);
    } else {
      this.removeCountry.emit(countryId);
    }
  }
}
