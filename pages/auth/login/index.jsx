import { dashboardStyles } from "@/styles/dashboard_styles";
import { Box, Button, TextField } from "@mui/material";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/settingsSlice";
import { toastErrorNotify } from "@/helpers/ToastNotify";
import ErrorModal from "@/components/modals/ErrorModal";
import { fetchFail, fetchStart } from "@/redux/slices/atinaSlice";
import Loading from "@/components/Loading";

const Login = () => {
  const styles = useMemo(
    () => ({
      background: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
      },
      loginPanel: {
        backgroundColor: "#e10000",
        boxShadow: " -11px 13px 45px 0px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "300px",
        rowGap: "15px",
        padding: "2rem",
        border: "2px solid #fff",
        borderRadius: "1rem",
        position: "absolute",
        zIndex: 5,
      },
      inputLabel: {
        color: "#000",
        left: 0,
        backgroundColor: "#ffffffcc",
        paddingInline: "2px",
        borderRadius: "5px",
      },
      input: { backgroundColor: "#fff", color: "#000", borderRadius: "5px" },
    }),
    []
  );

  const [inputVal, setInputVal] = useState({});
  const { error, errorMsg, loading } = useSelector((state) => state.atina);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    const res = await signIn("credentials", {
      username: inputVal.username,
      password: inputVal.password,
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      dispatch(fetchFail({ message: `${res.status} ${res.error}` }));
    }

    const session = await getSession();
    if (session) {
      const { user } = session;
      dispatch(setUser({ user }));
      router.push("/mobile-bookings");
    } else {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      // console.log("no user");
    }
  };

  return (
    <>
      <Head>
        <title>Attensam Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error && <ErrorModal error={errorMsg} />}
      {loading && <Loading />}{" "}
      <Box component={Paper} sx={styles.background}>
        <Box component="form" onSubmit={handleSubmit} sx={styles.loginPanel}>
          <Image
            src={"/assets/attensam-logo.svg"}
            style={{
              marginBottom: "3rem",
            }}
            width={375}
            height={150}
            alt="logo"
          />

          <TextField
            onChange={handleChange}
            sx={{ width: "350px" }}
            color="secondary"
            InputLabelProps={{
              sx: styles.inputLabel,
            }}
            inputProps={{
              sx: styles.input,
            }}
            variant="outlined"
            name="username"
            label="Benutzername"
            type="text"
            required
          />
          <TextField
            onChange={handleChange}
            sx={{ width: "350px" }}
            color="secondary"
            InputLabelProps={{
              sx: styles.inputLabel,
            }}
            inputProps={{
              sx: styles.input,
            }}
            variant="outlined"
            name="password"
            label="Kennwort"
            type="password"
            required
          />
          <div style={{ height: "2.7rem" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...dashboardStyles.logoutBtn, width: "350px" }}
            >
              einloggen
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Login;
