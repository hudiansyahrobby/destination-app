import CategoryForm from "../components/form/CategoryForm";
import Layout from "../components/Layout";
import { getQuery } from "../helpers/query";

const AddCategory = () => {
  const editMode = !!getQuery("editMode");
  return (
    <Layout>
      <CategoryForm editMode={editMode} />
    </Layout>
  );
};
export default AddCategory;
