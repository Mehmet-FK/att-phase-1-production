import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const BASE_URL = "https://pro.attensam.at/atina/";
  const { token } = useSelector((state) => state.settings.user);
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosInstance, axiosWithToken };
};

export default useAxios;
