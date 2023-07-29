import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (getServerData, { rejectWithValue }) => {
    try {
      const { data } = await getServerData();
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
