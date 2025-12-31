import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      bgcolor={alt}
    >
      <FlexBetween padding="0.75rem 6%">
        {/* LEFT */}
        <FlexBetween gap="1.5rem">
          <Typography
            fontWeight="700"
            fontSize="clamp(1.2rem, 2.2vw, 2rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              cursor: "pointer",
              "&:hover": { color: primaryLight },
            }}
          >
            Social-media-app
          </Typography>

          {isNonMobileScreens && (
            <FlexBetween
              bgcolor={neutralLight}
              borderRadius="999px"
              px="1.25rem"
              py="0.25rem"
              gap="1rem"
            >
              <InputBase placeholder="Search…" />
              <IconButton size="small">
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* RIGHT */}
        {isNonMobileScreens ? (
          <FlexBetween gap="1.25rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: dark }} />
              )}
            </IconButton>

            <IconButton>
              <Message />
            </IconButton>

            <IconButton>
              <Notifications />
            </IconButton>

            <IconButton>
              <Help />
            </IconButton>

            <FormControl variant="standard">
              <Select
                value={fullName}
                input={<InputBase />}
                sx={{
                  bgcolor: neutralLight,
                  borderRadius: "999px",
                  px: "1rem",
                  py: "0.25rem",
                  minWidth: "160px",
                  "& .MuiSvgIcon-root": { right: "8px" },
                }}
              >
                <MenuItem value={fullName}>
                  <Typography fontWeight="500">{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsMobileMenuToggled(true)}>
            <Menu />
          </IconButton>
        )}
      </FlexBetween>

      {/* MOBILE DRAWER */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          top="0"
          height="100vh"
          width="75%"
          bgcolor={background}
          zIndex="200"
          boxShadow="-10px 0 30px rgba(0,0,0,0.2)"
        >
          <FlexBetween p="1rem">
            <Typography fontWeight="600">Menu</Typography>
            <IconButton onClick={() => setIsMobileMenuToggled(false)}>
              <Close />
            </IconButton>
          </FlexBetween>

          <FlexBetween
            flexDirection="column"
            gap="2rem"
            mt="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: dark }} />
              )}
            </IconButton>

            <Message />
            <Notifications />
            <Help />

            <FormControl variant="standard">
              <Select
                value={fullName}
                input={<InputBase />}
                sx={{
                  bgcolor: neutralLight,
                  borderRadius: "999px",
                  px: "1rem",
                }}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
