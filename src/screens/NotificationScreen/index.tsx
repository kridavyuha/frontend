import { styled } from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MNotification } from "../../logic/Model/MNotifications";
import NotificationTile from "./NotificaitonTile";
import { Spinner } from "../../components/Spinner";

const SNotificationIndex = styled.section`
  height: 100%;
  width: 100%;
  max-width: 600px;
  border: 0.2px solid #bdbdbda0;
`;


const NotificaitonScreen = observer(() => {

    const {notificationStore} = useStores();

    useEffect(()=>{
      const fetchData = async () => {
        await notificationStore.getNotifications()
    };
    fetchData();
    }, [])

    useEffect(()=>{
      notificationStore.updateStatus();
    },[])

    const notifications: MNotification[] = notificationStore.notifications || []

    if (notificationStore.isLoading === true) {
      return (
          <Spinner/>
      );
  }
  else {
  return (
    
    <SNotificationIndex>
        {notifications.length === 0 ? (
        <b className="flex h-[140px] w-full items-center justify-center text-center text-gray-400">
            You're all caught up. No Notifications.
          </b>
        ):(
           notifications.map((notification,idx)=>(
                <NotificationTile key={idx} {...notification}/>
           ))
        )}
    </SNotificationIndex>
  );
}
});

export default NotificaitonScreen