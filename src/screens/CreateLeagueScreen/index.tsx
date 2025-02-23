import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Fieldset, TextInput,Text, Card } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Spinner } from '../../components/Spinner';

export function CreateLeagueScreen() {
  const [matchId, setMatchId] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [capacity, setCapacity] = useState('');

  const { leagueStore } = useStores();
  

  const SubmitLeague= async()=>{
    try {
      await leagueStore.createLeague(matchId, Number(entryFee), Number(capacity));
  
      notifications.show({
        title: "Success",
        message: "League Created Successfully",
        color: "green",
      });
  
      // Reset form fields
      setCapacity('');
      setEntryFee('');
      setMatchId('');
  
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create league",
        color: "red",
      });
    }
  }

  if (leagueStore.isLoading === true) {
    return (
        <Spinner/>
    );
}

  return (

    <Card style={{padding : '50 5'}}>
         
      <form onSubmit={(e) => { e.preventDefault(); SubmitLeague(); }}>
        <Fieldset>
          <TextInput label="Match ID" placeholder="1359507" value={matchId} onChange={(event) => setMatchId(event.currentTarget.value)} />
          <TextInput label="Entry Fee" placeholder="100" value={entryFee} type="number" onChange={(event) => setEntryFee((event.currentTarget.value))} />
          <TextInput label="Capacity" placeholder="100" value={capacity} type="number" onChange={(event) => setCapacity((event.currentTarget.value))} />
          <TextInput label="Contest Type" placeholder='Classic' value="Classic" disabled/>
        </Fieldset>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit" variant="light" color="blue">
            Create League
          </Button>
        </div>
      </form>
    </Card>
  );
}