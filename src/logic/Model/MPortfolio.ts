export interface MPortfolio {
    balance : number;
    players: MStocks[];
}

export interface MStocks { 
    player_id: string;
    player_name: string;
    shares: number;
    invested: number;
    cur_price: number;
    team_name: string;
}