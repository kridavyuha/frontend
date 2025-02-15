import { Card, Group, Badge, Button, Text, HoverCard } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MLeague } from "../../logic/Model/MLeague";
import { BsTrophy } from "react-icons/bs";

interface LeagueCardsProps {
    data: MLeague;
}

export const MyLeagueCards: React.FC<LeagueCardsProps> = (props: LeagueCardsProps) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, match_id } = props.data;

    const navigate = useNavigate();
    
   
    return (
        <Card shadow="sm" padding="lg" radius="md"  className='mb-5' withBorder onClick={() => {navigate(`/trade?leagueId=${league_id}&matchId=${match_id}`)}}>
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