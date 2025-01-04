import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';




import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const PlayerGraph = observer(() => {
    const [searchParams] = useSearchParams();
    const { tradeStore } = useStores();

    useEffect(() => {
        const fetchData = async () => {
            await tradeStore.getPlayerGraph(searchParams.get('player_id') || '', searchParams.get('league_id') || '');
        };
        fetchData();
    }, []);
   const data =  toJS(tradeStore.getPoints())
    return (
        <div style={{ marginTop: '50px' }}>
            <LineChart
                h={300}
                data={data}
                dataKey="date"
                series={[{ name: 'points', color: 'indigo.6' }]}
                curveType="linear"
                connectNulls
                yAxisProps={{
                    type: 'number',
                    domain: ['auto', 'auto'],
                    tickCount: 5,
                }}
            />
        </div>
    );
});

export { PlayerGraph };