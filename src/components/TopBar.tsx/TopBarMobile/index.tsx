import React, { useState } from 'react';
import { Box, Burger, Drawer, Text, Group, Stack, useMantineTheme } from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import TopBar from '..';
import { Search } from "react-feather";
import { Observer } from 'mobx-react-lite';
import NavBarMobile from '../../NavbarMobile';



  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, etc.
    console.log('Logout clicked');
    const token :string|null = localStorage.getItem('token');
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logout successful', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  function TopBarMobile() {
    const mantineTheme = useMantineTheme();
    const [isNavBarOpened, setIsNavBarOpened] = useState(false);
    const navigate = useNavigate();
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
                onClick={() => {
                  setIsNavBarOpened(!isNavBarOpened);
                }}
              />
                 <Text fw={700} size="lg" px={16} color='white'>
                    KridaVyuha
                  </Text>
              {/* <Search
                style={{
                  position: "absolute",
                  right: "13px",
                  color: "white"
                }}
                onClick={() => {
                  navigate("/explore?inputFocus=true" + new Date().getTime());
                }}
              /> */}
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
  }


  
export default TopBarMobile;