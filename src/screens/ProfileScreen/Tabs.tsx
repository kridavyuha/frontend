import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { MyLeagueCards } from "./MyLeagueCards";
import { MyLeagues } from "./MyLeagues";

export const ProfileTabs: React.FC = () => {
    return (
        <Tabs defaultValue="leagues">
        <Tabs.List style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Tabs.Tab value="leagues" leftSection={<IconPhoto size={12} />}>
            Leagues
          </Tabs.Tab>
          <Tabs.Tab value="stats" leftSection={<IconMessageCircle size={12} />}>
            Stats
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="leagues" style={{ margin: '20px' }}>
          <MyLeagues/>
        </Tabs.Panel>
  
        <Tabs.Panel value="stats" style={{ margin: '20px' }}>
          Stats tab content
        </Tabs.Panel>
  
        <Tabs.Panel value="settings" style={{ margin: '20px' }}>
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    )
}