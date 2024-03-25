import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { WorldService } from '../services/world.service';
import { Country } from '../model/country';

@Component({
  selector: 'app-country-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
  imports: [MatCheckboxModule],
})
export class CountryListComponent {
  private readonly worldService = inject(WorldService);

  readonly allCountries = this.worldService.allCountries;

  @Input() selectedCountryIds: string[] = [];

  @Output() addCountry = new EventEmitter<string>();
  @Output() removeCountry = new EventEmitter<string>();

  isSelected(countryId: string) {
    return this.selectedCountryIds.includes(countryId);
  }

  onCheckboxChange(event: MatCheckboxChange, countryId: string) {
    if (event.checked) {
      this.addCountry.emit(countryId);
    } else {
      this.removeCountry.emit(countryId);
    }
  }
}
