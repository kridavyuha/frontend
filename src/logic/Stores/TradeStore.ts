import { makeAutoObservable, toJS } from "mobx";
import {  MTradeEntity } from "../Model/MTrade";
import { TradeRepo } from "../Repo/TradeRepo";
import { MTimeSeries } from "../Model/MTimeSeries";

export class TradeStore{
    token : string = "";
    entities: MTradeEntity[]| null  = null;
    tradeRepo: TradeRepo;
    match_id: string  = '';
    league_id: string = '';
    points: MTimeSeries[] = [];
    isLoading: boolean = false; 

    constructor(tradeRepo: TradeRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token") || "";
        this.tradeRepo = tradeRepo;
    }


    async getEntities(league_id: string) {
        this.isLoading = true;
        const trades = await this.tradeRepo.getEntities(this.token, league_id);
        console.log(trades);
        this.setEntities(trades);
        this.isLoading = false;
     
    }

    async buyEntity(entity_id: string, shares: number) {
        await this.tradeRepo.tranEntity(this.token, entity_id, shares, this.league_id || "", "buy");
        this.getEntities(this.league_id || "");
    }

    async sellEntity(entity_id: string, shares: number) {
        await this.tradeRepo.tranEntity(this.token, entity_id, shares, this.league_id || "", "sell");
        this.getEntities(this.league_id || "");
    }

    async getPlayerGraph(player_id: string, league_id: string) {
        console.log(player_id, this.league_id);
        const player: string[]=await this.tradeRepo.getPlayerGraph(this.token, player_id, league_id);
        if (player.length === 0) {
            return;
        }
        const formattedData = player.map((item: string) => {
            const [timestamp, points] = item.split(',');
            return {
                time: new Date(parseInt(timestamp)),
                value: parseInt(points),
            };
        });
        console.log(formattedData);
        this.setPoints(formattedData);
        console.log(toJS(this.getPoints()));
    }

    
    setToken(token: string) {
        this.token = token;
    }

    setEntities(entities: MTradeEntity[]) {
        this.entities = entities;
    }

    setMatchId(match_id: string) {
        this.match_id = match_id;
    }

    setLeagueId(league_id: string) { 
        this.league_id = league_id;
    }

    setPoints(points: MTimeSeries[]) {
        this.points = points;
    }

    getPoints() {
        return this.points;
    }

}