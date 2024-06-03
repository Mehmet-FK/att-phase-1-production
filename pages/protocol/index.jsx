import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { getSession } from "next-auth/react";
const Protocol = () => {
  const ProtocolTable = dynamic(
    () => import("@/components/tables/ProtocolTable"),
    {
      ssr: false,
    }
  );

  return (
    <>
      <Head>
        <title>Protokoll</title>
      </Head>

      <ProtocolTable />
    </>
  );
};

export default Protocol;
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
  return {
    props: {
      session,
    },
  };
};
