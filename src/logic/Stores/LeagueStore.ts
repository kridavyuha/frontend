import { action, makeAutoObservable, runInAction } from "mobx";
import { MLeague } from "../Model/MLeague";
import { LeagueRepo } from "../Repo/LeagueRepo";

export class LeagueStore{
    token: string | null;
    leagues: MLeague[] = [];
    isLoading: boolean = false;
    leagueRepo: LeagueRepo

    constructor(leagueRepo: LeagueRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.leagueRepo = leagueRepo;
    }

   @action
    async getLeagues() {
        this.setLoading(true);
        const leagues: MLeague[] = await this.leagueRepo.getLeagues(this.token || "");
        this.setLeagues(leagues);
        this.setLoading(false);
    }

    async registerLeague(league_id: string) {
        this.setLoading(true);
        const status :boolean = await this.leagueRepo.registreLeague(league_id, this.token || "");
        if(status){
            // for the league_id mark is registered as true
            const league = this.leagues?.find((league) => league.league_id === league_id);
            if (league) {
                league.is_registered = true;
                league.registered += 1;
            }
            if (this.leagues) {
                this.setLeagues(this.leagues);
            }
        }
        this.setLoading(false);
    }

    async deleteLeague(league_id: string) {
        this.setLoading(true);
        await this.leagueRepo.deleteLeague(league_id, this.token || "");
        if (this.leagues) {
            this.setLeagues(this.leagues.filter((league) => league.league_id !== league_id));
        }
        this.setLoading(false);
    }

    async createLeague(match_id: string, entry_fee: number, capacity: number) {
        this.setLoading(true);
        await this.leagueRepo.createLeague(match_id, entry_fee, capacity, this.token || "");
        this.getLeagues();
        this.setLoading(false);
    }


     @action
     setLoading(state: boolean) {
        this.isLoading = state;
    }   
    @action
     setLeagues(leagues: MLeague[]) {
        this.leagues = leagues;
    }

     setToken(token: string) {
        this.token = token;
    }
}