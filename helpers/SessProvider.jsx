import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Authentication = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.data?.user?.token) {
      router.push("/auth/login");
    } else {
      router.push("/users");
    }
  }, [session]);

  return <>{children}</>;
};

export default Authentication;
