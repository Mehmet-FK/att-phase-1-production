import { useCallback } from "react";

const useContextMenu = (contextMenu, setContextMenu) => {
  const handleRightClick = useCallback((e, point) => {
    e.preventDefault();

    let X = e.pageX;
    let Y = e.pageY;
    let winWidth = window.innerWidth;
    // let cmWidth = contextMenuRef.current.offsetWidth;
    let cmWidth = 20;
    let winHeight = window.innerHeight;
    // let cmHeight = contextMenuRef.current.offsetHeight;
    let cmHeight = 0;
    // X = X > winWidth - cmWidth ? winWidth - cmWidth : X;
    // Y = Y > winHeight - cmHeight ? winHeight - cmHeight : Y;

    setContextMenu({ ...contextMenu, show: true, x: X, y: Y, point: point });
  }, []);

  const closeContextMenu = useCallback((event) => {
    setContextMenu({ show: false, x: 0, y: 0, point: "" });
  }, []);

  return { handleRightClick, closeContextMenu };
};

export default useContextMenu;
