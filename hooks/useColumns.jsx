import { tableStyles } from "@/styles/table_styles";
import { Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useColumns = () => {
  const { bookingTypes } = useSelector((state) => state.atina);

  const PROTOCOL_TABLE_COLUMNS = [
    {
      accessor: "createdDate",
      Header: "Datum",
      Cell: ({ value }) => new Date(value).toLocaleDateString("tr"),
    },
    {
      accessor: "createdTime",
      Header: "Uhrzeit",
      Cell: ({ value }) => value?.slice(0, value?.lastIndexOf(":")),
    },
    {
      accessor: "userId",
      Header: "Benutzer ID",
    },
    {
      accessor: "protocoltype",
      Header: "Protokolltyp",
      width: 150,
    },
    {
      accessor: "module",
      Header: "Modul",
    },
    {
      accessor: "item",
      Header: "Datensatz",
    },
    {
      accessor: "description",
      Header: "Beschreibung",
      width: 150,
      Cell: ({ value }) => {
        if (value.length <= 25) {
          return value;
        } else {
          return value.slice(0, 26) + "...";
        }
      },
    },
  ];

  const USER_TABLE_COLUMNS = [
    {
      accessor: "userInfo.client",
      Header: "Mandant",
      // width: 150,
    },
    {
      accessor: "userInfo.settlement",
      Header: "Standort",
      // width: 150,
    },
    {
      accessor: "userInfo.username",
      Header: "benutzername",
    },
    {
      accessor: "userInfo.passwordHash",
      Header: "kennwort",
      Cell: () => "*******",
    },
    {
      accessor: "userInfo.personnelnumber",
      Header: "personalnummer",
    },
    {
      accessor: "userInfo.firstname",
      Header: "vorname",
    },
    {
      accessor: "userInfo.lastname",
      Header: "nachname",
    },

    /*  {
      Header: "bild",
      // width: 150,
      Cell: (row) => (
        <Avatar
          sx={{ ...tableStyles.tr.image, margin: "auto" }}
          src={`data:image/png;base64,${row.original?.image}`}
        />
      ),
    }, */
  ];
  const ITEM_TABLE_ORDER_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "Auftrag",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "tagID",
      Header: "Tag ID",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "Hausnummer",
    },
    // {
    //   accessor: "personnelnumber",
    //   Header: "personalnummer",
    // },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "Mandant",
    },
    {
      accessor: "data2",
      Header: "Auftragsart",
    },
    {
      accessor: "data3",
      Header: "Auftragsbetreff",
    },
    {
      accessor: "data4",
      Header: "Kundennummer",
    },
    {
      accessor: "data5",
      Header: "Kundenname",
    },
  ];
  const ITEM_TABLE_METER_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "Zähler",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "tagID",
      Header: "Tag ID",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "Hausnummer",
    },
    // {
    //   accessor: "personnelnumber",
    //   Header: "personalnummer",
    // },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "Letzte Ablesung am",
    },
    {
      accessor: "data2",
      Header: "Letzte Ablesung",
    },
  ];
  const ITEM_TABLE_VEHICLE_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "KFZ",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "tagID",
      Header: "Tag ID",
    },
    {
      accessor: "data1",
      Header: "Mandant",
    },
    {
      accessor: "data2",
      Header: "Standort",
    },
    {
      accessor: "data3",
      Header: "Kennzeichen",
    },
    {
      accessor: "data4",
      Header: "Modell",
    },
    {
      accessor: "data5",
      Header: "Status",
    },
    // {
    //   accessor: "data6",
    //   Header: "#",
    // },
  ];

  const NFC_TABLE_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: ({ value }) => {
        if (value === "Order") {
          return "Auftrag";
        } else if (value === "Meter") {
          return "Zähler";
        } else if (value === "Vehicle") {
          return "KFZ";
        }
      },
    },
    {
      accessor: "itemNumber",
      Header: "datensatznummer",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "hausnummer",
    },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "daten1",
    },
    {
      accessor: "data2",
      Header: "daten2",
    },
    {
      accessor: "data3",
      Header: "daten3",
    },
    {
      accessor: "data4",
      Header: "daten4",
    },
    {
      accessor: "data5",
      Header: "daten5",
    },
    {
      accessor: "data6",
      Header: "daten6",
    },
    {
      accessor: "data7",
      Header: "daten7",
    },
    {
      accessor: "data8",
      Header: "daten8",
    },
    {
      accessor: "data9",
      Header: "daten9",
    },
    {
      accessor: "data10",
      Header: "daten10",
    },
    {
      accessor: "createdDate",
      Header: "erstellt am",
      Cell: ({ value }) => new Date(value).toLocaleDateString("tr"),
    },
  ];

  const BUCHUNGEN_TABLE_COLUMNS = [
    {
      accessor: "ImportState",
      Header: "Import Status",
      width: 110,
      Cell: ({ value }) => {
        return (
          <span
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value === "I" && <LoopIcon />}
            {value === "A" && <SyncProblemIcon />}
            {value === "D" && <CheckIcon />}
          </span>
        );
      },
    },
    {
      accessor: "FileCounter",
      Header: "Bilder",
    },

    {
      accessor: "Username",
      Header: "Benutzername",
      // width: 100,
    },
    {
      accessor: "Firstname",
      Header: "Vorname",
      // width: 100,
    },
    {
      accessor: "Lastname",
      Header: "Nachname",
      // width: 100,
    },
    {
      accessor: "BookingType",
      Header: "buchungstyp",
      Cell: ({ value }) => bookingTypes[value]?.Caption,
    },
    {
      accessor: "Itemnumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "Date",
      Header: "datum",
      Cell: ({ value }) => value && new Date(value).toLocaleDateString("tr"),
    },
    {
      accessor: "Time",
      Header: "uhrzeit",
      Cell: ({ value }) => value?.slice(0, value?.lastIndexOf(":")),
    },
    {
      accessor: "ItemType",
      Header: "typ",
      Cell: ({ value }) => {
        if (value === "Order") {
          return "Auftrag";
        } else if (value === "Meter") {
          return "Zähler";
        } else if (value === "Vehicle") {
          return "KFZ";
        }
      },
    },
    {
      accessor: "Street",
      Header: "straße",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Streetnumber",
      Header: "hausnummer",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "ZIP",
      Header: "plz",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "City",
      Header: "stadt",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Country",
      Header: "land",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Data1",
      Header: "Daten 1",
    },
    {
      accessor: "Data2",
      Header: "Daten 2",
    },
    {
      accessor: "Data3",
      Header: "Daten 3",
    },
    {
      accessor: "Data4",
      Header: "Daten 4",
    },
    {
      accessor: "Data5",
      Header: "Daten 5",
    },
  ];

  return {
    USER_TABLE_COLUMNS,
    ITEM_TABLE_ORDER_COLUMNS,
    ITEM_TABLE_METER_COLUMNS,
    ITEM_TABLE_VEHICLE_COLUMNS,
    NFC_TABLE_COLUMNS,
    BUCHUNGEN_TABLE_COLUMNS,
    PROTOCOL_TABLE_COLUMNS,
  };
};

export default useColumns;
