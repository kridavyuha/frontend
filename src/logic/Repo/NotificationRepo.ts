import { MNotification } from "../Model/MNotifications";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class NotificationRepo{
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
        this.rq = rq;
        this.baseUrl = baseUrl;
    }

    async getNotifications(token: string): Promise<MNotification[]>{
        try {
            const res = await this.rq.Get(`${this.baseUrl}`, AuthHeaders(token));
            const {body} = await CheckResponse(res)
            const notifications: MNotification[] = body.data
            return notifications
        }
        catch(err: any){
            throw ThrowFor(err, {
                404: "Unable to find notificaitons.",
            });
        }
    }

    async updateStatus(token:string) {
        try {
            const res = await this.rq.Post(`${this.baseUrl}/update/status`,{},AuthHeaders(token));
        }
        catch(err: any){
            throw ThrowFor(err, {
                404: "Unable to mark the notification status as seen",
            });
        }
    }
}