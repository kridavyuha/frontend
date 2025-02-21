import React, { useEffect, useState } from 'react';
import { Card, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';

import { Modal } from '@mantine/core';

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;


const LoginScreen: React.FC = observer(() => {
    const [opened, setOpened] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { authStore } = useStores();
    const navigate = useNavigate();

    const [authStage, setAuthStage] = useState(CHECKING_AUTH);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token: string = await authStore.isLoggedIn();
            if (token !== "") {
                setAuthStage(CHECKED_AUTH_LOGGED_IN);
            } else {
                setAuthStage(AUTH_INITIAL);
            }
        };
        checkLoginStatus();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await authStore.login(username, password);
        navigate('/leagues');
    };

    if (authStage === CHECKED_AUTH_LOGGED_IN) {
        navigate("/leagues");
    }

    if (authStage === CHECKING_AUTH) {
        return <Spinner />;
    }

    return (
        <Modal opened={opened} onClose={() => setOpened(false)} title="Login">
            <Card shadow="sm" padding="lg">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        required
                        mt="md"
                    />
                    <Button type="submit" fullWidth mt="xl">
                        Submit
                    </Button>
                </form>
            </Card>
        </Modal>
    );
});


export default LoginScreen;