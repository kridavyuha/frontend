import { Badge, Card, Text} from "@mantine/core"

import { MStocks } from "../../logic/Model/MPortfolio";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export const PortfolioCard = ({ player }: { player: MStocks }) => {
    const returns = player.cur_price* player.shares - player.invested;
    return (
        <Card key={player.player_id} shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
            {player.shares > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Times New Roman, Times, serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Badge>{player.team_name}</Badge>
                        <Text>{player.player_name}</Text>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text>Returns:</Text>
                        {returns > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>{`+${returns.toFixed(2)}`}</Text>
                                <FaArrowTrendUp style={{ color: 'green', marginLeft: '0.5rem' }} />
                            </div>
                        ) : returns < 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>{returns.toFixed(2)}</Text>
                                <FaArrowTrendDown style={{ color: 'red', marginLeft: '0.5rem' }} />
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <Text style={{ color: 'black'}}>{returns.toFixed(2)}</Text>
                            </div>
                        )}
                    </div>
                    <div>
                        <Text>Shares: {player.shares}</Text>
                        <Text>Current Price: {player.cur_price}</Text>
                  
                    </div>
                </div>
            )}
        </Card>
    );
};