import { SimpleGrid } from "@chakra-ui/layout";
import {
  FaUmbrellaBeach,
  FaUserAlt,
  FaBuffer,
  FaComment,
  FaPencilAlt,
} from "react-icons/fa";
import AdminCard from "../components/card/AdminCard";
import Layout from "../components/Layout";
import Title from "../components/typography/Title";
import useDestinations from "../hooks/useDestinations";

const AdminDashboard = () => {
  const {
    data: destination,
    isLoading: isDestinationLoading,
  } = useDestinations();
  console.log("DESTINATION", destination);

  return (
    <Layout>
      <Title textAlign="center" mt="32" fontSize="4xl">
        Admin Dashboard
      </Title>
      <SimpleGrid columns={2} spacing={5} mx={{ sm: 5, md: 10 }} my={10}>
        <AdminCard
          icon={FaUmbrellaBeach}
          title={`${destination?.pages[0]?.totalItems} Jumlah Destinasi`}
          to="/admin/destinations"
        />
        <AdminCard icon={FaUserAlt} title="Jumlah Pengguna" to="/admin/users" />
        <AdminCard
          icon={FaBuffer}
          title="Jumlah Kategori"
          to="/admin/categories"
        />
        <AdminCard
          icon={FaComment}
          title="Jumlah Komentar"
          to="/admin/comments"
        />
        <AdminCard
          icon={FaPencilAlt}
          title="Buat Destinasi Baru"
          to="/admin/destinations/create"
        />
      </SimpleGrid>
    </Layout>
  );
};

export default AdminDashboard;
