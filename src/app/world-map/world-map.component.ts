import {
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { WorldService } from '../services/world.service';

const WIDTH = 1000;
const HEIGHT = 500;
const STROKE_STYLE = 'black';
const SELECTED_FILL_STYLE = 'green';
const DEFAULT_FILL_STYLE = 'grey';

@Component({
  selector: 'app-world-map',
  standalone: true,
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorldService],
})
export class WorldMapComponent implements OnChanges {
  private readonly worldService = inject(WorldService);

  readonly allCountries = this.worldService.allCountries;

  private readonly worldMapSvg =
    viewChild<ElementRef<SVGElement>>('worldMapSvg');

  @Input() selectedCountryIds: string[] = [];

  constructor() {
    afterNextRender(
      () => {
        this.renderMap();
        this.updateCountryColours();
      },
      {
        phase: AfterRenderPhase.MixedReadWrite,
      }
    );
  }

  ngOnChanges({ selectedCountryIds }: SimpleChanges): void {
    if (selectedCountryIds && !selectedCountryIds.firstChange) {
      this.updateCountryColours();
    }
  }

  private getProjection(): d3.GeoProjection {
    return d3
      .geoNaturalEarth1()
      .scale(WIDTH / 1.8 / Math.PI)
      .rotate([0, 0])
      .center([0, 0])
      .translate([WIDTH / 2, HEIGHT / 2]);
  }

  private renderMap(): void {
    const svg = this.getSvgElement();

    const projection = this.getProjection();

    svg
      .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
      .append('g')
      .selectAll('path')
      .data(this.allCountries)
      .enter()
      .append('path')
      .attr('id', (a) => a.id)
      .attr('d', d3.geoPath().projection(projection) as any)
      .style('stroke', STROKE_STYLE);
  }

  private updateCountryColours(): void {
    const svg = this.getSvgElement();

    // reset fill for all
    svg.selectAll('path').style('fill', DEFAULT_FILL_STYLE);

    // set selected countries fill
    this.selectedCountryIds.forEach((countryId) => {
      svg.selectAll(`#${countryId}`).style('fill', SELECTED_FILL_STYLE);
    });
  }

  private getSvgElement(): d3.Selection<SVGElement, unknown, null, undefined> {
    const worldMapSvg = this.worldMapSvg();

    if (!worldMapSvg?.nativeElement) {
      throw new Error('Unable to find <svg>');
    }

    return d3.select(worldMapSvg.nativeElement);
  }
}
