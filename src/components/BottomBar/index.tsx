import { ActionIcon, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, User, PlusSquare, Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../logic/Providers/StoreProviders";
import { GoTrophy } from "react-icons/go";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";

function BottomBar() {
  const mantineTheme = useMantineTheme();
  const stores = useStores();
  const navigate = useNavigate();

  return (
    <Observer>
      {() => {
        const { appStore, notificationStore } = stores;
        return (
            <div className="fixed bottom-0 right-0 left-0 z-50 flex h-16 items-center justify-around border border-solid border-transparent border-t-gray-200 bg-gray-100 shadow-md">
            <ActionIcon variant="transparent" onClick={() => {navigate("/leagues")}}>
               <GoTrophy  size={"20"} color="grey"/>
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={() => {navigate("/portfolios")}}>
              <HiOutlineBanknotes size={"20"} color="grey"/>
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={() => {navigate("/leagues/create")}}>
              <IoAddCircleOutline size={"30"} color="grey" />
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={() => {navigate("/notifications")}}>
                 <div className="relative">
                 <IoIosNotificationsOutline size={"25"} color="grey"/>
                 {notificationStore.unseenCount > 0 && (
                     <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                     {notificationStore.unseenCount}
                     </span>
                 )}
                 </div>
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={() => {navigate("/profile")}}>
              <User size={"20"} color="grey"/>
            </ActionIcon>

            </div>
        );
      }}
    </Observer>
  );
}

export default BottomBar;