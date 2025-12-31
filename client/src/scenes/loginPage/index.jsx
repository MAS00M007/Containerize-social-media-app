import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection={isNonMobileScreens ? "row" : "column"}
      bgcolor={theme.palette.background.default}
    >
      {/* LEFT BRAND SECTION */}
      {isNonMobileScreens && (
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px="6%"
          bgcolor={theme.palette.primary.main}
          color={theme.palette.background.alt}
        >
          <Typography fontSize="42px" fontWeight="700">
            Social-media-app
          </Typography>

          <Typography mt="1rem" fontSize="18px" maxWidth="420px">
            Connect, share, and build your digital identity in a modern social
            ecosystem designed for meaningful interactions.
          </Typography>
        </Box>
      )}

      {/* RIGHT FORM SECTION */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={isNonMobileScreens ? "4%" : "1rem"}
      >
        <Box
          width={isNonMobileScreens ? "420px" : "100%"}
          p="2.5rem"
          borderRadius="1.5rem"
          bgcolor={theme.palette.background.alt}
          boxShadow="0 10px 40px rgba(0,0,0,0.12)"
        >
          {!isNonMobileScreens && (
            <Typography
              fontSize="28px"
              fontWeight="700"
              color="primary"
              textAlign="center"
              mb="1rem"
            >
              Social-media-app
            </Typography>
          )}

          <Typography
            fontWeight="600"
            variant="h5"
            textAlign="center"
            mb="0.5rem"
          >
            Welcome Back
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            mb="2rem"
          >
            Login or create a new account to continue
          </Typography>

          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
