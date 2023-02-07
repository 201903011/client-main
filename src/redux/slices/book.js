import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  books: [],
};

const slice = createSlice({
  name: 'book',
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

    // GET BOOKS
    getBooks(state, action) {
      state.isLoading = false;
      state.books = action.payload;
    },

    // CREATE EVENT
    createBooks(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateBooks(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getBooks, updateBooks, createBooks } = slice.actions;

// ----------------------------------------------------------------------

export function getBookslist(page) {
  console.log(`hiii ${page}`);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/api/user/books/get-books?page=${page}`);
      console.log(response.data);
      dispatch(slice.actions.getBooks(response.data.books));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function bookcreate(book) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', book);
      dispatch(slice.actions.createBooks(response.data.books));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function bookupdate(eventId, updateEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent,
      });
      dispatch(slice.actions.updateBooks(response.data.books));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.dele({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start, end) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      })
    );
  };
}
