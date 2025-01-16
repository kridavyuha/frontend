import { Table, Text } from '@mantine/core';

const elements = [
    { position: 1,usename: "Rithvik", value: 12001.1},
    {position:  2,usename: "Kohli", value: 11007},
    { position: 3,usename: "Nayar", value: 8800.6},
    { position: 4,usename: "Abhi", value: 1570.3},
    { position: 5,usename: "Ashneer", value: 1400.12},
  ];

const rows = elements.map((element) => (
    <Table.Tr key={element.position}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.usename}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
     <Table.Th>Rank</Table.Th>
      <Table.Th>User</Table.Th>
      <Table.Th>Points</Table.Th>
    </Table.Tr>
  );

export const LeaderBoardScreen = () => {

    return (
        <div style={{ marginTop: '10px', paddingLeft: '20px', paddingRight: '15px' }}>
            <Text style={{  fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
            Standings
            </Text>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
      );
}

export default LeaderBoardScreen