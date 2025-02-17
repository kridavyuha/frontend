import { TradeScreen } from "./Trade";
import { useStores } from "../../logic/Providers/StoreProviders";
import { PortfolioScreen } from "../PortfolioScreen";
import { Slider } from "./Slider";
import { GrTransaction } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import LeaderBoardScreen from "../LeaderboardScreen";
import { HoverCard } from "@mantine/core";
import { BsTrophy } from "react-icons/bs";
import { Text } from "@mantine/core";

export const Complete = observer(() => {
    
    const { tradeStore } = useStores();

    const txns = tradeStore.txns
    console.log("txns", txns)

    return (
    <div className="flex flex-col items-center">
        <div className="fixed w-full flex justify-center items-center mt-4 ml-10 z-10" style={{ width: '100vw' }}>
            <Slider />
            <div className="flex flex-row items-center space-x-0.5" style={{ marginLeft: '10px'}}>
            <HoverCard width={280} shadow="md" >
                    <HoverCard.Target>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <GrTransaction />
                        <p style={{ marginLeft: '5px', fontSize: '12px', fontWeight: 'bold' }}>{txns}</p>
                    </div>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                    <Text size="sm">
                        {txns} transactions left
                    </Text>
                    </HoverCard.Dropdown>
            </HoverCard>
               
            </div>
        </div>
       
        <div className="w-full mt-2" style={{ overflowY: 'auto', height: 'calc(100vh - 100px)', paddingTop: '60px' }}>
            { tradeStore.tab == 0 && <PortfolioScreen/> }
            { tradeStore.tab == 1 && <TradeScreen/> }
            { tradeStore.tab == 2 && <LeaderBoardScreen/>}
        </div>
    </div>
  );
});
