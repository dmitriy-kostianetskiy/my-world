import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
} from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { WorldService } from '../services/world.service';
import { MyCountriesService } from '../services/my-countries.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
  imports: [MatCheckboxModule],
})
export class CountrySelectorComponent {
  private readonly worldService = inject(WorldService);

  readonly allCountries = this.worldService.allCountries;

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
