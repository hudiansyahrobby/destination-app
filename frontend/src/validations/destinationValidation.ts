import * as Yup from "yup";

export const destinationValidation = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, {
      message: "name should only contain alphapet or space or number",
    })
    .required("name is required"),
  city: Yup.string()
    .matches(/^[a-zA-Z ]*$/, {
      message: "city should only contain alphapet or space",
    })
    .required("city is required"),
  province: Yup.string()
    .matches(/^[a-zA-Z ]*$/, {
      message: "city should only contain alphapet or space",
    })
    .required("city is required"),
  categoryId: Yup.number().required("CategoryId is required"),
  description: Yup.string()
    .min(50, "Should be at least 50 characters long")
    .required("description is required"),
  images: Yup.mixed().when("isArray", {
    is: Array.isArray,
    then: Yup.array().of(Yup.string()),
    otherwise: Yup.string(),
  }),
});
