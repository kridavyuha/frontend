import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { LiaPiggyBankSolid } from 'react-icons/lia';
import CardLayout from './PlayerCard';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../logic/Providers/StoreProviders';
import { Spinner } from '../../components/Spinner';


const handlePortfolio = (leagueId: string | null) => {
    window.location.href = `/portfolio?leagueId=${leagueId}`;
}

//TODO: when this screen is being called, things are getting rendered multiple times.
export const TradeScreen: React.FC =  observer(() => {

    const [searchParams] = useSearchParams();
    const leagueId:string = searchParams.get('leagueId') || ''; 

    const { tradeStore } = useStores();
    tradeStore.league_id = leagueId;
    const {entities} = tradeStore;
         
    const teams = Array.from(new Set((entities || []).map(card => card.team)));
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    useEffect(() => {
        console.log("About component mounted!");
        const fetchEntities = async () => {
            await tradeStore.getEntities(leagueId);
        };
        fetchEntities();
    }, []);
    

    // TODO: abstract the below logic
    const { isConnected, messages, sendMessage } = useWebSocket({
        url: 'ws://localhost:8080/ws'
    });

    useEffect(() => {
        if (messages.length > 0) {
            const updatedPlayers = (entities || []).map((player) => {
                const message = messages[0].players[player.player_id];
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
            tradeStore.setEntities(updatedPlayers);
        }
    }, [messages]);

    if (tradeStore.isLoading === true) {
        return (
            <Spinner/>
        );
    }
    else {
        return (
            <div className="container p-4">
                <div className="flex flex-wrap gap-2 justify-center items-center">
                    <div className="flex flex-wrap gap-2">
                        {teams.map((team, index) => (
                        <Button
                            key={index}
                            variant={selectedTeam === team ? 'filled' : 'outline'}
                            onClick={() => setSelectedTeam(selectedTeam === team ? null : team)}
                        >
                            {team}
                        </Button>
                        ))}
                    </div>
                    <div className="ml-auto">
                        <LiaPiggyBankSolid size={36} onClick={() => handlePortfolio(leagueId)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                {entities && entities
                    .filter(card => selectedTeam === null || card.team === selectedTeam)
                    .map((card, index) => (
                    <CardLayout key={index} {...card} />
                    ))}
                </div>
            </div>
        );
    }
});