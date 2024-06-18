import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";

import { ThemeProvider } from "../../providers/ThemeProvider";
import { useBoundStore } from "../../store/useBoundStore";

import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const logout = useBoundStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <StyledContainer maxWidth="md">
        <StyledIconButton size="large" onClick={() => logout()}>
          <LogoutIcon />
        </StyledIconButton>
        <StyledBox>
          <Typography variant="h4" gutterBottom>
            Pick Module
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <StyledPaper onClick={() => navigate("/userManagement")}>
                <Typography variant="h6">Users management</Typography>
              </StyledPaper>
            </Grid>
            <Grid item>
              <StyledPaper>
                <Typography variant="h6">Jobs Directory</Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </StyledBox>
      </StyledContainer>
    </ThemeProvider>
  );
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 200,
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: "5%",
  right: "5%",
});

const StyledContainer = styled(Container)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  textAlign: "center",
});
