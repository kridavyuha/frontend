import { action, makeAutoObservable } from "mobx";
import { MActivePorfolios, MPortfolio } from "../Model/MPortfolio";
import { PortfolioRepo } from "../Repo/PortfolioRepo";

export class PortfolioStore {
    token: string | null;
    portfolio: MPortfolio | null = null;
    isLoading: boolean = false;
    portfolioRepo: PortfolioRepo
    activePortfolios :MActivePorfolios[] =[]

    constructor(portfolioRepo: PortfolioRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.portfolioRepo = portfolioRepo;
    }

    @action
    async getPortfolio(league_id: string) {
        this.setLoading(true);
        const portfolio: MPortfolio = await this.portfolioRepo.getPortfolio(league_id, this.token || "");
        if (portfolio.players === null){
            portfolio.players = [];
        }
        console.log("get portfolio",portfolio.players);
        this.setPortfolio(portfolio);
        this.setLoading(false);
    }

    @action
    async getActivePortfolio() {
        this.setLoading(true);
        const portfolios: MActivePorfolios[] = await this.portfolioRepo.getActivePortfolio(this.token || "");
        this.activePortfolios = portfolios
     
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