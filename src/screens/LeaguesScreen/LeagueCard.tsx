import React from 'react';
import { Card, Text, Group, Badge, Button } from '@mantine/core';
import { AiOutlineDelete } from 'react-icons/ai';
import { MLeague } from '../../logic/Model/MLeague';
import { useStores } from '../../logic/Providers/StoreProviders';

interface LeagueCardsProps {
    data: MLeague;
}


export const handleLeagues = (leagues: LeagueCardsProps) => {
    console.log("League Id :", leagues.data.league_id);
    console.log("Match Id :", leagues.data.match_id);

    window.location.href = `/trade?leagueId=${leagues.data.league_id}`;
};


export const handleRegister = (leagues: LeagueCardsProps) => {

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/register?league_id=${leagues.data.league_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ league_id: leagues.data.league_id }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/leagues';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}




export const LeagueCards: React.FC<LeagueCardsProps> = (props: LeagueCardsProps) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, users_registered, match_id, is_registered } = props.data;

    const {tradeStore,leagueStore} = useStores();
    
   
    return (
        <Card shadow="sm" padding="lg" radius="md"  className='mb-5' withBorder >
            <Group justify="space-between">
                <Text>League Id : {league_id}</Text>
                <AiOutlineDelete onClick={
                    ()=>{leagueStore.deleteLeague(league_id)}
                }/>
            </Group>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{team_a} vs {team_b}</Text>
                <Badge color="pink">{league_status}</Badge>
            </Group>

            <Group align="apart" mt="md">
                <Button variant="light" color="blue" disabled={is_registered} onClick={async () => await leagueStore.registerLeague(league_id)}>
                    {is_registered ? 'Registered' : 'Register'}
                </Button>
                <Button variant="light" color="blue" disabled={!is_registered} onClick={() => window.location.href = `/trade?leagueId=${league_id}`}>
                    Enter League
                </Button>

                <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginLeft: 'auto' }}>
                    <strong>Entry Fee: {entry_fee}</strong>
                </Text>

                <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                    <strong>Registered: {registered}/{capacity}</strong>
                </Text>
            </Group>
        </Card>
    );
}