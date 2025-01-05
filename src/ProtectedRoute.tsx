import { useEffect, useState } from "react";
import { useStores } from "./logic/Providers/StoreProviders";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "react-feather";

import { observer } from "mobx-react-lite";
import { Spinner } from "./components/Spinner";

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;

export const ProtectedRoutes = observer(() => {
    const { authStore } = useStores();
    const navigate = useNavigate();
    const [authStage, setAuthStage] = useState(CHECKING_AUTH);

    useEffect(() => {
        const checkLoginStatus = async () => {         
            const token: string = await authStore.isLoggedIn()
            if (token !== "") {
                setAuthStage(CHECKED_AUTH_LOGGED_IN);
            }
            else {
                setAuthStage(AUTH_INITIAL);
            }
        
        };
        checkLoginStatus();
    }, []);

    if (authStage === AUTH_INITIAL) {
        navigate("/");
        return null;
    }

    if (authStage === CHECKING_AUTH) {
        return (
            <section
                style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner />
            </section>
        );
    }

    return <Outlet />;
});