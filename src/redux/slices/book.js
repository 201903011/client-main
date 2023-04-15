import { createSlice } from '@reduxjs/toolkit';
import { title } from 'process';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';


// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  issuedData: [],
  message: '',
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

    getIssuedBooksData(state, action) {
      state.isLoading = false;
      state.issuedData = action.payload;
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

    // ISSUE BOOKS
    issueBooks(state) {
      state.isLoading = false;
      state.message = 'Issued Successfully';
    },

    // ISSUE BOOKS
    returnBooks(state) {
      state.isLoading = false;
      state.message = 'Return Successfully';
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getBooks, updateBooks, createBooks, issueBooks, returnBooks, getIssuedBooksData } = slice.actions;

// ----------------------------------------------------------------------

export function issueBookbyuser(acno, id, token) {
  console.log(`accession no to issue ${acno}`);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API_KEY_USER}/user/issue/issue-book`,
        {
          accession_number: acno,
          student_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      console.log(response.data);
      dispatch(slice.actions.issueBooks());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function authStudentbyadmin(id,token) {
  // console.log(`accession no to issue ${acno}`);
  const bod =[
    {
        "email": id.toString()
    }
]
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API_KEY_ADMIN}/student/create-bulk-students`,
        {
          bod
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      console.log(response.data);
      dispatch(slice.actions.getIssuedBooksData(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function returnBookbyadmin(acno, id, token) {
  console.log(`accession no to issue ${acno}`);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API_KEY_ADMIN}/issue/return-book`,
        {
          accession_number: acno,
          returned_to: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      console.log(response.data);
      dispatch(slice.actions.getIssuedBooksData(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getIssueBookslist(id, token) {
  // console.log(`accession no to issue ${acno}`);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API_KEY_USER}/user/issue/get-info`,
        {
          student_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      // console.log(typeof response.data.data);
      dispatch(slice.actions.getIssuedBooksData(response.data.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
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

export function getCustomBookslist(bookname1, author1, isbn1) {
  const bookname = bookname1.toString();
  const author = author1.toString();
  const isbn = isbn1.toString();
  console.log(`custom search`);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      if (bookname === '' && author === '' && isbn === '') {
        const response = await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books`);
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname !== '' && author === '' && isbn === '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?title=${bookname}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname === '' && author !== '' && isbn === '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?author=${author}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname === '' && author === '' && isbn !== '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?isbn=${isbn}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname === '' && author !== '' && isbn !== '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?author=${author}&isbn=${isbn}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname !== '' && author === '' && isbn !== '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?title=${bookname}&isbn=${isbn}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname !== '' && author !== '' && isbn === '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?title=${bookname}&author=${author}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
      if (bookname !== '' && author !== '' && isbn !== '') {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_API_KEY}/api/user/books/search-books?title=${bookname}&author=${author}&isbn=${isbn}`
        );
        dispatch(slice.actions.getBooks(response.data.books));
        return;
      }
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
