import { useLocation } from 'react-router-dom';
import { Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { PortfolioCard } from './PortfolioCard';
import { Spinner } from '../../components/Spinner';


import { observer } from 'mobx-react-lite';
import { Notify } from '../../components/Notify';

export const PortfolioScreen: React.FC = observer(() => {

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

   if (portfolioStore.isLoading === true) {
        return <Spinner/>;
    }

    const totalInvested = portfolio?.players.reduce((sum, player) => sum + player.invested, 0) || 0;
    const totalReturns = portfolio?.players.reduce((sum, player) => sum + player.cur_price*player.shares - player.invested, 0) || 0;
    const totalPortfolioValue = totalInvested + totalReturns + (portfolio?.balance ?? 0);
    
    return (
        <div>
            {portfolio ? (
                <div>
                    <div style={{ textAlign: 'center', margin: '1rem 0', padding: '0.5rem 0' }}>
                        <Text fw={500} size="lg">
                            Balance: {portfolio.balance}
                        </Text>
                    </div>
                    <div style={{ overflowY: 'auto' }}>
                        {portfolio.players.map(player => (
                            <PortfolioCard key={player.player_id} player={player} />
                        ))}
                    </div>
                </div>
            ) : (
                <p>No Stocks :(</p>
            )}
           
           
        </div>
    );
});