import { ExtendedFeature, GeoGeometryObjects } from 'd3';

export type Country = ExtendedFeature<GeoGeometryObjects, { name: string }> & { id: string };
