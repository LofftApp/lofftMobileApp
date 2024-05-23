interface Advert {
  id: number | null;
  status: string | null;
  currency: string | null;
  matchScore: number | null;
  price: number | null;
  favorite: boolean;
  applied: boolean;
  fromDate: number | null;
  toDate: number | null;
  created_at: string | null;
  applicants: any[] | null;
  user: boolean | null;
  lessor: boolean;
  flat: {
    id: number | null;
    address: string | null;
    description: string | null;
    tagLine: string | null;
    district: string | null;
    city: string | null;
    photos: string[] | null;
    charachteristics:
      | [
          {
            emoji: string | null;
            name: string | null;
          },
        ]
      | null;
    features:
      | [
          {
            emoji: string | null;
            name: string | null;
          },
        ]
      | null;
  };
}

interface AdvertState {
  loading: boolean;
  adverts: Advert[];
}

export type {Advert, AdvertState};
