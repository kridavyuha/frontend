import { MLeague } from "../Model/MLeague";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class LeagueRepo{
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
      this.rq = rq;
      this.baseUrl = baseUrl;
    }

    async getLeagues(token: string) : Promise<MLeague[]> {
        try {
          const res = await this.rq.Get(`${this.baseUrl}`,AuthHeaders(token));
          const { body } = await CheckResponse(res);
          const leagues = body.data as MLeague[];
          return leagues;
        } catch (err: any) {
            console.log(err);
          throw ThrowFor(err, {
            404: "No such leagues exist.",
          });
        }
      }

    async registreLeague(league_id: string, token: string): Promise<boolean> {
        try {
          const res = await this.rq.Post(`${this.baseUrl}/register?league_id=${league_id}`, {}, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          return true;
        } catch (err: any) {
          console.log(err);
          throw ThrowFor(err, {
            404: "No such league exists.",
          });
        }
      }

      async deleteLeague(league_id: string, token: string): Promise<void> { 
        try {
            const res = await this.rq.Get(`${this.baseUrl}/delete?league_id=${league_id}`, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          return body;
        } catch (err: any) {
          throw ThrowFor(err, {
            404: "No such league exists.",
          });
        }
      }

      async createLeague(match_id: string, entry_fee: number, capacity: number, token: string): Promise<void> {
        try {
          const res = await this.rq.Post(`${this.baseUrl}/create`, { 
            match_id: match_id, 
            entry_fee: entry_fee, 
            capacity: capacity 
          }, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          return body;
        } catch (err: any) {
          throw ThrowFor(err, {
            404: "No such league exists.",
          });
        }
      }

}
