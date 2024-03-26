import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly worldService = inject(WorldService);
  private readonly myCountriesService = inject(MyCountriesService);

  readonly allCountries = this.worldService.allCountries;

  readonly selectedCountriesSet = computed(
    () => new Set(this.myCountriesService.selectedCountryIds())
  );

  isCheckboxChecked(countryId: string) {
    return this.selectedCountriesSet().has(countryId);
  }

  onCheckboxChange({ checked }: MatCheckboxChange, countryId: string): void {
    if (checked) {
      this.removeCountry(countryId);
    } else {
      this.addCountry(countryId);
    }
  }

  private removeCountry(countryId: string): void {
    this.myCountriesService
      .remove(countryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private addCountry(countryId: string): void {
    this.myCountriesService
      .add(countryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
