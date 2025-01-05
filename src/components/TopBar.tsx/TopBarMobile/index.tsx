import React, { useState } from 'react';
import { Box, Burger, Drawer, Text, Group, Stack, useMantineTheme } from '@mantine/core';

import { observer, Observer } from 'mobx-react-lite';
import NavBarMobile from '../../NavbarMobile';
import { IoLogOutOutline } from "react-icons/io5";
import { useStores } from '../../../logic/Providers/StoreProviders';






export const TopBarMobile: React.FC =  observer(() => {
    const mantineTheme = useMantineTheme();
    const [isNavBarOpened, setIsNavBarOpened] = useState(false);
    const {authStore} = useStores();

    const handleLogout = async () => {
      // Add your logout logic here, e.g., clearing tokens, etc.
      console.log('Logout clicked');
     
      await authStore.logout();
  };

    return (
      <Observer>
        {() => {
          return (
            <div
              style={{
                background: mantineTheme.colors[mantineTheme.primaryColor][6],
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "100",
                right: "0",
                height: "60px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Burger
                opened={isNavBarOpened}
                color={"white"}
                style={{
                  position: "absolute",
                  left: "13px"
                }}
                onClick={() => {setIsNavBarOpened(!isNavBarOpened)}}/>

                <Text fw={700} size="lg" px={16} color='white' style={{ fontStyle: 'italic', textShadow: '0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue' }}>
                  Krida Vyuha
                </Text>

                <IoLogOutOutline color='white' size={25} onClick={handleLogout}
                  style={{
                    position: "absolute",
                    right: "10px"
                  }}/>

              {isNavBarOpened && (
                <NavBarMobile
                  setIsNavBarOpened={(x: boolean) => setIsNavBarOpened(x)}
                />
              )}
            </div>
          );
        }}
      </Observer>
    );
  });