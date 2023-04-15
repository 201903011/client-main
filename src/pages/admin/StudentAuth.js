import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Container,
  Pagination,
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  TextField,
  MenuItem,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getBookslist,
  getCustomBookslist,
  issueBookbyuser,
  issueBooks,
  returnBookbyadmin,
  authStudentbyadmin,
} from '../../redux/slices/book';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator } from '../../hooks/useTable';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import { RHFSelect, FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import Iconify from '../../components/Iconify';

// sections
import BookCard from '../../sections/@Lmsapp/book/bookCard';
import Searchbar from '../../layouts/dashboard/header/Searchbar';
// import CustomForm from '../../sections/@admin/book/CustomForm';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

const selectedEventSelector = (state) => {
  const { books } = state.book;
  if (books != null) {
    return books; 
  }
  return null;
};

export default function ReturnBook() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { isAuthenticated, isInitialized, isLibrarian, user } = useAuth();

  useEffect(() => {}, [dispatch]);

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const defaultValues = {
    email: 'demo@gmail.com',
    remeber: true,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      console.log(accessToken);
      // console.log(typeof parseInt(data.accessionNo.toString(), 10), typeof user._id, typeof accessToken);
      dispatch(
        authStudentbyadmin(data.email, accessToken.toString())
      );
      enqueueSnackbar('Authorized successfully!');
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.response.statusText });
      }
    }
  };

  return (
    <Page title="Book: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <Box height={30} /> */}

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="firstName" label="First name" />
              <RHFTextField name="midName" label="Middle name" />
              <RHFTextField name="lastName" label="Last name" />
            </Stack> */}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                },
                gap: 3,
              }}
            >
              <RHFTextField name="email" type="email" label="Email" />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                  },
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Authorise Student
                </LoadingButton>
              </Box>
            </Box>
          </Stack>
        </FormProvider>

        <Box height={30} />

        <Box height={30} />
      </Container>
    </Page>
  );
}
