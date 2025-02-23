
import { action, makeAutoObservable } from "mobx";

import { MNotification } from "../Model/MNotifications";
import { NotificationRepo } from "../Repo/NotificationRepo";

export class NotificationStore{
    token: string = "";
    isLoading: boolean = false;
    notifications: MNotification[] | null = null;
    unseenCount: number = 0
    notificationRepo : NotificationRepo;

    constructor(notificationRepo: NotificationRepo){
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token") || "";
        this.notificationRepo = notificationRepo
    }

    async getNotifications(){
        this.setLoading(true)
        const notifications:MNotification[] = await this.notificationRepo.getNotifications(this.token)
        this.notifications = notifications
        var unseenCount : number = 0;
        notifications.forEach((notification)=>{
            if(notification.status === "unseen"){
                unseenCount ++;
            }
        })
        this.setUnseenCount(unseenCount)
        this.setLoading(false)
    }

    async getNotificationsForPooling(){
        const notifications:MNotification[] = await this.notificationRepo.getNotifications(this.token)
        this.notifications = notifications
        var unseenCount : number = 0;
        notifications.forEach((notification)=>{
            if(notification.status === "unseen"){
                unseenCount ++;
            }
        })
       this.setUnseenCount(unseenCount)
    }
    
    async updateStatus(){
        // mark every thing as seen,, maybe in future we change this to passing notification_id and only changing them to seen..
        this.notificationRepo.updateStatus(this.token)
        this.unseenCount = 0;
        console.log("unseen count", this.unseenCount)
    }
    @action
    setLoading(state: boolean){
        this.isLoading = state;
    }
    @action
    setUnseenCount(unseen: number){
        this.unseenCount = unseen
    }
}
