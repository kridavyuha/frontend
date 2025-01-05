import { action, makeAutoObservable } from "mobx";
import { AuthRepo } from "../Repo/AuthRepo";

export class AuthStore {
    token: string = "";
    authRepo: AuthRepo;
    isLoading: boolean = false;
    isLogged: boolean = false;  

    constructor(authRepo: AuthRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token") || "";
        this.authRepo = authRepo;
    }

    async login(username: string, password: string) {
        this.isLoading = true;
        const { token } = await this.authRepo.login(username, password);
        this.token = token;
        window.localStorage.setItem("token", token);
        window.location.href = '/leagues';
        this.isLoading = false;
        this.isLogged = true;
    }

    async logout() {
        this.isLoading = true;
        await this.authRepo.logout(this.token);
        window.localStorage.removeItem("token");
        this.token = "";
        this.isLoading = false;
        this.isLogged = false;
        window.location.href = '/';
    }

    //TODO: This is temporary, will be removed when we have a proper auth flow
    // Here thinking that token is valid life long.
    // Need to have some route isLoggedIn to check if token is valid or not.

    @action
    async isLoggedIn() {
       const token = window.localStorage.getItem("token");
       this.token = token || "";
       return token || "";
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    setLogged(state: boolean) {
        this.isLogged = state;
    }   

    getIsLogged() {
        return this.isLogged;
    }

}