import { createContext, useContext } from "react";
import {AppStore} from "../Stores/AppStore";
import { AuthStore } from "../Stores/AuthStore";
import { LeagueStore } from "../Stores/LeagueStore";
import { TradeStore } from "../Stores/TradeStore";
import { ProfileStore } from "../Stores/ProfileStore";

interface IStoresContext {

    appStore: AppStore;
    authStore: AuthStore;
    leagueStore: LeagueStore;
    tradeStore: TradeStore;
    profileStore: ProfileStore
   
  }
  
  export const StoresContext = createContext<IStoresContext>(
    {} as IStoresContext
  );
  
  export const useStores = () => useContext(StoresContext);