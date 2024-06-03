import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";

import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";

const RolesList = ({ inputVal, setInputVal, roleIds, setRoleIds }) => {
  const { userRoles } = useSelector((state) => state.atina);
  const { user } = useSelector((state) => state.settings);

  const handleClick = (e) => {
    if (e.target.checked) {
      setRoleIds((pre) => [...pre, e.target.value]);
    } else {
      setRoleIds((pre) => [...pre.filter((x) => x !== e.target.value)]);
    }
  };
  useEffect(() => {
    setInputVal((pre) => ({ ...pre, roleIds }));
  }, [roleIds]);

  return (
    <div style={{ padding: 0 }}>
      <CardContent>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          {userRoles?.map((role, i) => (
            <div
              key={role?.id}
              style={{
                padding: "0 18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <FormControlLabel
                disabled={!user?.isAdmin}
                sx={{ width: "100%" }}
                control={
                  <Checkbox
                    value={role?.id}
                    name={role?.name}
                    checked={roleIds?.includes(role?.id.toString()) || false}
                    onClick={handleClick}
                  />
                }
                label={
                  <span style={{ fontSize: "0.8rem" }}> {role?.name} </span>
                }
              />
            </div>
          ))}
        </FormGroup>
      </CardContent>
    </div>
  );
};

export default RolesList;
