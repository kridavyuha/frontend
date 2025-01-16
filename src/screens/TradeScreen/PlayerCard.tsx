// src/components/CardLayout.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar, Modal } from '@mantine/core';
import { FaArrowTrendUp, FaArrowTrendDown,  } from "react-icons/fa6";
import { PiHourglassLow } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { NumberInput } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    player_id: string;
    player_name: string;
    team : string;
    profile_pic: string;
    cur_price: number;
    last_change: string;
    shares: number;
  }

export const CardLayout: React.FC<CardProps> = ({ player_id, player_name, cur_price, team, last_change,profile_pic,shares}) => {
    const [opened, setOpened] = useState(false);
    const {tradeStore} = useStores();
    const league_id:string =  tradeStore.league_id || '';
    const navigate = useNavigate();

    const [transactShares, setTransactShares] = useState<number>(0);

   
   
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <VscGraphLine onClick={()=> {
                navigate(`/trade/graph?player_id=${player_id}&league_id=${league_id}`);
            }}/>
            <Group justify="space-between" mt="md" mb="xs">
                <Avatar src={`src/assets/${profile_pic}`} alt="it's me" size="lg" />
                
                <Text fw={500}>{player_name}</Text> 
                <Badge color="pink">{team}</Badge>
            </Group>

            <Text size="sm" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong>{cur_price}</strong>
                <div style={{marginLeft : '5px'}}>
                {
                    last_change === "pos" ? (
                        <FaArrowTrendUp style={{ color: 'green' }} />
                    ) : last_change === "neg" ? (
                        <FaArrowTrendDown style={{ color: 'red' }} />
                    ) : (
                        <PiHourglassLow style={{ color: 'black' }} />
                    )
                }
                </div>
                <Text style={{ marginLeft: '20px' }}>{shares} shares</Text>
            </Text>
            <div style={{display: "flex"}}>
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
                        tradeStore.buyEntity(player_id, transactShares);
                        setTransactShares(0);
                        setOpened(false);
                        notifications.show({
                            message: tradeStore.messages
                        })
                    }}>Buy</Button>
                    <Button onClick={() => {
                        tradeStore.sellEntity(player_id, transactShares);
                        setTransactShares(0);
                        setOpened(false);
                        notifications.show({
                            message: tradeStore.messages
                        })
                    }}>Sell</Button>
                </Group>
            </Modal>    
            </div>
        </Card>
    );
};

export default CardLayout;