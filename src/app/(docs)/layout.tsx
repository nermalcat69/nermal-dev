import { RootProvider } from 'fumadocs-ui/provider/next';
import './docs.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    // The docs render dark only. `forcedTheme` pins next-themes so a light
    // preference carried over from the marketing site cannot win, and the
    // hotkey is off so the `d` shortcut cannot flip it back.
    <RootProvider theme={{ attribute: 'class', forcedTheme: 'dark', hotKey: false }}>
      <div className="flex flex-col min-h-screen">{children}</div>
    </RootProvider>
  );
}
