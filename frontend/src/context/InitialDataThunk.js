import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (getChannelsData, { rejectWithValue }) => {
    try {
      const { data } = await getChannelsData();
      return data;
    } catch (error) {
      if (error.isAxiosError) {
        return rejectWithValue(error.response.status);
      }
      throw error;
    }
  },
);

export default fetchInitialData;
