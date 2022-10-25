import { Google, Password } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSingIn, startLogingWithEmail } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch =  useDispatch()


  const {email, password, onInputChange, formState} = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLogingWithEmail(formState));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  };

  const isAutenticating = useMemo(() => status === 'checking',[status])
  
  return (
    <AuthLayout title="Login">
        <form onSubmit={onSubmit} 
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="email@google.com"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Password"
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={onInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={isAutenticating}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={isAutenticating} 
                  onClick={onGoogleSingIn}
                  variant="contained"
                  fullWidth
                >
                  <Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direcrion='row' justifyContent='end'>
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Create Account
            </Link>
          </Grid>
        </form>
      </AuthLayout>
  );
};