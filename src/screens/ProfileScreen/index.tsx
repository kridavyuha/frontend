import React from 'react';
import { Avatar, Text, Stack, Box, Title, Card, List, ThemeIcon, Loader } from '@mantine/core';
import axios from 'axios';
import { IconCircleCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { Spinner } from '../../components/Spinner';
import { observer } from 'mobx-react-lite';




export const UserProfile: React.FC = observer(() => {

  const {profileStore} = useStores();

  useEffect(() => {
    const fetchProfile = async () => {
        await profileStore.getProfile()
    }
    fetchProfile();
  }, []);

  if (profileStore.isLoading === true) {
    return <Spinner/>
  }else {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
        <Stack gap={8} align="center">
          <Avatar src={profileStore.user?.profile_pic?.toString()} size={100} radius="xl" />
          <Title order={3}>{profileStore.user?.user_name}</Title>
          <Text color="dimmed">{profileStore.user?.mail_id}</Text>
        </Stack>
  
        <Box mt="xl">
          <Text size="lg" fw={500}>
            Wallet: ${2300}
          </Text>
        </Box>
  
        <Box mt="lg">
          <Text size="md" fw={500} mb="sm">
            Leagues Participated
          </Text>
          <List spacing="xs" center icon={<ThemeIcon color="blue" size={24} radius="xl"><IconCircleCheck size={14} /></ThemeIcon>}>
            {/* {userData.leagues.map((league) => (
              <List.Item key={league}>{league}</List.Item>
            ))} */}
          </List>
        </Box>
      </Card>
    );
  }





});

export default UserProfile;