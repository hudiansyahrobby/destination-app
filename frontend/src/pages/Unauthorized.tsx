import Layout from "../components/Layout";
import { ReactComponent as UnauthorizedImage } from "../assets/images/unauthorized.svg";
import { Box } from "@chakra-ui/layout";
import Title from "../components/typography/Title";
import { Link } from "react-router-dom";
import { chakra } from "@chakra-ui/system";

const Unauthorized = () => {
  const BackLink = chakra(Link);
  const Image = chakra(UnauthorizedImage);
  return (
    <Layout>
      <Box
        mt={28}
        textAlign="center"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Title mb="10">Unauthorized</Title>
        <Image height="80" width="md" />
        <BackLink mt="10" to="/" color="green.500">
          Back To Home
        </BackLink>
      </Box>
    </Layout>
  );
};
export default Unauthorized;
