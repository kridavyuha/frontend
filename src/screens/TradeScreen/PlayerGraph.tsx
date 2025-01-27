import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';
import { Avatar, Badge, Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MTradeEntity } from '../../logic/Model/MTrade';
import { useWebSocket } from '../../hooks/useWebSocket';

const handleWSMessage = (messages : any, entities: MTradeEntity[]| null) => {
    const updatedPlayers: MTradeEntity[] = (entities || []).map((player) => {
        const message: number = messages[0].players[player.player_id];
        if (message) {
            // new price
            console.log("newPrice" ,message)
            const lastPrice = player.cur_price;
            const curPrice = message
            // pos or neg
            const lastChange = player.last_change;
            const change = curPrice > 0 ? 'pos' : curPrice < 0 ? 'neg' : lastChange;
            return {
                ...player,
                cur_price: lastPrice + (message),
                last_change: change,
            };
        }
        return player;
    });
    return updatedPlayers;
}

const PlayerGraph = observer(() => {
    const [searchParams] = useSearchParams();
    const { tradeStore, portfolioStore } = useStores();
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
            await portfolioStore.getPortfolio(league_id);
        };
        fetchData();
    }, []);

    const { isConnected, messages, sendMessage } = useWebSocket({
        url: 'ws://localhost:8080/ws?league_id=' + league_id + '&match_id=' + match_id,
    });

    useEffect(() => {
        if (messages.length > 0) {
            const updatedPlayers = handleWSMessage(messages, tradeStore.entities);
            tradeStore.setEntities(updatedPlayers);
        }
    }, [messages]);

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
                    <Text size="sm" color="dimmed">+{(player?.cur_price || 0) - (player?.base_price ?? 0)}({(((player?.cur_price || 0) - (player?.base_price ?? 0))/(player?.base_price ?? 1)*100).toFixed(2)})</Text>
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
                    }} >Buy</Button>
                    <Stack gap={2}>
                        <Text>Balance: {portfolioStore.portfolio?.balance}</Text>
                        <Text>Market Price: {transactShares * (player?.cur_price ?? 0)}</Text>
                    </Stack>
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