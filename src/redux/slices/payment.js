import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  paymentdata: [],
  
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getPaymentData(state, action) {
      state.isLoading = false;
      state.paymentdata = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getPaymentData } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents(token) {
  return async () => {
  console.log(token);
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST_API_KEY_ADMIN}/payment/payment-info`,
        {
          
        },
        {
          headers: {
            authorization: `Bearer ${token.toString()}`,
            'Content-type': 'application/json',
          },
        }
      );
      console.log(response.data.data);
      dispatch(slice.actions.getPaymentData(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
