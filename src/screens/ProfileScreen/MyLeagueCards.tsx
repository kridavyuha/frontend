import { Card, Group, Badge, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MLeague } from "../../logic/Model/MLeague";

interface LeagueCardsProps {
    data: MLeague;
}

export const MyLeagueCards: React.FC<LeagueCardsProps> = (props: LeagueCardsProps) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, match_id } = props.data;

    const navigate = useNavigate();
    
   
    return (
        <Card shadow="sm" padding="lg" radius="md"  className='mb-5' withBorder onClick={() => {navigate(`/trade?leagueId=${league_id}&matchId=${match_id}`)}}>
            <Group justify="space-between">
                <Text>League Id : {league_id}</Text>
            </Group>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{team_a} vs {team_b}</Text>
                <Badge color="pink">{league_status}</Badge>
            </Group>
            <Group mt="md" style={{ flexDirection: 'row' }}>
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