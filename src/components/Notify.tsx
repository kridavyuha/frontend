import { Notification } from '@mantine/core';

export function Notify() {
  return (
    <div style={{ position: 'fixed', bottom: '70px', width: '100%' }}>
      <Notification title="We notify you that" closeButtonProps={{ 'aria-label': 'Hide notification' }}>
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
    </div>
  );
}