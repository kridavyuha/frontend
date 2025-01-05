import { makeAutoObservable } from 'mobx';
import { MProfile } from '../Model/MProfile';
import { ProfileRepo } from '../Repo/ProfileRepo';

export class ProfileStore{
    token: string | null;
    user: MProfile | null = null;
    isLoading: boolean = false;
    profileRepo: ProfileRepo
    constructor(profileRepo: ProfileRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.profileRepo = profileRepo;
    }

    async getProfile() {
        console.log("Getting profile");
        this.isLoading = true;
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const user: MProfile = await this.profileRepo.getProfile(this.token || "");
        console.log(user);
        this.user = user;
        this.isLoading = false;
    }
}