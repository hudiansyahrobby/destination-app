import DestinationForm from "../components/form/DestinationForm";
import Layout from "../components/Layout";
import { getQuery } from "../helpers/query";

const AddDestination = () => {
  const editMode = !!getQuery("editMode");
  return (
    <Layout>
      <DestinationForm editMode={editMode} />
    </Layout>
  );
};
export default AddDestination;
