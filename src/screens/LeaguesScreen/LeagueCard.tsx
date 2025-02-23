import React, { useState } from 'react';
import { Card, Text, Group, Badge, Button, Stack, HoverCard, Drawer } from '@mantine/core';
import { MLeague } from '../../logic/Model/MLeague';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';
import { BsTrophy } from "react-icons/bs";
import { useDisclosure } from '@mantine/hooks';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { notifications } from '@mantine/notifications';

interface LeagueCardsProps {
    data: MLeague;
}



export const LeagueCards: React.FC<LeagueCardsProps> = (props: LeagueCardsProps) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, users_registered, match_id, is_registered } = props.data;
    const [opened, { open, close }] = useDisclosure(false);

    const {tradeStore,leagueStore} = useStores();
    const navigate = useNavigate();

    // Load csv file into an array
    const prizeDistribution = [14, 10, 7, 5, 5, 5, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    const totalPrize =  entry_fee * capacity;
    const prizeList = prizeDistribution.map(percentage => (totalPrize * percentage) / 100);
    console.log("Componenet rendered with isRegistered: ",is_registered)
   
    return (
        <Card shadow="sm" padding="lg" radius="md"  className='mb-5' withBorder >
            <Group  justify="space-between">
                <Text fw={700}   color='white' style={{ fontStyle: 'italic', textShadow: '0 0 5px black, 0 0 10px grey , 0 0 15px black' }}>
                    T20  IPL'25
                </Text>
                <HoverCard width={280} shadow="md" >
                    <HoverCard.Target>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <BsTrophy />
                        <p style={{ marginLeft: '5px', fontSize: '12px', fontWeight: 'bold' }}>30%</p>
                    </div>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                    <Text size="sm">
                        Top 30% of the participants will win the prize money
                    </Text>
                    </HoverCard.Dropdown>
            </HoverCard>
            </Group>
            

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{team_a} vs {team_b}</Text>
                <Badge color="pink">{league_status}</Badge>
            </Group>

            <Group align="apart" mt="md">
                <Button variant="light" color="blue" disabled={is_registered || league_status === "close" } onClick={async () => {
                    await leagueStore.registerLeague(league_id);
                    notifications.show({
                        message: leagueStore.message,
                    })
                }}>
                    {is_registered ? 'Registered' : 'Register'}
                </Button>
                <Button variant="light" color="blue" disabled={!is_registered || league_status === "not started" || league_status == "close" } onClick={() => {navigate(`/trade?leagueId=${league_id}&matchId=${match_id}`)}}>
                    Enter League
                </Button>
            </Group>

            <Group mt="15px">

                <>
                    <Drawer opened={opened} onClose={close} title="Prize Pool Distribution" position='bottom'>  
                            <Stack align="center">
                                {prizeList.map((prize, index) => (
                                    <Text key={index}>Rank {index + 1}: ₹{prize.toFixed(2)}</Text>
                                ))}
                            </Stack>
                    
                    </Drawer>
                    <div>
                    <Text> Reward Breakup</Text>
                    <Button variant="transparent" color='black' onClick={open} style={{ marginLeft: '1px', padding: '0px' }}>
                        <FaIndianRupeeSign />9800 <RiArrowDropDownLine />
                    </Button>
                    </div>
                </>
                    
               
                 <Stack style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                    <Text size="sm" style={{ textAlign: 'right', display: 'flex'  , justifyContent: 'flex-end', width: '100%', marginLeft: 'auto' }}>
                        <strong>Entry Fee: {entry_fee}</strong>
                    </Text>

                    <Text size="sm" style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <strong>Registered: {registered}/{capacity}</strong>
                    </Text>
                 </Stack>
            </Group>       
        </Card>
    );
}