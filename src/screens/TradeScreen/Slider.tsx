import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';

const data = [ 'Portfolio', 'Trade','Standings'];

export function Slider() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const tradeStore = useStores().tradeStore;

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

const controls = (
    <>
        <UnstyledButton
            key="Portfolio"
            className={classes.control}
            ref={setControlRef(0)}
            onClick={() => {
                setActive(0);
                tradeStore.setTab(0);
                // navigate(`/portfolio?leagueId=${tradeStore.league_id}`)
            }}
            mod={{ active: active === 0 }}
        >
            <span className={classes.controlLabel}>Portfolio</span>
        </UnstyledButton>
        <UnstyledButton
            key="Trade"
            className={classes.control}
            ref={setControlRef(1)}
            onClick={() => {
                setActive(1)
                tradeStore.setTab(1);
                // navigate(`/trade?leagueId=${tradeStore.league_id}&matchId=${tradeStore.match_id}`)
            }
            }
            mod={{ active: active === 1 }}
        >
            <span className={classes.controlLabel}>Trade</span>
        </UnstyledButton>
        <UnstyledButton
            key="Standings"
            className={classes.control}
            ref={setControlRef(2)}
            onClick={() => setActive(2)}
            mod={{ active: active === 2 }}
        >
            <span className={classes.controlLabel}>Standings</span>
        </UnstyledButton>
    </>
);

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}

