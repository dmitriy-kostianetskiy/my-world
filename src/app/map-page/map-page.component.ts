import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavStore } from '../store/sidenav.store';
import { CountrySelectorContainerComponent } from '../country-selector-container/country-selector-container.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { MapStore } from './map.store';

@Component({
  selector: 'app-map-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
  imports: [MatSidenavModule, WorldMapComponent, CountrySelectorContainerComponent, StatisticsComponent],
  providers: [MapStore],
})
export class MapPageComponent {
  private readonly sidenavStore = inject(SidenavStore);
  private readonly mapStore = inject(MapStore);

  readonly sidenavOpened = this.sidenavStore.opened;
  readonly selectedCountries = this.mapStore.selected;
  readonly numberOfSelectedCountries = this.mapStore.total;

  onSelectedCountriesChange(value: string[]): void {
    this.mapStore.set(value);
  }

  onSidenavOpenedChanged(value: boolean): void {
    this.sidenavStore.set(value);
  }
}
