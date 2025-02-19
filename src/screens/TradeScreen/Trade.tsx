import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { LiaPiggyBankSolid } from 'react-icons/lia';
import CardLayout from './PlayerCard';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../logic/Providers/StoreProviders';
import { Spinner } from '../../components/Spinner';
import { MTradeEntity } from '../../logic/Model/MTrade';
import { notifications } from '@mantine/notifications';

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
            console.log( messages[0].core_details)
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

//TODO: when this screen is being called, things are getting rendered multiple times.
export const TradeScreen: React.FC =  observer(() => {

    const [searchParams] = useSearchParams();
    const leagueId:string = searchParams.get('leagueId') || ''; 
    const matchId:string = searchParams.get('matchId') || '';
   

    const { tradeStore } = useStores();
    const {entities} = tradeStore;
         
    const teams = Array.from(new Set((entities || []).map(card => card.team)));
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    useEffect(() => {
        const fetchEntities = async () => {
            await tradeStore.getEntities(leagueId);
              tradeStore.setLeagueId(leagueId);
              tradeStore.setMatchId(matchId);
        };
        fetchEntities();
    }, []);

    const WS_URL = import.meta.env.VITE_WS_URL;

    const { isConnected, messages, sendMessage } = useWebSocket({
        url: WS_URL+'/ws?league_id=' + leagueId + '&match_id=' + matchId,
    });
    

    useEffect(() => {
        if (messages.length > 0) {
            const updatedPlayers: MTradeEntity[] = handleWSMessage(messages, entities);
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
                {/* <div className="flex flex-wrap gap-2 justify-center items-center">
                    <Slider />
                </div> */}
                <div className="grid grid-cols-2 gap-4">
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