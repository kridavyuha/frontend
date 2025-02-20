import { createContext, useContext } from "react";
import {AppStore} from "../Stores/AppStore";
import { AuthStore } from "../Stores/AuthStore";
import { LeagueStore } from "../Stores/LeagueStore";
import { TradeStore } from "../Stores/TradeStore";
import { ProfileStore } from "../Stores/ProfileStore";
import { PortfolioStore } from "../Stores/PortfolioStore";
import { LeaderboardRepo } from "../Repo/LeaderboardRepo";
import { LeaderboardStore } from "../Stores/LeaderboardStore";
import { NotificationStore } from "../Stores/NotificationStore";

interface IStoresContext {

    appStore: AppStore;
    authStore: AuthStore;
    leagueStore: LeagueStore;
    tradeStore: TradeStore;
    profileStore: ProfileStore;
    portfolioStore: PortfolioStore;
    leaderboardStore: LeaderboardStore;
    notificationStore: NotificationStore;
   
  }
  
  export const StoresContext = createContext<IStoresContext>(
    {} as IStoresContext
  );
  
  export const useStores = () => useContext(StoresContext);