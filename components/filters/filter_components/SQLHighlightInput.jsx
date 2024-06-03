import { highlight, languages } from "prismjs";
import React, { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
// import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import { Box, Button } from "@mui/material";

const SQLHighlightInput = ({ sqlQuery, handleChange }) => {
  const resizeRef = useRef(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    if (!contextMenuRef) return;
    const menu = contextMenuRef.current;
    const resizeEl = resizeRef.current;
    const styles = window.getComputedStyle(contextMenuRef.current);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // Right Resize

    const onMouseMoveRight = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      menu.style.width = `${width}px`;

      onMouseDownBottom(event);
    };
    const onMouseUpRight = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRight);
    };

    const onMouseDownRight = (event) => {
      x = event.clientX;
      menu.style.left = styles.left;
      menu.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRight);
      document.addEventListener("mouseup", onMouseUpRight);
    };

    //!----------Bottom resize-----------

    const onMouseMoveBottom = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      menu.style.height = `${height}px`;
      menu.style.maxHeight = `${height}px`;
    };
    const onMouseUpBottom = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottom);
    };

    const onMouseDownBottom = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(contextMenuRef.current);
      menu.style.top = styles.top;
      menu.style.bottom = null;

      document.addEventListener("mousemove", onMouseMoveBottom);
      document.addEventListener("mouseup", onMouseUpBottom);
    };

    const allMouseDown = (e) => {};

    resizeEl.addEventListener("mousedown", onMouseDownBottom);
    resizeEl.addEventListener("mousedown", onMouseDownRight);

    return () => {
      document.removeEventListener("mousedown", onMouseDownRight);
    };
  }, []);

  return (
    <>
      <div
        style={{
          // border: "2px solid red",
          width: "100%",
          position: "relative",
          minHeight: "8rem",
          maxWidth: "100%",
          minWidth: "25rem",
          boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
        ref={contextMenuRef}
      >
        <Editor
          value={sqlQuery}
          onValueChange={(e) => handleChange(e)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          className={"sql-editor"}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            width: "100%",
            height: "100%",
          }}
        />

        <Box
          ref={resizeRef}
          className="resizeIcon"
          sx={{
            position: "absolute",
            right: 6.5,
            bottom: 9.5,
            textAlign: "right",
            // width: "25px",
            // height: "10px",
            marginRight: "-7px",
            marginBottom: "-10px",
            padding: "1px  5px",
            cursor: "nwse-resize",
            opacity: "0.3",
            userSelect: "none",
            fontSize: "0.7rem",
            "&:hover": {
              opacity: "1",
              background:
                "linear-gradient(135deg, rgba(2,0,36,0) 37%, rgba(225,0,0,1) 64%, rgba(0,212,255,1) 100%)",
              color: "#000",
              // borderRadius: "8px 0 0 0 ",
            },
          }}
        >
          ⋰
        </Box>
      </div>
      <Button
        variant="contained"
        type="submit"
        size="small"
        sx={{ width: "8rem", alignSelf: "end" }}
      >
        Ausführen
      </Button>
    </>
  );
};

export default SQLHighlightInput;
