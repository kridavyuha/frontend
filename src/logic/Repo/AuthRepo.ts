import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";


export class AuthRepo {
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
      this.rq = rq;
      this.baseUrl = baseUrl;
    }
  
    async login(username: string, password: string) {
      try {
        const res = await this.rq.Post(`${this.baseUrl}/login`, {
          user_name: username,
          password
        });
        const {body} = await CheckResponse(res);
        return {
          token: body.data.data,
        };
      } catch (err: any) {
        throw ThrowFor(err, {
          404: "No such user account exists.",
          401: "Username /Password combination mismatch.",
          400: "Username /Password missing."
        });
      }
    }

    async logout(token: string): Promise<string>{
      try {
        console.log("logout", token);
        const res = await this.rq.Post(`${this.baseUrl}/logout`, {
          token
        });
        const {body} = await CheckResponse(res);
        return body.message
      } catch (err: any) {
        throw ThrowFor(err, {
          401: "Unauthorized",
          404: "No such user account exists.",
          400: "Token missing."
        });
      }
    }

  
}