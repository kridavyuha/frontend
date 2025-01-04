import { createContext, useContext } from "react";
import {AppStore} from "../Stores/AppStore";
import { AuthStore } from "../Stores/AuthStore";
import { LeagueStore } from "../Stores/LeagueStore";
import { TradeStore } from "../Stores/TradeStore";

interface IStoresContext {

    appStore: AppStore;
    authStore: AuthStore;
    leagueStore: LeagueStore;
    tradeStore: TradeStore
   
  }
  
  export const StoresContext = createContext<IStoresContext>(
    {} as IStoresContext
  );
  
  export const useStores = () => useContext(StoresContext);