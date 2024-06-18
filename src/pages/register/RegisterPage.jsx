import { Button, TextField, Box, Typography, Container } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { ThemeProvider } from "../../providers/ThemeProvider";
import { useBoundStore } from "../../store/useBoundStore";
import { ReturnButton } from "../../components";
import { ValidationSchema } from "./ValidationSchema";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

export const RegisterPage = () => {
  const setRegisteredUser = useBoundStore((state) => state.setRegisteredUser);

  const theme = useTheme();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (formData) => {
    setRegisteredUser(
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    navigate("/registerAnimation");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ReturnButton />
        <StyledBox>
          <Typography component="h1" variant="h5">
            Register
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
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            ></Controller>

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  {...field}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            ></Controller>

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValid || isSubmitting}
            >
              Register
            </StyledButton>
          </StyledFormBox>
        </StyledBox>
      </Container>
    </ThemeProvider>
  );
};

const StyledButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
    mb: 2,
  })
);

const StyledFormBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: 1,
    boxShadow: 8,
    p: 2,
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
