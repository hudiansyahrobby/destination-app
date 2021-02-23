import React from "react";
import DestinationForm from "../components/form/DestinationForm";
import Layout from "../components/Layout";
import { getQuery } from "../helpers/getQuery";

const AddDestination = () => {
  const editMode = !!getQuery("editMode");
  return (
    <Layout>
      <DestinationForm editMode={editMode} />
    </Layout>
  );
};
export default AddDestination;
