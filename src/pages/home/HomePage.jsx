import { Typography, Container, Button, useMediaQuery } from "@mui/material";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import backgroundVideo from "../../assets/backgroundVideo.mp4";

export const HomePage = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <StyledContainer>
        <StyledTypography variant="h1">MY WEBSITE</StyledTypography>
        <Link to="/login">
          <Button
            size={isLargeScreen ? "large" : isMediumScreen ? "medium" : "small"}
            variant="contained"
          >
            LET{"'"}S START
          </Button>
        </Link>
      </StyledContainer>
      <VideoComponent
        autoPlay
        loop
        muted
        src={backgroundVideo}
      ></VideoComponent>
    </>
  );
};

const VideoComponent = styled("video")({
  position: "absolute",
  zIndex: -1,
  top: 0,
  left: 0,
  height: "100vh",
  width: "100%",
  objectFit: "cover",
  filter: "brightness(0.6)",
});

const StyledContainer = styled(Container)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

const StyledTypography = styled(Typography)({
  color: "ghostwhite",
  textShadow: "3px 3px 4px rgba(0, 0, 0, 0.7)",
});
