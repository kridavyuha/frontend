import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Fieldset, TextInput,Text } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useState } from 'react';

export function CreateLeagueScreen() {
  const [matchId, setMatchId] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [capacity, setCapacity] = useState('');

  const { leagueStore } = useStores();
  

  const SubmitLeague= async()=>{
    await leagueStore.createLeague(matchId, Number(entryFee), Number(capacity));
    close();
  }


  return (
    <>
         
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
    </>
  );
}