import { persistentAtom } from '@nanostores/persistent';
import { action } from 'nanostores';

export type Theme = 'light' | 'dark' | 'auto';
export const theme = persistentAtom<Theme>('theme', 'auto', { encode: JSON.stringify, decode: JSON.parse });
export const toggleTheme = action(theme, 'toggleTheme', (store) => store.set(store.get() === 'light' ? 'dark' : 'light'));
export const getPreferredTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
