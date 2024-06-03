import ErrorModal from "@/components/modals/ErrorModal";
// import UsersTable from "@/components/tables/UsersTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const AtinaUsers = () => {
  const UsersTable = dynamic(() => import("@/components/tables/UsersTable"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Benutzer</title>
      </Head>

      <UsersTable />
    </>
  );
};

export default AtinaUsers;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const atinaCalls = new AtinaCalls();

  // const { res, error } = await atinaCalls.fetchData("AtinaUsers");
  // console.log(error);
  return {
    props: {
      // data: !error && res,
      // data: !error && res,
      // error: error,
      // data: !error && res,

      session,
    },
  };
};
