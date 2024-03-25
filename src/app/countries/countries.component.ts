import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountryListComponent } from '../country-list/country-list.component';
import { MyCountriesService } from '../services/my-countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [WorldMapComponent, CountryListComponent],
})
export class CountriesComponent {
  private readonly myCountriesService = inject(MyCountriesService);

  readonly selectedCountryIds = this.myCountriesService.selectedCountryIds;

  onRemoveCountry(countryId: string): void {
    this.myCountriesService.remove(countryId);
  }

  onAddCountry(countryId: string): void {
    this.myCountriesService.add(countryId);
  }
}
