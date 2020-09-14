export type Dist = {
  name: string;
  postalCode: string;
};

export type City = {
  city: string;
  dists: Dist[];
};
