import { Slot } from 'expo-router';
import { SessionProvider } from '../contexts/AuthContext';

export default function Layout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}