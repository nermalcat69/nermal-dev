import type { FC, HTMLAttributes, ReactNode } from 'react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion as FumadocsAccordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout, type CalloutType } from 'fumadocs-ui/components/callout';
import { Card as FumadocsCard, Cards } from 'fumadocs-ui/components/card';
import { Step as FumadocsStep, Steps } from 'fumadocs-ui/components/steps';
import { Tab as FumadocsTab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';

/**
 * The docs in `content/docs` were authored for Mintlify, which is not a
 * dependency of this app. Rather than rewrite 38 pages by hand, the MDX is
 * kept as-is and the Mintlify-only tags are mapped to Fumadocs equivalents
 * here. Each wrapper accepts the original props, so a page can be edited
 * without knowing this file exists.
 */

/** `<Frame caption="...">` wrapped a screenshot. Fumadocs has no equivalent,
 *  so it becomes a `<figure>` with a `<figcaption>`. */
const Frame: FC<{ caption?: string } & HTMLAttributes<HTMLElement>> = ({
  caption,
  children,
  ...props
}) => (
  <figure {...props}>
    {children}
    {caption ? <figcaption>{caption}</figcaption> : null}
  </figure>
);

/** `<CardGroup cols={2}>` is a responsive grid of cards. Fumadocs `Cards` is
 *  already a grid, so the column count is dropped in favour of its layout. */
const CardGroup: FC<{ cols?: number; children?: ReactNode }> = ({ children }) => (
  <Cards>{children}</Cards>
);

/** `<Card title icon="discord">` used a string icon name. Fumadocs `Card`
 *  wants a ReactNode and this app has no icon registry, so the icon is
 *  accepted and ignored rather than forwarded to the DOM. */
const Card: FC<{ title?: ReactNode; icon?: unknown; href?: string; children?: ReactNode }> = ({
  title,
  href,
  children,
}) => (
  <FumadocsCard href={href} title={title}>
    {children}
  </FumadocsCard>
);

/** `<AccordionGroup>` wrapped `<Accordion title="...">` items. */
const AccordionGroup: FC<{ children?: ReactNode }> = ({ children }) => (
  <Accordions>{children}</Accordions>
);

/** `<Accordion title="...">` inside a group. The title doubles as the value so
 *  every item keeps a stable, unique key. */
const Accordion: FC<{ title: string; children?: ReactNode }> = ({ title, children }) => (
  <FumadocsAccordion title={title} value={title}>
    {children}
  </FumadocsAccordion>
);

/** `<Tabs>` wrapping `<Tab title="macOS">`. Fumadocs infers a value from the
 *  index when one is omitted, so the label is passed through as the value. */
const TabsShim: FC<{ children?: ReactNode }> = ({ children }) => <Tabs>{children}</Tabs>;

const TabShim: FC<{ title?: string; children?: ReactNode }> = ({ title, children }) => (
  <FumadocsTab value={title}>{children}</FumadocsTab>
);

/** `<Steps>` / `<Step title="...">`. Fumadocs `Step` takes its heading as
 *  children, so the Mintlify title becomes the step label. */
const StepShim: FC<{ title?: string; children?: ReactNode }> = ({ title, children }) => (
  <FumadocsStep>
    {title ? <h4>{title}</h4> : null}
    {children}
  </FumadocsStep>
);

/** Mintlify callout names mapped onto Fumadocs `Callout` types. `Tip` becomes
 *  `idea` because Fumadocs has no `tip` type. */
function callout(type: CalloutType): FC<{ title?: string; children?: ReactNode }> {
  return function CalloutShim({ title, children }) {
    return (
      <Callout type={type} title={title}>
        {children}
      </Callout>
    );
  };
}

const Note = callout('info');
const Info = callout('info');
const Tip = callout('idea');
const Warning = callout('warn');

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Frame,
    CardGroup,
    Card,
    AccordionGroup,
    Accordion,
    Tabs: TabsShim,
    Tab: TabShim,
    Steps,
    Step: StepShim,
    Note,
    Info,
    Tip,
    Warning,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
