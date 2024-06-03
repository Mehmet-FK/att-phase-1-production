import { useDispatch, useSelector } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import {
  editOneObject,
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "../redux/slices/atinaSlice";
import useAxios from "./useAxios";
import { setPageSize, setSearchTrigger } from "@/redux/slices/tableUtilsSlice";
import usePagination from "./usePagination";

const useAtinaCalls = () => {
  const dispatch = useDispatch();
  const { axiosInstance, axiosWithToken } = useAxios();
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.users);
  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("users");
  //!--------------- GET CALL --------------
  const getAtinaData = async (url) => {
    dispatch(fetchStart());

    let res = null;
    let error = null;
    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(getSuccess({ data, url }));

      res = data;
    } catch (err) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
      console.log(message);
      error = err;
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
      }, 150);
    }
    return { error, res };
  };

  const getUsersData = (params = "") =>
    getAtinaData("AtinaUsers?showPagination=true&" + params);
  const getBookingTypes = () =>
    getAtinaData("api/AtinaMasterData/GetBookingTypes");
  const getMobileBookingsData = (params = "") => {
    getAtinaData("api/AtinaMobileBookings?showPagination=true&" + params);
  };

  const getNfcTagsData = () => getAtinaData("AtinaNfcTags");

  const getAtinaItemsData = (params = "", type = "Order") =>
    getAtinaData(
      `api/AtinaItems/SearchByKeyValue?ItemType=${type}&onlyWithTagId=false&showPagination=true&` +
        params
    );
  const getAtinaRoleDefinitions = () =>
    getAtinaData("api/AtinaRoleDefinitions/getall");
  const getProtocolData = (params = "") => {
    getAtinaData("api/AtinaProtocol?showPagination=true&" + params);
  };
  //!--------------- POST CALL --------------
  const postAtinaData = async (url, params) => {
    try {
      const x = await axiosWithToken.post(`${url}`, params);
      toastSuccessNotify(`Erfolgreich durchgeführt..`);
    } catch (error) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(error.response.data);
      dispatch(
        fetchFail({
          message: error.message,
        })
      );
      console.log(error);
    }
  };

  const postUserData = (params) => {
    const editedRoles = params.roleIds.map((x) => Number(x));
    const editedParams = {
      ...params,
      roleIds: editedRoles,
    };
    postAtinaData("AtinaUsers/register", editedParams);

    getUsersData();
  };

  //!--------------- PUT CALL --------------
  const putAtinaData = async (url, info) => {
    try {
      await axiosWithToken.put(`${url}/${info.id}`, info);
      // toastSuccessNotify(`Etwas ist schiefgelaufen..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  const putUserData = async (info) => {
    const roles = info?.roleIds.map((x) => Number(x));

    try {
      const editedData = {
        id: info.id,
        username: info.username,
        firstname: info.firstname,
        lastname: info.lastname,
        personnelNumber: info.personnelnumber,
        password: info.password ? info.password : "",
        client: info.client,
        settlement: info.settlement,
        roleIds: roles,
      };

      await axiosWithToken.post("AtinaUsers/update", editedData);

      const xData = {
        userInfo: {
          id: info.id,
          externalUserID: info.externalUserID,
          username: info.username,
          passwordHash: info.passwordHash,
          passwordSalt: info.passwordSalt,
          externalPersonnelID: info.externalPersonnelID,
          personnelnumber: info.personnelnumber,
          firstname: info.firstname,
          lastname: info.lastname,
          client: info.client,
          settlement: info.settlement,
          isAdministrator: info.isAdministrator,
        },
        roles: info?.roleIds,
      };

      dispatch(editOneObject({ data: xData, modul: "users" }));
      // dispatch(setSearchTrigger({ table: "users" }));

      toastSuccessNotify(`Erfolgreich durchgeführt..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  const assignMultipleUserRoles = (userids, roleIds, users) => {
    dispatch(fetchStart());
    try {
      //Post Call to assign user roles
      axiosWithToken.post("AtinaUserRoles/assign/multiple", {
        userIds: userids,
        roleIds: roleIds,
      });

      // Edit Present Users to avoid a new get call

      users.forEach((user) => {
        const { userInfo } = user;
        const xData = {
          userInfo: {
            id: userInfo.id,
            externalUserID: userInfo.externalUserID,
            username: userInfo.username,
            passwordHash: userInfo.passwordHash,
            passwordSalt: userInfo.passwordSalt,
            externalPersonnelID: userInfo.externalPersonnelID,
            personnelnumber: userInfo.personnelnumber,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            client: userInfo.client,
            settlement: userInfo.settlement,
            isAdministrator: userInfo.isAdministrator,
          },
          roles: roleIds.map((x) => x.toString()),
        };
        dispatch(editOneObject({ data: xData, modul: "users" }));
      });
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (error) {
      dispatch(fetchFail({ message: error?.message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${error?.message}`);
      console.log(error?.message);
    } finally {
      dispatch(stopLoading());
      // dispatch(setSearchTrigger({ table: "users" }));
    }
  };

  //!--------------- DELETE CALL --------------
  const deleteAtinaData = async (url, id) => {
    let res = null;
    let error = null;
    try {
      res = await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (err) {
      error = err;
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
    return { res, error };
  };
  //*GET

  //*PUT
  // const putUserData = (info) => putAtinaData("AtinaUsers", info);

  //* DELETE
  const deleteAtinaItems = (id) => deleteAtinaData("api/AtinaItems/Delete", id);
  return {
    getUsersData,
    getMobileBookingsData,
    getNfcTagsData,
    getAtinaItemsData,
    getProtocolData,
    putUserData,
    deleteAtinaItems,
    getBookingTypes,
    getAtinaRoleDefinitions,
    postUserData,
    assignMultipleUserRoles,
  };
};

export default useAtinaCalls;
