import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

export const ProfileTabs: React.FC = () => {
    return (
        <Tabs defaultValue="gallery">
        <Tabs.List style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
            Leagues
          </Tabs.Tab>
          <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
            Stats
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="gallery" style={{ margin: '20px' }}>
          League tab content
        </Tabs.Panel>
  
        <Tabs.Panel value="messages" style={{ margin: '20px' }}>
          Stats tab content
        </Tabs.Panel>
  
        <Tabs.Panel value="settings" style={{ margin: '20px' }}>
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    )
}