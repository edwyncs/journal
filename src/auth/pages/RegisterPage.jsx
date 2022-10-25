import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWhitEmail } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  name: '',
  email: '',
  password: ''
}

export const RegisterPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const formValidations = {
    email: [(value) => value.includes('@'), 'Please enter a valid email address.'],
    password: [(value) => value.length >=6, 'Minimum 6 characters required.'],
    name: [(value) => value.length >= 1, 'Your name is required.']
  }

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const dispatch =  useDispatch()

  const {
    name, email, password, formState, onInputChange, 
    nameValid, emailValid, passwordValid, isFormValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if(!isFormValid) return;

    //crear usuario en DB
    dispatch(startCreatingUserWhitEmail(formState));
  }

  // const onGoogleSingIn = () => {
  //   dispatch(startGoogleSingIn());
  // };

  // const isAutenticating = useMemo(() => status === 'checking',[status])
  
  return (
    <AuthLayout title="Create Account">
        <form onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Edwin Cruz"
                fullWidth
                error={!!nameValid && formSubmited}
                helperText={!!nameValid && formSubmited ? nameValid : ''}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="email@google.com"
                fullWidth
                error={!!emailValid && formSubmited}
                helperText={!!emailValid && formSubmited ? emailValid : ''}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange}
                fullWidth
                error={!!passwordValid && formSubmited}
                helperText={!!passwordValid && formSubmited ? passwordValid : ''}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} md={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  disabled={isCheckingAuthentication}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Sing Up
                </Button>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Button
                  disabled={isAutenticating} 
                  onClick={onGoogleSingIn}
                  variant="contained"
                  fullWidth
                >
                  <Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid> */}
            </Grid>
          </Grid>

          <Grid container direcrion='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Do you already have an account?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </form>
      </AuthLayout>
  );
};