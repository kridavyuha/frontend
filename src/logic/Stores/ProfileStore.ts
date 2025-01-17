import { makeAutoObservable } from 'mobx';
import { MCompleteProfile, MProfile } from '../Model/MProfile';
import { ProfileRepo } from '../Repo/ProfileRepo';

export class ProfileStore{
    token: string | null;
    user: MCompleteProfile | null = null;
    isLoading: boolean = false;
    profileRepo: ProfileRepo
    constructor(profileRepo: ProfileRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.profileRepo = profileRepo;
    }

    async getProfile() {
        this.isLoading = true;
        const user: MCompleteProfile = await this.profileRepo.getProfile(this.token || "");
        console.log(user);
        this.user = user;
        this.isLoading = false;
    }
}