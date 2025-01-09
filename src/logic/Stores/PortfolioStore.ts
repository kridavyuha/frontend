import { action, makeAutoObservable } from "mobx";
import { MPortfolio } from "../Model/MPortfolio";
import { PortfolioRepo } from "../Repo/PortfolioRepo";

export class PortfolioStore {
    token: string | null;
    portfolio: MPortfolio | null = null;
    isLoading: boolean = false;
    portfolioRepo: PortfolioRepo

    constructor(portfolioRepo: PortfolioRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.portfolioRepo = portfolioRepo;
    }

    @action
    async getPortfolio(league_id: string) {
        this.setLoading(true);
        const portfolio: MPortfolio = await this.portfolioRepo.getPortfolio(league_id, this.token || "");
        this.setPortfolio(portfolio);
        this.setLoading(false);
    }

    @action
    setLoading(state: boolean) {
        this.isLoading = state;
    }

    @action
    setPortfolio(portfolio: MPortfolio) {
        this.portfolio = portfolio;
    }

    
}