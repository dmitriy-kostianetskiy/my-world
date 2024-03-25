import { Injectable } from '@angular/core';
import * as world from './world.json';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  readonly allCountries = world.features;
}
