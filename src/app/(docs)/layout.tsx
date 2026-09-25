import { RootProvider } from 'fumadocs-ui/provider/next';
import { Nav } from '@/components/site/nav';
import './docs.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    // The docs render dark only. `forcedTheme` pins next-themes so a light
    // preference carried over from the marketing site cannot win, and the
    // hotkey is off so the `d` shortcut cannot flip it back.
    <RootProvider theme={{ attribute: 'class', forcedTheme: 'dark', hotKey: false }}>
      <Nav docs />
      <main className="min-h-screen py-2 pr-2 lg:pl-[156px] xl:pl-[176px]">
        <div className="min-h-[calc(100vh-1rem)] overflow-clip rounded-[18px] border border-[var(--panel-line)] bg-[var(--panel)]">
          {children}
        </div>
      </main>
    </RootProvider>
  );
}
