import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFlats = createAsyncThunk('flats/fetchFlats', async () => {
  // development url
  // const url = 'http://localhost:3000/api/adverts';
  // try {
  //   const response = await axios.get(url);
  //   console.log('fetchFlats response:', response.data.parse[0]);
  //   // return response.data;
  // } catch (error) {
  //   console.log('fetchFlats error:', error);
  // }
});
