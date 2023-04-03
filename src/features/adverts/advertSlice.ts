import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAdverts} from './advertMiddleware';

interface AdvertState {
  loading: boolean;
  adverts: [
    {
      id: number | null;
      status: string | null;
      currency: string | null;
      price: number | null;
      created_at: string | null;
      flat: {
        id: number | null;
        address: string | null;
        description: string | null;
        tagLine: string | null;
        photos: string[] | null;
      };
    },
  ];
}

const initialState: AdvertState = {
  loading: false,
  adverts: [
    {
      id: null,
      status: null,
      currency: null,
      price: null,
      created_at: null,
      flat: {
        id: null,
        address: null,
        description: null,
        tagLine: null,
        photos: null,
      },
    },
  ],
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdverts.pending, state => {
      state.loading = true;
      console.log('fetchAdverts pending');
    });
    builder.addCase(
      fetchAdverts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const values = action.payload.parse.map((advert: any) => {
          return {
            id: advert.id,
            status: advert.status,
            currency: advert.currency,
            price: advert.price,
            created_at: advert.created_at,
            flat: {
              id: advert.flat.id,
              address: advert.flat.address,
              description: advert.flat.description,
              tagLine: advert.flat.tagLine,
              photos: advert.flat.photos,
            },
          };
        });
        state.adverts = values;
      },
    );
    builder.addCase(fetchAdverts.rejected, state => {
      state.loading = false;
      console.log('fetchAdverts rejected');
    });
  },
});

export const {} = advertSlice.actions;
export default advertSlice.reducer;
