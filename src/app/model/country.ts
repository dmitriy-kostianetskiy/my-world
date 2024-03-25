export type Country = {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
  id: string;
};
