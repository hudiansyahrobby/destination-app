import * as Yup from "yup";

export const categoryValidation = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, {
      message: "name should only contain alphapet or space",
    })
    .required("name is required"),
});
