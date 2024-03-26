import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountrySelectorComponent } from '../country-selector/country-selector.component';
import { MyCountriesService } from '../services/my-countries.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav.service';
import { WorldService } from '../services/world.service';
import { CountrySelectorSearchBoxComponent } from '../country-selector-search-box/country-selector-search-box.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [
    WorldMapComponent,
    CountrySelectorComponent,
    CountrySelectorSearchBoxComponent,
    MatSidenavModule,
  ],
  providers: [MyCountriesService],
})
export class CountriesComponent {
  private readonly worldService = inject(WorldService);
  private readonly sidenavService = inject(SidenavService);
  private readonly myCountriesService = inject(MyCountriesService);

  readonly sidenavOpened = this.sidenavService.opened;
  readonly selectedCountryIds = this.myCountriesService.selectedCountryIds;
  readonly allCountries = this.worldService.allCountries;

  readonly searchTerm = signal('');

  readonly countries = computed(() =>
    this.allCountries.filter((country) => {
      const term = this.searchTerm().toLowerCase();
      const name = country.properties.name.toLowerCase();
      const id = country.id.toLowerCase();

      return name.includes(term) || id.includes(term);
    })
  );

  onRemoveCountry(countryId: string): void {
    this.myCountriesService.remove(countryId);
  }

  onAddCountry(countryId: string): void {
    this.myCountriesService.add(countryId);
  }

  onSearchTermChange(value: string): void {
    this.searchTerm.set(value);
  }
}
