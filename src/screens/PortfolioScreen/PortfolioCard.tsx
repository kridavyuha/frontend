import { Badge, Card, Text} from "@mantine/core"

import { MStocks } from "../../logic/Model/MPortfolio";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Ribbon, RibbonContainer } from "react-ribbons";

export const PortfolioCard = ({ player }: { player: MStocks }) => {
    const returns = player.cur_price* player.shares - player.invested;
    return (
        <RibbonContainer>
            
            <Card key={player.player_id} shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
            <Ribbon
                side="left"
                type="corner"
                size="normal"
                backgroundColor="#add8e6"
                color="#000000"
                fontFamily="sans"
                withStripes
                >
                   <div style={{marginRight: '5px'}}>
                   {player.team_name}
                   </div>
                </Ribbon>
            {player.shares > 0 && (
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Times New Roman, Times, serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, fontSize: '0.8rem', marginLeft: '15px'  }}>
                        <Text size="sm">{player.player_name}</Text>
                        <Text size="sm">{player.shares} shares</Text>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                         <Text size="xs">({player.cur_price*player.shares}) </Text>
                         <Text size="xs">({1800}) </Text>
                        
                    </div>
                </div>
            )}
        </Card>
        </RibbonContainer>
    );
};