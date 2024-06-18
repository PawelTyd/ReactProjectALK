import registerAnimation from "../../assets/registerAnimation.json";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Lottie from "lottie-react";

export const RegisterAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animationDuration = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3500);

    return () => clearTimeout(animationDuration);
  }, [navigate]);

  return <StyledLottie animationData={registerAnimation} loop={false} />;
};

const StyledLottie = styled(Lottie)(({ theme }) =>
  theme.unstable_sx({
    height: "100vh",
    objectFit: "cover",
    overflow: "hidden",
  })
);
