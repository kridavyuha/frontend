import { Button, Card } from "@mantine/core";
import { LeagueCards } from "./LeagueCard";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../logic/Providers/StoreProviders";
import { CreateLeague } from "./CreateLeague";

export const LeaguesScreen = observer(() => {
    const { leagueStore } = useStores();

    useEffect(() => {
        leagueStore.getLeagues();
    }, []);

    if (leagueStore.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }}>
            <div className="container p-4 flex justify-center">
                <CreateLeague/>
            </div>
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
    );
});
