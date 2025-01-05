import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Fieldset, TextInput } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useState } from 'react';

export function CreateLeague() {
  const [opened, { open, close }] = useDisclosure(false);
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
      <Drawer
        opened={opened}
        onClose={close}
        title="League Creation"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Fieldset>
            <TextInput label="Match ID" placeholder="1359507" value={matchId} onChange={(event) => setMatchId(event.currentTarget.value)} />
            <TextInput label="Entry Fee" placeholder="100" value={entryFee} type="number" onChange={(event) => setEntryFee((event.currentTarget.value))} />
            <TextInput label="Capacity" placeholder="100" value={capacity} type="number" onChange={(event) => setCapacity((event.currentTarget.value))} />
        </Fieldset>
        <Button variant="light" color="blue" onClick={()=>SubmitLeague()} className='mt-5'>
          Submit
        </Button>
      </Drawer>

      <Button variant="light" color="blue" onClick={open}>
         Create League
      </Button>
    </>
  );
}