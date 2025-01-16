import { Badge, Card, Text} from "@mantine/core"
export const Summary = (totalInvested: number, totalReturns: number, totalPortfolioValue: number) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem 0', borderTop: '2px solid #e0e0e0', backgroundColor: '#fff', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Text fw={700} size="xl" style={{ color: '#333' }}>Summary</Text>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'left' }}>
                <Text fw={500} size="md" style={{ color: '#555' }}>Total Invested:</Text>
                <Text fw={700} size="md" style={{ color: '#000' }}>{totalInvested}</Text>
            </div>
            <div style={{ textAlign: 'left' }}>
                <Text fw={500} size="md" style={{ color: '#555' }}>Total Returns:</Text>
                <Text fw={700} size="md" style={{ color: '#000' }}>{totalReturns}</Text>
            </div>
            <div style={{ textAlign: 'left' }}>
                <Text fw={500} size="md" style={{ color: '#555' }}>Total Portfolio Value:</Text>
                <Text fw={700} size="md" style={{ color: '#000' }}>{totalPortfolioValue}</Text>
            </div>
        </div>
    </div>
    )
}