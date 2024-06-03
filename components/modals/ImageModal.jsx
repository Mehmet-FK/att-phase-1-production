import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { memo, useEffect, useMemo, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Loading_Icon from "../Loading_Icon";

const ImageModal = ({ open, setOpen, index, fileArr }) => {
  const style = useMemo(() => ({
    card: {
      minWidth: 500,
      maxHeight: "100%",
      minHeight: "75vh",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 1,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      position: "relative",
    },

    buttonWrapLeft: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      opacity: 0.2,
      backgroundColor: "#fff4",
      borderRight: "1px solid #ccc",
      borderRadius: "8px 0 0 8px",
      transition: "0.2s",
      zIndex: 15,
      "&:hover": {
        opacity: 1,
      },
    },
    buttonWrapRight: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      transition: "0.2s",
      opacity: 0.2,
      backgroundColor: "#fff4",
      zIndex: 15,
      borderLeft: "1px solid #ccc",
      borderRadius: "0 8px 8px 0 ",
      "&:hover": {
        opacity: 1,
      },
    },
  }));

  const [imageIndex, setImageIndex] = useState(index);
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleNextImage = () => {
    let total = fileArr.length - 1;
    if (imageIndex < total) {
      // let temp = imageIndex
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
    setIsLoading(true);
  };
  const handlePrevImage = () => {
    let total = fileArr.length - 1;
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(total);
    }
    setIsLoading(true);
  };
  useEffect(() => {
    setPath(fileArr[imageIndex]?.path);
  }, [imageIndex]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Box component={Paper} sx={style.card}>
        <Box sx={style.buttonWrapLeft} onClick={handlePrevImage}>
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
        </Box>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              display: "grid",
              placeItems: "center",
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
        <Image
          alt="Buchungen Bilder"
          onLoad={() => setIsLoading(false)}
          src={path}
          width={500}
          height={450}
          style={{
            objectFit: "contain",
            WebkitFilter: isLoading ? "blur(5px)" : "none",
            maxWidth: "100%",
            maxHeight: "70vh",
            width: "auto",
            boxShadow: "-2px 19px 48px -24px rgba(66, 68, 90, 1)",
            userSelect: "none",
            borderRadius: "8px",
          }}
        />

        {/* <img
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "70vh",
            width: "auto",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "-2px 19px 48px -24px rgba(66, 68, 90, 1)",
            userSelect: "none",
            WebkitFilter: isLoading ? "blur(5px)" : "none",
          }}
          src={path}
        /> */}
        <Box sx={style.buttonWrapRight} onClick={handleNextImage}>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ImageModal);
