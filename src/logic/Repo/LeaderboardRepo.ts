import { MLeaderboard } from "../Model/MLeaderBoard";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";



export class LeaderboardRepo {
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
      this.rq = rq;
      this.baseUrl = baseUrl;
    }

    async getLeaderboard(token: string, league_id:string):Promise<MLeaderboard[]> {
        try {
          const res = await this.rq.Get(`${this.baseUrl}?league_id=${league_id}`, AuthHeaders(token));
          const {body} = await CheckResponse(res);
          return body.data
        } catch (err: any) {
          throw ThrowFor(err, {
            401: "Unauthorized",
            404: "No such user account exists.",
            400: "Token missing."
          });
        }
    }

}