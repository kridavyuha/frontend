import { useStores } from "../../logic/Providers/StoreProviders";
import { MyLeagueCards } from "./MyLeagueCards";


export const MyLeagues = () => {
    const {profileStore}   = useStores();
    const leagues = profileStore.user?.leagues;
    return (
        leagues?.map((league) => (
            <MyLeagueCards key={league.league_id} data={league} />
        ))
    )
}