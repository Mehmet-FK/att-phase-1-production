const useRegex = (input) => {
  let regex = /select/i;
  console.log(regex.test(input));
};

export const highlighter = (val) => {
  let cmds = [
    "SELECT",
    "UPDATE",
    "FROM",
    "WHERE",
    "AND",
    "OR",
    "AS",
    "INNER",
    "JOIN",
    "LEFT",
    "JOIN",
    "RIGHT",
    "JOIN",
    "FULL",
    "OUTER",
    "JOIN",
    "CROSS",
    "JOIN",
    "GROUP",
    "BY",
    "ORDER",
    "BY",
    "ASC",
    "DESC",
    "LIMIT",
    "DISTINCT",
    "HAVING",
    "COUNT",
    "SUM",
    "AVG",
    "MAX",
    "MIN",
    "TOP",
  ];

  const arrVal = val.split(" ");
  // console.log(val);
  for (let i = 0; i < arrVal.length; i++) {
    cmds.map((cmd) => {
      if (arrVal[i].toLowerCase() === cmd.toLowerCase()) {
        let el = arrVal[i];
        el = `<span style='color:red;'>${el}</span>`;
        arrVal[i] = el;
      }
    });
  }

  return arrVal.join(" ");

  /* const match = arrVal.find((value) => regex.test(value));

  if(!match.includes("<span>")){
    const index = arrVal.indexOf
  }



  console.log(match); */
};
