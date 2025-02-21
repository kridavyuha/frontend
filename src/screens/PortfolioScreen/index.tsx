import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { PortfolioCard } from './PortfolioCard';
import { Spinner } from '../../components/Spinner';
import { MTradeEntity } from '../../logic/Model/MTrade';
import { MdRocketLaunch } from "react-icons/md";


import { observer } from 'mobx-react-lite';
import { Notify } from '../../components/Notify';
import { Summary } from './Summary';



export const PortfolioScreen: React.FC = observer(() => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const leagueId = searchParams.get('leagueId') || '';
    const matchId:string = searchParams.get('matchId') || '';
    const {portfolioStore} = useStores();   
    const {portfolio} = portfolioStore;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolio = async () => {
           await portfolioStore.getPortfolio(leagueId);
        };

        fetchPortfolio();
    }, []);



   if (portfolioStore.isLoading === true) {
        return <Spinner/>;
    }else {

    const invested = portfolio?.players.reduce((sum, player) => sum + player.shares * player.avg_price, 0).toFixed(2) || 0;
    const returns = portfolio?.players.reduce((sum, player) => sum + player.cur_price * player.shares - player.shares * player.avg_price, 0).toFixed(2) || 0;
    const balance = portfolio?.balance ?? 0;


    return (
        <div className="container p-4 ">
            {portfolio?.players ? (
                    <div >
                        <div style={{ marginBottom: '5px' }}>
                               <Summary invested={invested} returns={returns} balance={balance}/>
                         </div>
                        {portfolio.players
                            .filter(player => player.shares > 0)
                            .map(player => (
                                <div onClick={()=> navigate(`/trade/graph?player_id=${player.player_id}&league_id=${leagueId}&match_id=${matchId}`)}>
                                    <PortfolioCard key={player.player_id} player={player} />
                                </div>
                            ))}
                    </div>

            ) : (
                <p>No Stocks :(</p>
            )}
           
           
        </div>
    );
    }

});