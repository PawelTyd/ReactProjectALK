import {
  Alert,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

import LoginAnimation from "../../assets/LoginAnimation.json";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { ValidationSchema } from "./ValidationSchema";
import { useBoundStore } from "../../store/useBoundStore";

import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import Lottie from "lottie-react";

export const LoginPage = () => {
  const { setUser, setLoginError, registeredUser, loginError } = useBoundStore(
    (state) => ({
      setUser: state.setUser,
      setLoginError: state.setLoginError,
      registeredUser: state.registeredUser,
      loginError: state.loginError,
    })
  );
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(ValidationSchema),
  });

  useEffect(() => {
    return () => {
      setLoginError(false);
    };
  }, [setLoginError]);

  const onSubmit = (formData) => {
    if (
      formData.email === registeredUser?.email &&
      formData.password === registeredUser?.password
    ) {
      setUser(formData.email, formData.password);
      navigate("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <ThemeProvider>
      <StyledGridContainer container component="main">
        <StyledGridItem item sm={6} md={7}>
          <StyledLottie
            animationData={LoginAnimation}
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </StyledGridItem>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6}>
          <StyledBox>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <StyledFormBox
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValid || isSubmitting}
              >
                Login
              </StyledButton>
              <Grid container>
                <Grid item xs>
                  <Link to="/resetPassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">Create Account</Link>
                </Grid>
              </Grid>

              {loginError && (
                <StyledAlert severity="error">
                  {"Invalid email or password"}
                </StyledAlert>
              )}
            </StyledFormBox>
          </StyledBox>
        </Grid>
      </StyledGridContainer>
    </ThemeProvider>
  );
};

const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
    mb: 2,
  })
);
const StyledAlert = styled(Alert)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
  })
);

const StyledGridContainer = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    height: "100vh",
    overflow: "hidden",
  })
);

const StyledGridItem = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    display: { xs: "none", sm: "block" },
  })
);

const StyledBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })
);

const StyledFormBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: 1,
  })
);

const StyledLottie = styled(Lottie)(({ theme }) =>
  theme.unstable_sx({
    height: "100vh",
    objectFit: "cover",
  })
);
