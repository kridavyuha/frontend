import { Badge, Card, Text} from "@mantine/core"
export const Summary = ({ invested, returns, balance }: { invested: string|number, returns: string|number, balance: number }) => {
    return (
        <div style={{ textAlign: 'center', padding: '1rem 0', borderTop: '2px solid #e0e0e0', backgroundColor: '#fff', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'left' }}>
            <Text fw={500} size="md" style={{ color: '#555' }}>Invested:</Text>
            <Text fw={700} size="md" style={{ color: '#000' }}>
                {invested}
            </Text>
            </div>
            <div style={{ textAlign: 'left' }}>
            <Text fw={500} size="md" style={{ color: '#555' }}>Returns:</Text>
            <Text fw={700} size="md" style={{ color: '#000' }}>{returns}</Text>
                
            </div>
            <div style={{ textAlign: 'left' }}>
            <Text fw={500} size="md" style={{ color: '#555' }}>Balance:</Text>
            <Text fw={700} size="md" style={{ color: '#000' }}>
                {balance}
            </Text>
            </div>
        </div>
    </div>
    )
}