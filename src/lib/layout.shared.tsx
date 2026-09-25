import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { links } from '@/lib/links';
import { docsRoute } from '@/lib/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'nermal',
      url: '/',
    },
    githubUrl: links.repo,
    // The docs are dark-only: the switch is removed and the `d` hotkey is
    // disabled in the provider, so there is no way to opt out of dark here.
    slots: {
      themeSwitch: false,
    },
    links: [
      {
        text: 'Documentation',
        url: docsRoute,
        active: 'nested-url',
      },
      {
        text: 'Releases',
        url: links.releases,
        external: true,
      },
    ],
  };
}
