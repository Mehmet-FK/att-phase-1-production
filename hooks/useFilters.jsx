import {
  setCurrentPage,
  setFilterParams,
  setSearchTrigger,
  setSortType,
} from "@/redux/slices/tableUtilsSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";

const useFilters = () => {
  const dispatch = useDispatch();
  const adapterDayjs = new AdapterDayjs();

  const filterUsers = (filterVal) => {
    let base = "";
    for (const key in filterVal) {
      if (!filterVal[key]) continue;
      base += `&${key}=${filterVal[key]}`;
    }
    dispatch(setFilterParams({ params: base, table: "users" }));
    dispatch(setCurrentPage({ number: 1, table: "users" }));
    dispatch(setSearchTrigger({ table: "users" }));

    return base;
  };

  const filterBookings = (filterVal, setFilterVal) => {
    const isDateFromValid = adapterDayjs.isValid(filterVal.dateFrom);
    const isDateToValid = adapterDayjs.isValid(filterVal.dateTo);
    const currentValues = {
      ...filterVal,
      dateFrom: isDateFromValid ? filterVal.dateFrom : null,
      dateTo: isDateToValid ? filterVal.dateTo : null,
    };
    setFilterVal({
      ...filterVal,
      dateFrom: isDateFromValid ? filterVal.dateFrom : null,
      dateTo: isDateToValid ? filterVal.dateTo : null,
    });

    let base = "";

    for (const key in filterVal) {
      if (!filterVal[key]) continue;

      if (key.includes("date")) {
        let edited = new Date(filterVal[key])
          .toLocaleDateString("sv")
          .replaceAll("-", "");
        base += `&${key}=${edited}`;
      } else {
        base += `&${key}=${filterVal[key]}`;
      }
    }

    dispatch(setFilterParams({ params: base, table: "bookings" }));
    dispatch(setCurrentPage({ number: 1, table: "bookings" }));
    dispatch(setSearchTrigger({ table: "bookings" }));

    return base;
  };
  const filterItems = (filterVal) => {
    const { filterOptions } = filterVal;

    let base = "";
    for (const key in filterVal) {
      if (!filterVal[key]) continue;
      else if (key.includes("filterOptions")) {
        base += `&filterOptions=${filterOptions}`;
      } else {
        base += `&${key.charAt(0).toUpperCase() + key.slice(1)}=${
          filterVal[key]
        }`;
      }
    }

    console.log(base);

    dispatch(setFilterParams({ params: base, table: "items" }));
    dispatch(setCurrentPage({ number: 1, table: "items" }));
    dispatch(setSearchTrigger({ table: "items" }));

    return base;
  };
  const filterProtocol = (filterVal) => {
    const {
      protocolType,
      module,
      userId,
      userName,
      itemId,
      itemNumber,
      dateFrom,
      timeFrom,
      dateTo,
      timeTo,
      street,
      streetnumber,
      zip,
      city,
      country,
    } = filterVal;

    let base = "";

    if (protocolType) {
      base += `&protocolType=${protocolType}`;
    }
    if (module) {
      base += `&module=${module}`;
    }
    if (userId) {
      base += `&userId=${userId}`;
    }
    if (userName) {
      base += `&userName=${userName}`;
    }
    if (itemId) {
      base += `&itemId=${itemId}`;
    }
    if (itemNumber) {
      base += `&itemNumber=${itemNumber}`;
    }
    if (dateFrom) {
      const editedDate = new Date(dateFrom).toISOString();
      base += `&dateFrom=${editedDate}`;
    }
    if (timeFrom) {
      base += `&timeFrom=${timeFrom}`;
      // console.log(timeFrom + ":00.0000000");
    }
    if (dateTo) {
      const editedDate = new Date(dateTo).toISOString();
      base += `&dateTo=${editedDate}`;
    }
    if (timeTo) {
      base += `&timeTo=${timeTo}`;
    }
    if (street) {
      base += `&street=${street}`;
    }
    if (streetnumber) {
      base += `&streetnumber=${streetnumber}`;
    }
    if (zip) {
      base += `&zip=${zip}`;
    }
    if (city) {
      base += `&city=${city}`;
    }
    if (country) {
      base += `&country=${country}`;
    }

    dispatch(setFilterParams({ params: base, table: "protocol" }));
    dispatch(setCurrentPage({ number: 1, table: "protocol" }));
    dispatch(setSearchTrigger({ table: "protocol" }));

    return base;
  };
  const resetFilter = (table) => {
    dispatch(setFilterParams({ params: "", table }));
    dispatch(setSortType({ field: {}, table }));
  };

  return {
    filterBookings,
    resetFilter,
    filterItems,
    filterProtocol,
    filterUsers,
  };
};

export default useFilters;
