import { Badge, Card, Text} from "@mantine/core"

import { MStocks } from "../../logic/Model/MPortfolio";

export const PortfolioCard = ({ player }: { player: MStocks }) => {
    return (
        <Card key={player.player_id} shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Times New Roman, Times, serif' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Badge>{player.team_name}</Badge>
                    <Text>{player.player_name}</Text>
                </div>
                <div>
                    <Text>Shares: {player.shares}</Text>
                    <Text>Current Price: {player.cur_price}</Text>
                </div>
            </div>
        </Card>
    );
};