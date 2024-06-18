import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

export const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <StyledIconButton size="large" onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)(({ theme }) =>
  theme.unstable_sx({
    position: "absolute",
    top: "5%",
    left: "5%",
    zIndex: "1",
  })
);
