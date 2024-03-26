import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountriesService } from './countries.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavStore } from '../store/sidenav.store';
import { CountrySelectorContainerComponent } from '../country-selector-container/country-selector-container.component';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
  imports: [
    MatSidenavModule,
    WorldMapComponent,
    CountrySelectorContainerComponent,
    StatisticsComponent,
  ],
  providers: [CountriesService],
})
export class MapPageComponent {
  private readonly sidenavStore = inject(SidenavStore);
  private readonly countriesService = inject(CountriesService);

  readonly sidenavOpened = this.sidenavStore.opened;
  readonly selectedCountries = this.countriesService.selectedCountries;
  readonly numberOfSelectedCountries =
    this.countriesService.numberOfSelectedCountries;

  onSelectedCountriesChange(value: string[]): void {
    this.countriesService.set(value);
  }

  onSidenavOpenedChanged(value: boolean): void {
    this.sidenavStore.set(value);
  }
}
