import { ActionIcon, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, User, PlusSquare, Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../logic/Providers/StoreProviders";

function BottomBar() {
  const mantineTheme = useMantineTheme();
  const stores = useStores();
  const navigate = useNavigate();

  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <div className="fixed bottom-0 right-0 left-0 z-50 flex h-16 items-center justify-around border border-solid border-transparent border-t-gray-200 bg-gray-100 shadow-md">
            <ActionIcon
                color={
                     "transparent"
                }
              onClick={() => {
                // navigate("/feed");
                // appStore.setNavigationState(0);
              }}
            >
              <Home size={"20"} color="grey"/>
            </ActionIcon>
            <ActionIcon
             color={
                "transparent"
           }
              onClick={() => {
                // navigate("/explore");
                // appStore.setNavigationState(1);
              }}
            >
              <Globe size={"20"} color="grey"/>
            </ActionIcon>
     
            <ActionIcon
               color={
                "transparent"
           }
              onClick={() => {
                // navigate("/notifications");
                // appStore.setNavigationState(3);
              }}
              
            >
                 <Globe size={"20"} color="grey"/>
            </ActionIcon>
            <ActionIcon
                color={
                    "transparent"
               }
              onClick={() => {
                // navigate("/profile");
                // appStore.setNavigationState(4);
              }}
            >
              <User size={"20"} color="grey"/>
            </ActionIcon>
          </div>
        );
      }}
    </Observer>
  );
}

export default BottomBar;