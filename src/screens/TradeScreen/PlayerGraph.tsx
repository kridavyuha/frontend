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
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";;

const handleWSMessage = (messages : any, entities: MTradeEntity[]| null) => {
    const updatedPlayers: MTradeEntity[] = (entities || []).map((player) => {
        // get whether the message is about performancefactor or corefactor
        if(messages[0].is_perf) {
            const perfFactor:number  = messages[0].perf_details.perf_factor[player.player_id];

            if (perfFactor) {
                // new price
                console.log("Performance factor: " ,perfFactor)
                const lastPrice = player.cur_price;
                return {
                    ...player,
                    cur_price: lastPrice + (perfFactor),
                };
            }
            return player;
            
        } else {
            const  coreFactor:string  = messages[0].core_details.core_factor[player.player_id];
            const coreFactorParsed = parseFloat(coreFactor).toFixed(2);
            const coreFactorRounded = parseFloat(coreFactorParsed)
            
            if (coreFactor) {
                console.log("Core factor: new price is:" ,coreFactorRounded)
               
                return {
                    ...player,
                    cur_price: coreFactorRounded
                };
            }
            return player;
        }
        
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
            
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await portfolioStore.getPortfolio(league_id);   
        };
        fetchData();
    }, [opened]);

   

    const WS_URL = import.meta.env.VITE_WS_URL;

    const { isConnected, messages, sendMessage } = useWebSocket({
        url:  WS_URL+'/ws?league_id=' + league_id + '&match_id=' + match_id,
    });

    useEffect(() => {
        if (messages.length > 0) {
            const updatedPlayers = handleWSMessage(messages, tradeStore.entities);
            tradeStore.setEntities(updatedPlayers);
            // update points of this player :
            tradeStore.getOnlyPlayerGraphWithOutEntitiesUpdate(player_id,league_id)
        }
    }, [messages]);

    if (tradeStore.isLoading){
        return <Spinner/>
    }

    player = tradeStore.entities?.find(p => p.player_id === player_id) || null;

    const data = tradeStore.getPoints()

    const series = [{
        name: 'Stock Value',
        data: data.map(item => ({ x: item.time, y: item.value })) // Keep x as original Date object
    }];  
    
    // Select key timestamps dynamically to avoid clutter
    const keyTimestamps = data.map((point, index) => {
        if (
            index === 0 || 
            index === data.length - 1 || 
            index % Math.ceil(data.length / 5) === 0
        ) {
            return new Date(point.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
        return null;
    }).filter((item) => item !== null); // Remove null values
        
    const options: ApexOptions = {
        chart: {
            type: "line",
            zoom: { type: "x", enabled: true, autoScaleYaxis: true },
            toolbar: { show: false },
        },
        stroke: {
            width: 1.5, // Decrease line thickness
        },
        markers: {
            size: keyTimestamps.length === 1 ? 6 : 4, // Larger dot if only one point
            strokeWidth: 2,
            hover: { size: 8 },
        },
        xaxis: {
            labels: {
                show: false
            },
            type: "category", // Use "category" for non-uniform spacing
            categories: keyTimestamps.length > 0 ? keyTimestamps : ["No Data"], // Provide filtered key timestamps
        },
        yaxis: {
            labels: {
                show: true, // Keep Y-axis labels
            },
        },
        dataLabels: {
            textAnchor: 'end',
            enabled: false, // Hide values on graph points
        },
    };
    


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
                    <Text size="sm" color="dimmed">+{((player?.cur_price || 0) - (player?.base_price ?? 0)).toFixed(2)} ({((((player?.cur_price || 0) - (player?.base_price ?? 0)) / (player?.base_price ?? 1)) * 100).toFixed(2)}%)</Text>
                </Stack>
            </Group>

    <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </div>      
     

        <Button fullWidth mt="md" radius="md" onClick={() => setOpened(true)}>
                Trade
        </Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buy or Sell" centered>
                <Text>Do you want to Buy or Sell your items?</Text>

                <NumberInput
                    value={transactShares}
                    onChange={(value) => setTransactShares(Math.max(0, value as number))}
                    label={`Holds ${player?.shares ?? 0} unit of this player`}
                    style={{ padding: '10px' }}
                    min={1}
                />
                <Group justify="space-between" mt="md">
                    <Button
                        onClick={() => {
                            if (player) {
                                tradeStore.buyEntity(player.player_id, transactShares);
                                setTransactShares(0);
                                setOpened(false);
                                notifications.show({
                                    message: tradeStore.messages,
                                });
                            } else {
                                notifications.show({
                                    message: 'Player not found',
                                    color: 'red',
                                });
                            }
                        }}
                        disabled={
                            tradeStore.getTxns() === 0 ||
                            transactShares * (player?.cur_price ?? 0) >
                                (portfolioStore.portfolio?.balance ?? 0)
                        }
                    >
                        Buy
                    </Button>
                    <Stack gap={2}>
                        <Text fw={500}>Balance: {portfolioStore.portfolio?.balance}</Text>
                        <Text fw={500}>
                            Market @: {(transactShares * (player?.cur_price ?? 0)).toFixed(1)}
                        </Text>
                    </Stack>
                    <Button
                        onClick={() => {
                            if (player) {
                                tradeStore.sellEntity(player.player_id, transactShares);
                            } else {
                                notifications.show({
                                    message: 'Player not found',
                                    color: 'red',
                                });
                            }
                            setTransactShares(0);
                            setOpened(false);
                            notifications.show({
                                message: tradeStore.messages,
                            });
                        }}
                        disabled={
                            (player?.shares ?? 0) === 0 || transactShares > (player?.shares ?? 0)
                        }
                    >
                        Sell
                    </Button>
                </Group>
            </Modal>


        </div>
    );
});

export { PlayerGraph };