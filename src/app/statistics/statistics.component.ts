import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WORLD } from '../world';
import { CommonModule } from '@angular/common';

const TOTAL_COUNTRIES = WORLD.length;

@Component({
  selector: 'app-statistics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  imports: [MatCardModule, MatProgressBarModule, CommonModule],
})
export class StatisticsComponent {
  @Input() numberOfSelectedCountries: number = 0;

  get percentageOfVisited() {
    return this.numberOfSelectedCountries / TOTAL_COUNTRIES;
  }

  get moreToGo() {
    return TOTAL_COUNTRIES - this.numberOfSelectedCountries;
  }
}
