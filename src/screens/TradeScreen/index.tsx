import { TradeScreen } from "./Trade";
import { useStores } from "../../logic/Providers/StoreProviders";
import { PortfolioScreen } from "../PortfolioScreen";
import { Slider } from "./Slider";

import { observer } from "mobx-react-lite";
import LeaderBoardScreen from "../LeaderScreen";

export const Complete = observer(() => {
    
    const { tradeStore } = useStores();

    return (
    <div className="flex flex-col items-center">
        <div className="fixed w-full flex justify-center mt-4 z-10">
            <Slider />
        </div>
        <div className="w-full mt-2" style={{ overflowY: 'auto', height: 'calc(100vh - 100px)', paddingTop: '60px' }}>
            { tradeStore.tab == 0 && <PortfolioScreen/> }
            { tradeStore.tab == 1 && <TradeScreen/> }
            { tradeStore.tab == 2 && <LeaderBoardScreen/>}
        </div>
    </div>
  );
});
