import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  imports: [WorldMapComponent],
})
export class CountriesComponent {}
