import React from 'react';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { styled } from 'styled-components';
import { useStores } from '../../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';

const STopBarContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  height: 60px;
  width: 100%;
`;

const STopBar = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 0 10px;
  color: ${(p) => p.theme.color};
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #525252;
  }
`;

const TopBarDesktop: React.FC = () => {
  const mantineTheme = useMantineTheme();
  const appStore = useStores().appStore;

  const navigate = useNavigate();

  return (
    <STopBarContainer>
      <div className="h-2 w-[33.33%]"></div>
      <div className="flex h-2 w-[33.33%] items-center justify-center">
        <div
          // style={{
          //   background: mantineTheme.colors[mantineTheme.primaryColor][7],
          // }}
          className="rounded-md px-2 py-1"
        >
        <Text fw={700} size="lg" px={16}>
      Kridavyuha
    </Text>
        </div>
      </div>
      <div
        style={{
          minWidth: '33.33%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <STopBar onClick={() => navigate('/home')}>
          <Text size="xs">Home</Text>
        </STopBar>
        <STopBar onClick={() => navigate('/leagues')}>
          <Text size="xs">Leagues</Text>
        </STopBar>
        <STopBar onClick={() => navigate('/portfolio')}>
          <Text size="xs">Portfolio</Text>
        </STopBar>
        <STopBar onClick={() => navigate('/profiles')}>
          <Text size="xs">Profiles</Text>
        </STopBar>
      </div>
    </STopBarContainer>
  );
};

export default TopBarDesktop;
