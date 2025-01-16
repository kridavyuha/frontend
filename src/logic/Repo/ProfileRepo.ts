import { MProfile } from "../Model/MProfile";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class ProfileRepo {
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
        this.rq = rq;
        this.baseUrl = baseUrl;
    }

    async getProfile(token: string): Promise<MProfile> {
        try {
            const res = await this.rq.Get(`${this.baseUrl}`, AuthHeaders(token));
            const { body } = await CheckResponse(res);
            const profile = body.data as MProfile;
            return profile;
        } catch (err: any) {
            throw ThrowFor(err, {
                404: "No such profile exists.",
            });
        }
    }
}