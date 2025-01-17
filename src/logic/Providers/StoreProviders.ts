import { createContext, useContext } from "react";
import {AppStore} from "../Stores/AppStore";
import { AuthStore } from "../Stores/AuthStore";
import { LeagueStore } from "../Stores/LeagueStore";
import { TradeStore } from "../Stores/TradeStore";
import { ProfileStore } from "../Stores/ProfileStore";
import { PortfolioStore } from "../Stores/PortfolioStore";
import { LeaderboardRepo } from "../Repo/LeaderboardRepo";
import { LeaderboardStore } from "../Stores/LeaderboardStore";

interface IStoresContext {

    appStore: AppStore;
    authStore: AuthStore;
    leagueStore: LeagueStore;
    tradeStore: TradeStore;
    profileStore: ProfileStore;
    portfolioStore: PortfolioStore;
    leaderboardStore: LeaderboardStore
   
  }
  
  export const StoresContext = createContext<IStoresContext>(
    {} as IStoresContext
  );
  
  export const useStores = () => useContext(StoresContext);