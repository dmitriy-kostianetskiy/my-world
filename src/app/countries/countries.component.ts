import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountriesService } from './countries.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavStore } from '../store/sidenav.store';
import { CountrySelectorContainerComponent } from '../country-selector-container/country-selector-container.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [
    WorldMapComponent,
    CountrySelectorContainerComponent,
    MatSidenavModule,
  ],
  providers: [CountriesService],
})
export class CountriesComponent {
  private readonly sidenavStore = inject(SidenavStore);
  private readonly countriesService = inject(CountriesService);

  readonly sidenavOpened = this.sidenavStore.opened;
  readonly selectedCountries = this.countriesService.selectedCountries;

  onSelectedCountriesChange(value: string[]): void {
    this.countriesService.set(value);
  }
}
