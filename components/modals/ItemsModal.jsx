"use client";

import { useEffect, useState } from "react";
import ItemsModal_Order from "./itemsModals/ItemsModal_Order";
import ItemsModal_Meter from "./itemsModals/ItemsModal_Meter";
import ItemsModal_Vehicle from "./itemsModals/ItemsModal_Vehicle";
import { useSelector } from "react-redux";

//ITEM ORDER

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item, type }) => {
  const [inputVal, setInputVal] = useState(item ? item : {});
  const { user } = useSelector((state) => state.settings);

  const handleClose = () => {
    setOpenItemsModal(false);
    if (!item) {
      setInputVal({});
    }
  };
  const handleChange = (e) => {
    if (!user?.isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInputVal(item);
  }, [type, item]);

  return (
    <>
      {type === "Order" && (
        <ItemsModal_Order
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === "Meter" && (
        <ItemsModal_Meter
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === "Vehicle" && (
        <ItemsModal_Vehicle
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
    </>
  );
};

export default ItemsModal;
