import * as Yup from "yup";

export const loginValidation = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, {
      message: "name should only contain alphapet or space",
    })
    .required("name is required"),
  email: Yup.string().email("email is not valid").required("email is required"),
  password: Yup.string()
    .min(8, "password must be at least 8 characters")
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      {
        message:
          "password must be at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    )
    .required("password is required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "password does not match")
    .required("password confirmation is required"),
});
