import axios from "axios";
import { getSession } from "next-auth/react";
import { toastErrorNotify } from "./ToastNotify";

export const getAtinaData = async (url) => {
  const baseURL = "https://pro.attensam.at/atina/";
  let res = null;
  try {
    const data = await fetch(`${baseURL}${url}`, {
      next: { revalidate: 50 },
    }).then((res) => res.json());
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    res = data;
  } catch (err) {
    const { message } = err;

    console.log(err);
    console.log(message);
  }

  return res;
};

export class AtinaCalls {
  constructor() {
    this.baseUrl = "https://pro.attensam.at/atina/";
  }

  async fetchData(url) {
    let res = null;
    let error = null;
    try {
      const { data } = await axios(`${this.baseUrl}${url}`);
      res = data;
    } catch (err) {
      // console.log(err);
      error = err.message;
      console.log(err);
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      // toastErrorNotify(`${error}`);
    }
    return { res, error };
  }
}
