import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountryListComponent } from '../country-list/country-list.component';
import { MyCountriesService } from '../services/my-countries.service';
import { take } from 'cypress/types/lodash';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [WorldMapComponent, CountryListComponent],
  providers: [MyCountriesService],
})
export class CountriesComponent {
  private readonly myCountriesService = inject(MyCountriesService);

  readonly selectedCountryIds = this.myCountriesService.selectedCountryIds;

  onRemoveCountry(countryId: string): void {
    this.myCountriesService.remove(countryId).pipe().subscribe({});
  }

  onAddCountry(countryId: string): void {
    this.myCountriesService.add(countryId).pipe().subscribe({});
  }
}
