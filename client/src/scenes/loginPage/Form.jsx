import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

/* -------------------- VALIDATION -------------------- */
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  picture: yup.mixed().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

/* -------------------- INITIAL VALUES -------------------- */
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  /* -------------------- API CALLS -------------------- */
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) =>
      formData.append(key, values[key])
    );
    formData.append("picturePath", values.picture.name);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (savedUser) setPageType("login");
  };

  const login = async (values, onSubmitProps) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await response.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      localStorage.setItem("token", loggedIn.token);
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    isLogin ? await login(values, onSubmitProps) : await register(values, onSubmitProps);
  };

  /* -------------------- UI -------------------- */
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            gap="1.25rem"
          >
            {/* HEADER */}
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="600">
                {isLogin ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography color="text.secondary" fontSize="0.9rem">
                {isLogin
                  ? "Login to continue"
                  : "Fill in the details below"}
              </Typography>
            </Box>

            <Divider />

            {/* REGISTER FIELDS */}
            {isRegister && (
              <>
                <Box
                  display="grid"
                  gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                  gap="1rem"
                >
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Box>

                <TextField
                  label="Location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />

                <TextField
                  label="Occupation"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.occupation && errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                />

                {/* IMAGE UPLOAD */}
                <Box
                  p="1rem"
                  border={`1px dashed ${theme.palette.primary.main}`}
                  borderRadius="0.75rem"
                  textAlign="center"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(files) =>
                      setFieldValue("picture", files[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} sx={{ cursor: "pointer" }}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography color="text.secondary">
                            Click to upload profile picture
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography fontSize="0.9rem">
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon fontSize="small" />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* LOGIN FIELDS */}
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              size="large"
              sx={{
                mt: "1.5rem",
                py: "0.75rem",
                borderRadius: "0.75rem",
                fontWeight: "600",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            {/* SWITCH */}
            <Typography
              textAlign="center"
              fontSize="0.9rem"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Don’t have an account? Sign up"
                : "Already have an account? Login"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
