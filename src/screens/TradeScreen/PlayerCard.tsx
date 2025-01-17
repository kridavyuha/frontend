// src/components/CardLayout.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar, Modal, Stack } from '@mantine/core';
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
    base_price: number;
    cur_price: number;
    last_change: string;
    shares: number;
  }

export const CardLayout: React.FC<CardProps> = ({ player_id, player_name, base_price,cur_price, team, last_change,profile_pic,shares}) => {
    
    const {tradeStore} = useStores();
    const league_id:string =  tradeStore.league_id || '';
    const navigate = useNavigate();


   
   
    return (
        <div >
            <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => {
                navigate(`/trade/graph?player_id=${player_id}&league_id=${league_id}&match_id=${tradeStore.match_id}`);
                }}>
               
                <Badge color="pink" ml="auto">{team}</Badge>
                <Stack justify="center" align="center" mt="md" mb="xs">
                    <Avatar src={`src/assets/${profile_pic}`} alt="it's me" size="lg" />
                    <Text fw={500}>{player_name}</Text>
                </Stack>

                <Text size="sm" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong>{cur_price}</strong>
                <div style={{ marginLeft: '5px' }}>
                    {
                    base_price < cur_price ? (
                        <FaArrowTrendUp style={{ color: 'green' }} />
                    ) : base_price > cur_price ? (
                        <FaArrowTrendDown style={{ color: 'red' }} />
                    ) : (
                        <PiHourglassLow style={{ color: 'black' }} />
                    )
                    }
                </div>
                <Text style={{ marginLeft: '20px' }}>{shares} shares</Text>
                </Text>
                <div style={{ display: "flex" }}>
                </div>
            </Card>
            </div>
        </div>
    );
};

export default CardLayout;