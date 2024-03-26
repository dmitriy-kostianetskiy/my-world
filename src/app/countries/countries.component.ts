import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { CountrySelectorComponent } from '../country-selector/country-selector.component';
import { MyCountriesService } from '../services/my-countries.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [WorldMapComponent, CountrySelectorComponent, MatSidenavModule],
  providers: [MyCountriesService],
})
export class CountriesComponent {
  private readonly sidenavService = inject(SidenavService);

  readonly sidenavOpened = this.sidenavService.opened;
}
