import React, { useEffect } from 'react';
import { TradeScreen } from './screens/TradeScreen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LeaguesScreen } from './screens/LeaguesScreen';
import UserProfile from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { PlayerGraph } from './screens/TradeScreen/PlayerGraph';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { useStores } from './logic/Providers/StoreProviders';
import { Observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import TopBar from './components/TopBar.tsx';
import BottomBar from './components/BottomBar';
import { WIPScreen } from './screens/WIPScreen';
import { ProtectedRoutes } from './ProtectedRoute';


const SApp = styled.section`
  width: 100%;
  max-width: 600px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const App: React.FC = () => {
  const store = useStores();

  function handleScreenWidthChanges() {
    store.appStore.setDeviceWidth(window.innerWidth);
    if (window.innerWidth <= 700) {
      store.appStore.setIsPhone(true);
    } else if (window.innerWidth <= 1250) {
      store.appStore.setIsTablet(true);
    } else {
      store.appStore.setIsDesktop(true);
    }
  }

  useEffect(() => {
    handleScreenWidthChanges();
    window.addEventListener('resize', handleScreenWidthChanges);
  }, []);

  return (
    <Observer>
      {() => {
        const { appStore } = store;
        return (
          <Router>
            {/* {appStore.isDesktop && <RightFooterIndex/>} */}

            <SApp
              style={{
                marginBottom: `${appStore.isPhone ? "70px" : "0px"}`
              }}
              className={!appStore.isPhone ? "mx-3 " : ""}
            >
            {<TopBar/>}
            {appStore.isPhone && <BottomBar />}
                <Routes>
                  <Route path="/" element={<LoginScreen />} />

                  <Route element={<ProtectedRoutes />}>

                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/trade" element={<TradeScreen />} />
                  <Route path="/trade/graph" element={<PlayerGraph />} />
                  <Route path="/leagues" element={<LeaguesScreen />} />
                  <Route path="/portfolio" element={<PortfolioScreen />} />
                  <Route path="/notifications" element={<WIPScreen/>}/>
                  <Route path="/portfolios" element={<WIPScreen/>}/>
                  <Route path="/leaderboard" element={<WIPScreen/>}/>
                  <Route path="/rules" element={<WIPScreen/>}/>
                  <Route path="/feedback" element={<WIPScreen/>}/>
                  <Route path="/settings" element={<WIPScreen/>}/>
                  
                  </Route>
                </Routes>
            </SApp>
            {/* {!appStore.isPhone && <LeftFooterIndex />} */}
          </Router>
        );
      }}
    </Observer>
  );
};

export default App;
