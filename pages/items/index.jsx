import ErrorModal from "@/components/modals/ErrorModal";
// import ItemsTable from "@/components/tables/ItemsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const AtinaItems = ({ data, error }) => {
  // useEffect(() => {
  //   getAtinaItemsData("Order");
  // }, []);
  // const { atinaItems } = useSelector((state) => state.atina);
  // const { error } = useSelector((state) => state.atina);
  // const { loading } = useSelector((state) => state.atina);
  // console.log("INDEX.JS", atinaItems);

  const ItemsTable = dynamic(() => import("@/components/tables/ItemsTable"), {
    ssr: false,
  });

  return (
    <>
      <ErrorModal error={error} />
      <Head>
        <title>Datensätze</title>
      </Head>
      {/* <h2 style={{ marginBottom: "0.3rem", fontSize: "1.7rem" }}>Datensätze</h2> */}
      <ItemsTable atinaItems={data || []} />
    </>
  );
};

export default AtinaItems;
export const getServerSideProps = async (context) => {
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

  const { res, error } = await atinaCalls.fetchData(
    "api/AtinaItems/SearchByKeyValue?ItemType=Order"
  );
  // .then((res) => (data = res));

  return {
    props: {
      data: !error && res,
      error: error,

      session,
    },
  };
};
