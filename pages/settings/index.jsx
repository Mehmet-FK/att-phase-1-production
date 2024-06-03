import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Einstellungen</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

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
    props: { session },
  };
};
