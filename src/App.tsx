import React, { useEffect } from 'react';
import { TradeScreen } from './screens/TradeScreen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LeaguesScreen } from './screens/LeaguesScreen';
import { CreateLeague } from './screens/CreateLeague';
import UserProfile from './screens/UserProfile';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import LoginScreen from './screens/LoginScreen';
import { MantineGraph } from './components/MantineGraph';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { useStores } from './logic/Providers/StoreProviders';
import { Observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import RightFooterIndex from './components/RightFooter.tsx';
import TopBar from './components/TopBar.tsx';
import LeftFooterIndex from './components/LeftFooter.tsx';
import BottomBar from './components/BottomBar';


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
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/trade" element={<TradeScreen />} />
                <Route path="/trade/graph" element={<MantineGraph />} />
                <Route path="/leagues" element={<LeaguesScreen />} />
                <Route path="/portfolio" element={<PortfolioScreen />} />
                <Route path="/leagues/create" element={<CreateLeague />} />
                <Route path="/" element={<LoginScreen />} />
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
