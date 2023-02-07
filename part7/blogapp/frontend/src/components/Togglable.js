import { useState, useImperativeHandle, forwardRef } from "react";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <Box p={1}>
        <div style={hideWhenVisible}>
          <Button variant="contained" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
      </Box>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
