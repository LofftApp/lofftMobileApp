import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAdverts} from './advertMiddleware';

interface AdvertState {
  loading: boolean;
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
  };
}

const initialState: AdvertState = {
  loading: false,
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
  },
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
        state.id = action.payload.id;
        state.status = action.payload.status;
        state.currency = action.payload.currency;
        state.price = action.payload.price;
        state.created_at = action.payload.created_at;
        state.flat.id = action.payload.flat.id;
        state.flat.address = action.payload.flat.address;
        state.flat.description = action.payload.flat.description;
        state.flat.tagLine = action.payload.flat.tagLine;
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
