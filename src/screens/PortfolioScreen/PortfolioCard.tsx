import { Badge, Card, Text} from "@mantine/core"

import { MStocks } from "../../logic/Model/MPortfolio";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Ribbon, RibbonContainer } from "react-ribbons";

export const PortfolioCard = ({ player }: { player: MStocks }) => {
    const returns = (player.cur_price * player.shares - player.avg_price * player.shares).toFixed(2);
    return (
        <Card key={player.player_id} shadow="sm" padding="lg" style={{ marginBottom: '1rem', height: '120px'}}>
             {player.shares > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '45%', padding: '5px'
                    }}>
                        <Badge>{player.team_name}</Badge>
                        <Text style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start' }}>{player.player_name}</Text>
                        <Text style={{ fontSize: '0.88rem' , display: 'flex', alignItems: 'flex-start' }}>Shares: {player.shares}</Text>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                        {parseFloat(returns) > 0 ? <FaArrowTrendUp /> : parseFloat(returns) < 0 ? <FaArrowTrendDown /> : null}
                    </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', width: '35%', fontSize: '0.9rem', marginRight: '5px' }}>
                    {parseFloat(returns) !== 0 && (
                        <Text style={{ marginLeft: '2px', fontSize: '0.9rem', color: parseFloat(returns) > 0 ? 'green' : 'red' }}>
                            {returns}
                        </Text>
                    )}
                    <Text style={{ marginRight: '2px', fontSize: '0.9rem' }}>({player.cur_price})</Text>
                </div>
                </div>
            )}
        </Card>
    );
};