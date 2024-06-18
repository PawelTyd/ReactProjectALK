import {
  Alert,
  Button,
  Box,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import { ThemeProvider } from "../../providers/ThemeProvider";
import { ReturnButton } from "../../components";
import { ValidationSchema } from "./ValidationSchema";
import { useBoundStore } from "../../store/useBoundStore";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export const ResetPasswordPage = () => {
  const theme = useTheme();

  const { loginError, setLoginError, registeredUser } = useBoundStore(
    (state) => ({
      loginError: state.loginError,
      setLoginError: state.setLoginError,
      registeredUser: state.registeredUser,
    })
  );

  const [messageSeverity, setMessageSeverity] = useState("");
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (formData) => {
    if (formData.email !== registeredUser?.email) {
      setLoginError(true);
      setMessageSeverity("error");
      setMessage("Email doesn't exist");
    } else {
      setLoginError(true);
      setMessageSeverity("success");
      setMessage("A password reset link has been sent to your email");
    }
  };

  useEffect(() => {
    return () => {
      setLoginError(false);
    };
  }, [setLoginError]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ReturnButton />
        <StyledBox>
          <Typography component="h1" variant="h5">
            Reset Password
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
                  name="email"
                  label="Email Address"
                  id="email"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            ></Controller>

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValid || isSubmitting}
            >
              Send Reset Link
            </StyledButton>
          </StyledFormBox>
        </StyledBox>

        {loginError && (
          <StyledAlert severity={messageSeverity}>{message}</StyledAlert>
        )}
      </Container>
    </ThemeProvider>
  );
};

const StyledFormBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: 1,
    boxShadow: 8,
    p: 2,
  })
);

const StyledAlert = styled(Alert)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
  })
);

const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
    mb: 2,
  })
);

const StyledBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })
);
