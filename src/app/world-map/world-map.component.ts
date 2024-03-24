import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import * as d3 from 'd3';
import * as world from './world.json';

const WIDTH = 1000;
const HEIGHT = 500;

@Component({
  selector: 'app-world-map',
  standalone: true,
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorldMapComponent {
  @ViewChild('worldMapSvg') worldMapCanvas!: ElementRef<SVGElement>;

  @Input() visitedCountries: string[] = [];

  constructor() {
    afterNextRender(() => {
      this.render();
    });
  }

  private render(): void {
    // see for more details: https://d3-graph-gallery.com/backgroundmap
    this.adjustSvg();

    const projection = this.getProjection();

    this.renderMap(projection);
  }

  private adjustSvg(): void {
    this.worldMapCanvas.nativeElement.setAttribute(
      'viewBox',
      `0 0 ${WIDTH} ${HEIGHT}`
    );
  }

  private getProjection(): d3.GeoProjection {
    return d3
      .geoNaturalEarth1()
      .scale(WIDTH / 1.8 / Math.PI)
      .rotate([0, 0])
      .center([0, 0])
      .translate([WIDTH / 2, HEIGHT / 2]);
  }

  private renderMap(projection: d3.GeoProjection): void {
    const visitedCountriesSet = new Set(this.visitedCountries);

    // render visited countries
    const visited = world.features.filter((item) =>
      visitedCountriesSet.has(item.properties.name)
    );

    this.renderCountries(projection, visited, 'green', 'black');

    // render not visited countries
    const notVisited = world.features.filter(
      (item) => !visitedCountriesSet.has(item.properties.name)
    );

    this.renderCountries(projection, notVisited, 'grey', 'black');
  }

  private renderCountries(
    projection: d3.GeoProjection,
    features: unknown[],
    fillStyle: string,
    strokeStyle: string
  ): void {
    const svg = d3.select(this.worldMapCanvas.nativeElement);

    svg
      .append('g')
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('fill', fillStyle)
      .attr('d', d3.geoPath().projection(projection) as any)
      .style('stroke', strokeStyle);
  }
}
