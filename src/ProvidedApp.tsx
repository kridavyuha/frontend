import { useEffect } from "react";
import { StoresContext } from "./logic/Providers/StoreProviders";
import { Observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { MantineProvider } from "@mantine/core";
import {AppStore} from "./logic/Stores/AppStore";
import { AuthStore } from "./logic/Stores/AuthStore";
import { AuthRepo } from "./logic/Repo/AuthRepo";
import { Request } from "./logic/Utils/Fetch";
import { LeagueRepo } from "./logic/Repo/LeagueRepo";
import { LeagueStore } from "./logic/Stores/LeagueStore";
import { TradeStore } from "./logic/Stores/TradeStore";
import { TradeRepo } from "./logic/Repo/TradeRepo";
import { ProfileStore } from "./logic/Stores/ProfileStore";
import { ProfileRepo } from "./logic/Repo/ProfileRepo";
import { PortfolioStore } from "./logic/Stores/PortfolioStore";
import { PortfolioRepo } from "./logic/Repo/PortfolioRepo";

interface ProvidedAppProps {
    children?: React.ReactNode;
  }
  
  const BASE_URL = "http://localhost:8080";
  
  function ProvidedApp(props: ProvidedAppProps) {
    const rq = new Request({ "Content-Type": "application/json" });

    const appStore = new AppStore();
    const authStore = new AuthStore(new AuthRepo(BASE_URL+"/login",rq));
    const leagueStore = new LeagueStore(new LeagueRepo(BASE_URL+"/leagues",rq));
    const tradeStore = new TradeStore(new TradeRepo(BASE_URL+"/trade",rq));
    const profileStore = new ProfileStore(new ProfileRepo(BASE_URL+"/profile",rq));
    const portfolioStore = new PortfolioStore(new PortfolioRepo(BASE_URL+"/portfolio",rq));

    return (
      <div>
        <StoresContext.Provider
          value={{
            appStore,
            authStore,
            leagueStore,
            tradeStore,
            profileStore,
            portfolioStore
          }}
        >
          {
            <Observer>
              {() => {
                return (
                  <ThemeProvider theme={{}}>
                    <MantineProvider
                      theme={{
                        colors: {},
                      }}
                    >
                        {props.children}
                    </MantineProvider>
                  </ThemeProvider>
                );
              }}
            </Observer>
          }
        </StoresContext.Provider>
      </div>
    );
  }
  
  export default ProvidedApp;