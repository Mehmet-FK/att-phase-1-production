import React, { memo, useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import ImageModal from "../../modals/ImageModal";
import Image from "next/image";
import Loading_Icon from "@/components/Loading_Icon";
const BookingImages = ({ file, fileArr, index }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        display: "inline-block",
        paddingInline: 0.8,
        marginInline: 0.5,
        borderRadius: "8px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        position: "relative",
        height: "9rem",
        width: "8rem",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            display: "grid",
            placeItems: "center",
            // border: "2px solid red",
            // backgroundColor: "#000d",

            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 8,
          }}
        >
          <Loading_Icon />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          WebkitFilter: isLoading ? "blur(8px)" : "none",
        }}
      >
        <ImageModal
          open={open}
          setOpen={setOpen}
          fileArr={fileArr}
          index={index}
        />

        <Image
          onClick={() => setOpen(true)}
          onLoad={() => setIsLoading(false)}
          alt="Buchungen Bilder"
          src={file?.path}
          fill
          quality={35}
          sizes="10vw"
          style={{
            objectFit: "cover",
            maxHeight: "10rem",
            cursor: "pointer",
            outline: "1px solid #888",
            outlineOffset: "2px",
            borderRadius: "8px",
          }}
        />

        {/* <img
        onClick={() => setOpen(true)}
        onLoad={(e) => (e.target.style.filter = "blur(0)")}
        // loading="lazy"
        style={{
          maxHeight: "10rem",
          cursor: "pointer",
          outline: "1px solid #888",
          outlineOffset: "2px",
          borderRadius: "8px",
          filter: "blur(10px)",
        }}
        src={file?.path}
      /> */}
        <span
          style={{
            position: "absolute",
            backgroundColor: "#00000077",
            paddingInline: "8px",
            borderRadius: " 0 0 9px 9px",
            right: 0,
            left: 0,
            bottom: 0,
            // right: 3.5,
            // left: 3.5,
            // bottom: 0,
            textAlign: "center",
            color: "#fff",
          }}
        >
          {file?.type}
        </span>
      </div>
    </Box>
  );
};

export default BookingImages;
