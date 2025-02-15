import { Button, Card, Loader } from "@mantine/core";
import { LeagueCards } from "./LeagueCard";
import { useEffect } from "react";
import { Observer, observer } from "mobx-react-lite";
import { useStores } from "../../logic/Providers/StoreProviders";

export const LeaguesScreen = observer(() => {
    const { leagueStore } = useStores();

    useEffect(() => {
        leagueStore.getLeagues();
    }, []);

    return (
        leagueStore.isLoading ? (
            <section
                style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader size={"sm"} />
            </section>
        ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }}>
                
                {leagueStore.leagues.length === 0 ? (
                    <h1>No leagues found</h1>
                ) : (
                    <div className="gap-4">
                        {leagueStore.leagues.map((league) => (
                            <LeagueCards key={league.league_id} data={league} />
                        ))}
                    </div>
                )}
            </Card>
        )
    );
});
