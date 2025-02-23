import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import styled from "styled-components";
import { MNotification } from "../../logic/Model/MNotifications";


const SNotificationTile = styled.div<{ bgcolor: string; hovercolor: string }>`
    min-height: 70px;
    padding: 5px 10px;
    display: flex;
    text-decoration: none;
    color: inherit;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
    background: ${(p) => p.bgcolor};
    :hover {
        background: ${(p) => p.hovercolor};
    }
`;

const SBullDot = styled.div<{ bgcolor: string }>`
  background: ${(p) => p.bgcolor};
  width: 8px;
  height: 8px;
  margin: 0 10px;
  border-radius: 3px;
`;
function NotificationTile(props: MNotification) {
  const mantineTheme = useMantineTheme();

  var time: number = Math.floor((new Date().getTime() - new Date(props.created_at).getTime()) / (1000))
  

  return (
    <SNotificationTile
      bgcolor={
        props.status === "Unseen"
          ? mantineTheme.colors["blue"][0]
          : mantineTheme.colors["gray"][0]
      }
      hovercolor={
        props.status === "Unseen"
          ? mantineTheme.colors["blue"][1]
          : mantineTheme.colors["gray"][1]
      }
    >
      <SBullDot
        bgcolor={
          props.status !== "Read"
            ? mantineTheme.colors["blue"][8]
            : "transparent"
        }
      />
      <div className="flex h-[70px] w-[70px] items-center justify-center p-2">
      <GrTransaction />
      </div>
      <div style={{ marginLeft: "10px", width: "100%" }}> {props.description}</div>
      <Text color="dimmed" size={"xs"} className="ml-2 min-w-[10%] text-right">
        {(() => {
          const seconds = Math.floor((new Date().getTime() - new Date(props.created_at).getTime()) / 1000);
          if (seconds < 60) return `${seconds} sec ago`;
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) return `${minutes} min ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return `${hours} hr ago`;
          const days = Math.floor(hours / 24);
          return `${days} days ago`;
        })()}
      </Text>
    </SNotificationTile>
  );
}

export default NotificationTile;