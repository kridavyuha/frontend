export interface MPortfolio {
    balance : number;
    players: MStocks[] ;
}

export interface MStocks { 
    player_id: string;
    player_name: string;
    shares: number;
    avg_price: number;
    cur_price: number;
    team_name: string;
}

export interface MActivePorfolios {
    portfolio: MPortfolio;
    league_id: string;
    match_id: string;
}