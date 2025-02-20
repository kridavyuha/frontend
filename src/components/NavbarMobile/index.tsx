import { Badge, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import {
  Award,
  Settings,
  Edit,
  Anchor,
  ShoppingCart
} from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
import NavbarMobileItem from "./NavbarMobileItem";
import { TfiBook } from "react-icons/tfi";
import { BiTennisBall } from "react-icons/bi";

const SNavBarMobile = styled.div`
  background: white;
  position: fixed;
  top: 60px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px 13px;
  zindex: 1002;
`;

const SMobileBar = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 100%;
  margin: 8px 0px;
  color: ${(p) => p.theme.color || "black"};
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #525252;
  }
`;

interface INavBarMobile {
  setIsNavBarOpened: (e: boolean) => void;
}

function NavBarMobile({ setIsNavBarOpened }: INavBarMobile) {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  const { appStore } = stores;
  return (
    <Observer>
      {() => {
        return (
          <SNavBarMobile>              

          <SMobileBar onClick={() => {
                navigate("/playbook");
                setIsNavBarOpened(false);
              }}>
              <NavbarMobileItem title="Play Book" icon={<BiTennisBall  />} />
            </SMobileBar>
            
            <SMobileBar onClick={() => {
                navigate("/rules");
                setIsNavBarOpened(false);
              }}>
               <NavbarMobileItem title="Rules" icon={<Anchor />}/>
            </SMobileBar>


            <SMobileBar onClick={() => {
                navigate("/feedback");
                setIsNavBarOpened(false);
              }}>
              <NavbarMobileItem title="Feedback" icon={<Edit />} />
            </SMobileBar>


            <SMobileBar onClick={() => {
                navigate("/settings");
                setIsNavBarOpened(false);
              }}>
              <NavbarMobileItem title="Settings" icon={<Settings />} />
            </SMobileBar>
            
          </SNavBarMobile>
        );
      }}
    </Observer>
  );
}

export default NavBarMobile;