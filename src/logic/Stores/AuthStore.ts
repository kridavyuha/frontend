import { makeAutoObservable } from "mobx";
import { AuthRepo } from "../Repo/AuthRepo";

export class AuthStore {
    token: string | null;
    authRepo: AuthRepo;
    isLoading: boolean = false;
    isLogged: boolean = false;  

    constructor(authRepo: AuthRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token");
        this.authRepo = authRepo;
    }

    async login(username: string, password: string) {
        this.isLoading = true;
        const { token } = await this.authRepo.login(username, password);
        this.token = token;
        window.localStorage.setItem("token", token);
        this.isLoading = false;
        this.isLogged = true;
    }
}