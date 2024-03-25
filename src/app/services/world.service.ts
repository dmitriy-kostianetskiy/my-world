import { Injectable } from '@angular/core';
import * as world from './world.json';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  readonly allCountries: Country[] = world.features;
}
