import { MPortfolio } from "../Model/MPortfolio";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class PortfolioRepo {
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
        this.rq = rq;
        this.baseUrl = baseUrl;
    }

    async getPortfolio(league_id: string, token: string): Promise<MPortfolio> {
        try {
            const res = await this.rq.Get(`${this.baseUrl}?league_id=${league_id}`, AuthHeaders(token));
            const { body } = await CheckResponse(res);
            const portfolio = body.data as MPortfolio;
            return portfolio;
        } catch (err: any) {
            throw ThrowFor(err, {
                404: "No such portfolio exists.",
            });
        }
    }
}