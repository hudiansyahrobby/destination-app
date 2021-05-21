import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Title from "../components/typography/Title";
import useCategories from "../hooks/categories/useCategories";

const AdminCategories = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Title textAlign="center" mt="32" fontSize="4xl">
        Category List
      </Title>
    </Layout>
  );
};

export default AdminCategories;
