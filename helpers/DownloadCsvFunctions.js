export const userTableCSV = (rawData) => {
  const headersAPI = [
    "username",
    "personnelnumber",
    "firstname",
    "lastname",
    "client",
    "settlement",
    // "passwordSalt",
  ];
  const headersCSV = [
    "Benutzername",
    "Personalnummer",
    "Vorname",
    "Nachname",
    "Mandant",
    "Standort",
    // "Kennwort",
  ];
  let arr = [];

  for (let i = 0; i < rawData.length; i++) {
    let row = {};
    Object.keys(rawData[i].userInfo).forEach((item) => {
      if (headersAPI.includes(item)) {
        row = {
          ...row,
          [item]: rawData[i].userInfo[item] ? rawData[i].userInfo[item] : " ",
        };
      }
    });

    arr.push(row);
  }
  return {
    m: arr.map((item) => Object.values(item).join(";")),
    h: headersCSV.join(";").toUpperCase(),
  };
};

export const sqlTableCSV = (rawData) => {
  const headers = Object.keys(rawData[0]);
  let arr = [];
  return {
    m: rawData.map((item) => {
      return Object.values(item)
        .map((x) =>
          typeof x === "object" ? JSON.stringify(x).replaceAll('"', "") : x
        )
        .join(";");
    }),
    h: headers.join(";").toUpperCase(),
  };
};

export const bookingsTableCSV = (rawData) => {
  const headersAPI = [
    "Username",
    "Personnelnummber",
    "Itemnumber",
    "Date",
    "Time",
    "ItemType",
    "Street",
    "Streetnumber",
    "ZIP",
    "City",
    "Country",
    "Data1",
    "Data2",
    "Data3",
    "Data4",
    "Data5",
  ];
  const headersCSV = [
    "Benutzername",
    "Personalnummer",
    "Datensatznummer",
    "Datum",
    "Uhrzeit",
    "Itemtyp",
    "Straße",
    "Hausnummer",
    "PLZ",
    "Stadt",
    "Land",
    "data1",
    "data2",
    "data3",
    "data4",
    "data5",
  ];
  let arr = [];

  for (let i = 0; i < rawData.length; i++) {
    let row = {};
    Object.keys(rawData[i]).forEach((item) => {
      if (headersAPI.includes(item)) {
        if (rawData[i][item] === "Order") {
          row = { ...row, [item]: "Auftrag" };
        } else if (rawData[i][item] === "Vehicle") {
          row = { ...row, [item]: "KFZ" };
        } else if (rawData[i][item] === "Meter") {
          row = { ...row, [item]: "Zähler" };
        } else {
          row = { ...row, [item]: rawData[i][item] };
        }
      }
    });
    arr.push(row);
  }

  return {
    m: arr.map((item) => Object.values(item).join(";")),
    h: headersCSV.join(";").toUpperCase(),
  };
};
export const nfcTableCSV = (rawData) => {
  const headersAPI = [
    "itemType",
    "itemNumber",
    "street",
    "streetnumber",
    "zip",
    "city",
    "country",
    "data1",
    "data2",
    "data3",
    "data4",
    "data5",
    "createdDate",
  ];
  const headersCSV = [
    "ItemTyp",
    "Datensatznummer",
    "Straße",
    "Hausnummer",
    "PLZ",
    "Stadt",
    "Land",
    "data1",
    "data2",
    "data3",
    "data4",
    "data5",
    "Erstellt am",
  ];
  let arr = [];

  for (let i = 0; i < rawData.length; i++) {
    let row = {};
    Object.keys(rawData[i]).forEach((item) => {
      if (headersAPI.includes(item)) {
        if (rawData[i][item] === "Order") {
          row = { ...row, [item]: "Auftrag" };
        } else if (rawData[i][item] === "Vehicle") {
          row = { ...row, [item]: "KFZ" };
        } else if (rawData[i][item] === "Meter") {
          row = { ...row, [item]: "Zähler" };
        } else {
          row = { ...row, [item]: rawData[i][item] };
        }
      }
    });
    arr.push(row);
  }

  return {
    m: arr.map((item) => Object.values(item).join(";")),
    h: headersCSV.join(";").toUpperCase(),
  };
};
export const itemsTableCSV = (rawData, type) => {
  const headersAPI = [
    "itemType",
    "itemNumber",
    "street",
    "streetnumber",
    "zip",
    "city",
    "country",
    "data1",
    "data2",
    "data3",
    "data4",
    "data5",
  ];
  const headersOrderCSV = [
    "ItemTyp",
    "Datensatznummer",
    "Straße",
    "Hausnummer",
    "PLZ",
    "Stadt",
    "Land",
    "Mandant",
    "Auftragsart",
    "Auftragsbetreff",
    "Kundennummer",
    "Kundenname",
  ];
  const headersMeterCSV = [
    "ItemTyp",
    "Datensatznummer",
    "Straße",
    "Hausnummer",
    "PLZ",
    "Stadt",
    "Land",
    "Letzte Ablesung Am",
    "Letzte Ablesung",
  ];
  const headersVehicleCSV = [
    "ItemTyp",
    "Datensatznummer",
    "Straße",
    "Hausnummer",
    "PLZ",
    "Stadt",
    "Land",
    "Mandant",
    "Standort",
    "Kennzeichen",
    "Modell",
    "Status",
  ];
  let arr = [];

  for (let i = 0; i < rawData.length; i++) {
    let row = {};
    Object.keys(rawData[i]).forEach((item) => {
      if (headersAPI.includes(item)) {
        if (rawData[i][item] === "Order") {
          row = { ...row, [item]: "Auftrag" };
        } else if (rawData[i][item] === "Vehicle") {
          row = { ...row, [item]: "KFZ" };
        } else if (rawData[i][item] === "Meter") {
          row = { ...row, [item]: "Zähler" };
        } else if (rawData[i][item] === null) {
          row = { ...row, [item]: "" };
        } else {
          row = { ...row, [item]: rawData[i][item] };
        }
      }
    });
    arr.push(row);
  }

  return {
    m: arr.map((item) => Object.values(item).join(";")),
    h:
      type === "Order"
        ? headersOrderCSV.join(";").toUpperCase()
        : type === "Meter"
        ? headersMeterCSV.join(";").toUpperCase()
        : headersVehicleCSV.join(";").toUpperCase(),
  };
};

export const protocolTableCSV = (rawData) => {
  const headersAPI = [
    "createdDate",
    "createdTime",
    "userId",
    "protocoltype",
    "module",
    "item",
    "description",
  ];
  const headersCSV = [
    "Datum",
    "Uhrzeit",
    "Benutzer ID",
    "Protokolltyp",
    "Modul",
    "Datensatz",
    "Beschreibung",
  ];

  let arr = [];

  for (let i = 0; i < rawData.length; i++) {
    let row = {};
    Object.keys(rawData[i]).forEach((item) => {
      if (headersAPI.includes(item)) {
        row = {
          ...row,
          [item]: rawData[i][item] ? rawData[i][item] : " ",
        };
      }
    });

    arr.push(row);
  }
  return {
    m: arr.map((item) => Object.values(item).join(";")),
    h: headersCSV.join(";").toUpperCase(),
  };
};
