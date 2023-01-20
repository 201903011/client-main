import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------
export const department = [
  { code: 'COMPS', label: 'COMPS' },
  { code: 'IT', label: 'IT' },
  { code: 'EXTC', label: 'EXTC' },
];

export const studyyear = [
  { code: 'FE', label: 'First Year' },
  { code: 'SE', label: 'Second Year' },
  { code: 'TE', label: 'Third Year' },
  { code: 'BE', label: 'Fourth Year' },
];

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    midName: Yup.string().required('Middle name required'),
    lastName: Yup.string().required('Last name required'),
    grno: Yup.string().required('XIEID is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(1000000000)
      .max(9999999999)
      .required('phone number is required'),
    address: Yup.string().required('Address required'),
    dept: Yup.string().required('Department required'),
    year: Yup.string().required('Year required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    midName: '',
    lastName: '',
    email: '',
    grno: '',
    phone: 0,
    address: '',
    dept: '',
    year: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      await register(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.midName,
        data.phone,
        data.address,
        data.dept,
        data.year,
        data.grno
      );
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="midName" label="Middle name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField name="phone" type="number" label="Phone no" />

        <RHFTextField name="address" type="text" label="Address" />

        <RHFTextField name="grno" label="XIE ID" />

        <RHFSelect name="dept" label="Department">
          <option value="" />
          {department.map((option) => (
            <option key={option.code} value={option.label}>
              {option.label}
            </option>
          ))}
          <MenuItem value={'COMPS'}>COMPS</MenuItem>
        </RHFSelect>

        <RHFSelect name="year" label="Year">
          <option value="" />
          {studyyear.map((option) => (
            <option key={option.code} value={option.label}>
              {option.label}
            </option>
          ))}
          <MenuItem value={'COMPS'}>COMPS</MenuItem>
        </RHFSelect>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
