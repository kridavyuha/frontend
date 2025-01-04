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
        console.log("login", username, password);
        const res = await this.rq.Post(`${this.baseUrl}`, {
          user_name: username,
          password
        });
        const { body } = await CheckResponse(res, 200);
        return {
          token: body.token
        };
      } catch (err: any) {
        throw ThrowFor(err, {
          405: "The account is associated with Login With Google.",
          404: "No such user account exists.",
          401: "Email/Password combination mismatch.",
          400: "Email/Password missing."
        });
      }
    }
  
}