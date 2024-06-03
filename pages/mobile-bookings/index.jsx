import ErrorModal from "@/components/modals/ErrorModal";
// import MobileBookingsTable from "@/components/tables/MobileBookingsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";

import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const MobileBookings = ({ data, error }) => {
  const MobileBookingsTable = dynamic(
    () => import("@/components/tables/MobileBookingsTable"),
    {
      ssr: false,
    }
  );

  return (
    <>
      <ErrorModal error={error} />
      <Head>
        <title>Mobile Buchungen</title>
      </Head>
      {/* <MobileBookingsTable data={data || []} /> */}
      <MobileBookingsTable data={{}} />
    </>
  );
};

export default MobileBookings;

export const getServerSideProps = async (context) => {
  // let data = null;
  // let error = null;
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

  // const { res, error } = await atinaCalls.fetchData(
  //   "api/AtinaMobileBookings?pageNumber=1&pageSize=1500"
  // );

  // .then((res) => (data = res));

  return {
    props: {
      // data: !error && res,
      // error: error,

      session,
    },
  };
};
