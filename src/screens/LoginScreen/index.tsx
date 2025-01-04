import React, { useState } from 'react';
import { Card, TextInput, PasswordInput, Button } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {authStore} = useStores();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await authStore.login(username, password);
        window.location.href = `/leagues`;

    };

    return (
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
    );
};

export default LoginScreen;