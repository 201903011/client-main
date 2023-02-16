import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  islibrarian: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,

      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGINADMIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      islibrarian: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  loginadmin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const re = await axios.post(
            `${process.env.REACT_APP_HOST_API_KEY_ADMIN}/librarian/get-librarian-info`,
            {
              jwtEncodedLibrarain: accessToken,
            },
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
              },
            }
          );
          const { librarian } = re.data;
          console.log('librarian');
          console.log(librarian);

          window.localStorage.setItem('accessToken', accessToken);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              user: librarian,
              isAuthenticated: true,
              islibrarian: true,
            },
          });
        } else {
          console.log('initialize');
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        try {
          const accessToken = window.localStorage.getItem('accessToken');

          if (accessToken && isValidToken(accessToken)) {
            setSession(accessToken);

            const response = await axios.post(
              `${process.env.REACT_APP_HOST_API_KEY}/api/user/student/get-student-info`,

              {
                jwtEncodedStudent: accessToken,
              },
              {
                headers: {
                  authorization: `Bearer ${accessToken}`,
                  'Content-type': 'application/json',
                },
              }
            );
            const { student } = response.data;
            // console.log(student);
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: student,
                islibrarian: true,
              },
            });
          } else {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        } catch (err) {
          console.error(err);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_HOST_API_KEY}/api/user/student/signin`, {
      email,
      password,
    });
    const { token } = response.data;

    window.localStorage.setItem('accessToken', token);

    const re = await axios.post(
      `${process.env.REACT_APP_HOST_API_KEY}/api/user/student/get-student-info`,
      {
        jwtEncodedStudent: token,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );
    const { student } = re.data;
    console.log(student);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: student,
      },
    });
  };

  const loginadmin = async (email, password) => {
    console.log('hii');
    const response = await axios.post(`${process.env.REACT_APP_HOST_API_KEY_ADMIN}/librarian/signin`, {
      email,
      password,
    });
    const { token } = response.data;

    const re = await axios.post(
      `${process.env.REACT_APP_HOST_API_KEY_ADMIN}/librarian/get-librarian-info`,
      {
        jwtEncodedLibrarain: token,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );
    const { librarian } = re.data;
    console.log(librarian);

    window.localStorage.setItem('accessToken', token);

    dispatch({
      type: 'LOGINADMIN',
      payload: {
        user: librarian,
        islibrarian: true,
      },
    });
  };

  const register = async (email, password, firstName, lastName, midname, phone, address, dept, year, grno) => {
    await axios.post(`${process.env.REACT_APP_HOST_API_KEY}/api/user/student/create-student`, {
      email: email.toString(),
      password: password.toString(),
      name: `${firstName.toString()} ${midname.toString()} ${lastName.toString()} `,
      address: address.toString(),
      phone_number: phone.toString(),
      grno: grno.toString(),
      dept: dept.toString(),
      year: year.toString(),
      profile_picture: firstName.toString(),
    });

    const resp = await axios.post(`${process.env.REACT_APP_HOST_API_KEY}/api/user/student/signin`, {
      email: email.toString(),
      password: password.toString(),
    });
    const { token } = resp.data;
    window.localStorage.setItem('accessToken', token);
    const re = await axios.post(
      `${process.env.REACT_APP_HOST_API_KEY}/api/user/student/get-student-info`,

      {
        jwtEncodedStudent: token,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );
    const { student } = re.data;

    dispatch({
      type: 'REGISTER',
      payload: {
        user: student,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        loginadmin,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
