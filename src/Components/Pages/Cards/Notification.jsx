import React, { useEffect } from "react";

function Notification({
  text,
  setOpen = false,
  notificationFunc,
  isError = false,
}) {
  useEffect(() => {
    const timer = setTimeout(
      () => {
        notificationFunc("");
      },
      isError ? 7000 : 3000,
    );

    return () => clearTimeout(timer);
  }, [notificationFunc, text]);

  if (!setOpen) {
    return <></>;
  }

  return (
    <div
      id="Notification"
      className={`fixed top-14 right-16 z-50 w-[400px] h-fit font-bold shadow-xl rounded-xl flex justify-center items-center p-4 transition-all transform duration-300 ${
        setOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      } ${isError ? "bg-red-500 shadow-red-300" : "bg-green-500 shadow-green-300"}`}
    >
      {text}
    </div>
  );
}

export default Notification;
