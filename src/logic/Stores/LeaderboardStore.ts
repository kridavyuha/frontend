import { makeAutoObservable } from "mobx";

import { LeaderboardRepo } from "../Repo/LeaderboardRepo";
import { MLeaderboard } from "../Model/MLeaderBoard";

export class LeaderboardStore{
    token: string = "";
    leaderboard: MLeaderboard[] | null = null;
    isLoading: boolean = false;
    leaderboardRepo: LeaderboardRepo;
    matchId: string = "";
    leagueId: string = "";

    constructor(leaderboardRepo: LeaderboardRepo){
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token") || "";
        this.leaderboardRepo = leaderboardRepo
    }

    async getLeaderboard(league_id: string){
       this.setLoading(true);
       const data:MLeaderboard[]  = await this.leaderboardRepo.getLeaderboard(this.token, league_id)
       this.setLeaderboard(data);  
       this.setLoading(false);
    }

    setLoading(state: boolean){
        this.isLoading = state;
    }
    setLeaderboard(leaderboard: MLeaderboard[]){
        this.leaderboard = leaderboard;
    }

    setMatchId(matchId: string){
        this.matchId = matchId;
    }

    setLeagueId(leagueId: string){
        this.leagueId = leagueId;
    }
    

}

