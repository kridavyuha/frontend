import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';
import { Avatar, Badge, Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MTradeEntity } from '../../logic/Model/MTrade';

const PlayerGraph = observer(() => {
    const [searchParams] = useSearchParams();
    const { tradeStore } = useStores();
    const [opened, setOpened] = useState(false);

    const [transactShares, setTransactShares] = useState<number>(0);

    var player : MTradeEntity | null ;

    const league_id = searchParams.get('league_id') || '';
    const match_id = searchParams.get('match_id') || '';
    const player_id = searchParams.get('player_id') || '';

    tradeStore.setLeagueId(league_id);
    tradeStore.setMatchId(match_id);


    useEffect(() => {
        const fetchData = async () => {
            await tradeStore.getPlayerGraph(player_id, league_id);
        };
        fetchData();
    }, []);

    if (tradeStore.isLoading){
        return <Spinner/>
    }

    player = tradeStore.entities?.find(p => p.player_id === player_id) || null;

    const data = tradeStore.getPoints()
    return (
        <div style={{ margin: '50px 10px 10px' }}>
            <Text style={{textAlign:'center'}} size="xl" fw={700} >
                Detailed Analysis
            </Text>
            <Group  mt="md" mb="xs" style={{paddingTop:'30px',paddingBottom:'55px'}}>
                
                <Avatar alt="it's me" size="lg" />
                <Stack ml={15}>
                    <Text fw={500}>{player?.player_name}</Text> 
                    <Badge color="pink">{player?.team}</Badge>
                </Stack>
                <Stack ml="auto" gap={2}>
                    <Text size="sm" color="dimmed" ml="auto" fw={700}>{player?.cur_price}</Text>
                    <Text size="sm" color="dimmed">+18.2(5.1%)</Text>
                </Stack>
            </Group>
            <LineChart
            h={300}
            data={data}
            dataKey="time"
            series={[{ name: 'value', color: 'indigo.6' }]}
            curveType="linear"
            connectNulls
            yAxisProps={{
                type: 'number',
                domain: ['auto', 'auto'],
                tickCount: 5,
            }}           
            withXAxis={false}
            
        />

        <Button fullWidth mt="md" radius="md" onClick={() => setOpened(true)}>
                Trade
            </Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buy or Sell" centered>
                <Text>Do you want to Buy or Sell your items?</Text>

                <NumberInput
                    value={transactShares}
                    onChange={(value) => setTransactShares(value as number)}
                    placeholder="Enter number of shares"
                    style={{ padding: '10px' }}
                />
                <Group justify="space-between" mt="md">
                    <Button onClick={() => {
                        if (player) {
                            tradeStore.buyEntity(player.player_id, transactShares);
                            setTransactShares(0);
                            setOpened(false);
                            notifications.show({
                                message: tradeStore.messages
                            }); 
                        } else {
                            notifications.show({
                                message: 'Player not found',
                                color: 'red'
                            });
                        }
                    }}>Buy</Button>
                    <Button onClick={() => {
                        if (player) {
                            tradeStore.sellEntity(player.player_id, transactShares);
                        } else {
                            notifications.show({
                                message: 'Player not found',
                                color: 'red'
                            });
                        }
                        setTransactShares(0);
                        setOpened(false);
                        notifications.show({
                            message: tradeStore.messages
                        })
                    }}>Sell</Button>
                </Group>
            </Modal>    


        </div>
    );
});

export { PlayerGraph };