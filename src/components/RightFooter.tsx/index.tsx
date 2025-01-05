import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
import ComingSoonIndex from "./ComingSoon";


const SRightFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(p: any) =>
    p.theme.width > 800 ? "400px" : `${(p.theme.width * 36.5) / 100}px`};
  margin-left: 30px;
  margin-top: 15px;
`;

function RightFooterIndex() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { appStore } = store;
        // if (!authStore.user) return <></>;
        return (
          <SRightFooter theme={{ width: appStore.deviceWidth }}>
            
           <h1>Feedback</h1>
           <h1>Help</h1>
            
          </SRightFooter>
        );
      }}
    </Observer>
  );
}

export default RightFooterIndex;