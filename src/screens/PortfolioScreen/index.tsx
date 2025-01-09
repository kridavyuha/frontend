import { useLocation } from 'react-router-dom';
import { Badge, Card,Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { PortfolioCard } from './PortfolioCard';


interface Players {
    player_id: string;
    player_name: string;
    shares: number;
    cur_price: number;
    team_name: string;
}

interface Share {
    balance: number;
    players: Players[];
}


export const PortfolioScreen: React.FC = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const leagueId = searchParams.get('leagueId') || '';
    const {portfolioStore} = useStores();   
    const {portfolio} = portfolioStore;

    useEffect(() => {
        const fetchPortfolio = async () => {
           await portfolioStore.getPortfolio(leagueId);
        };

        fetchPortfolio();
    }, []);

    // add a loader ..
    
	return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Text>Portfolio</Text>
            </div>
            {portfolio ? (
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <Text>Balance: {portfolio.balance}</Text>
                    </div>
                    <div>
                        {portfolio.players.map(player => (
                            <PortfolioCard key={player.player_id} player={player} />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
	);
}