import Image from "next/image";
import type { RepoStats } from "@/lib/github";
import { agents } from "@/lib/links";
import { Reveal } from "@/components/site/reveal";
import { SponsorsWall } from "@/components/site/sponsors";
import { Container, SectionTitle } from "@/components/site/surface";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function Trust({ stats }: { stats: RepoStats }) {
  const figures = [
    { value: formatCount(stats.stars), label: "GitHub stars" },
    { value: formatCount(stats.downloads), label: "Release downloads" },
    { value: "22", label: "CLIs recognized" },
  ];

  return (
    <section id="trust" aria-label="Adoption" className="scroll-mt-4 bg-[var(--contrast)] text-[var(--contrast-ink)]">
      <Container className="py-14 md:py-[84px]">
        <Reveal>
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {figures.map((figure) => (
              <div key={figure.label}>
                <dt className="order-first text-[13px] leading-[18px] text-[var(--contrast-muted)]">{figure.label}</dt>
                <dd className="mt-2 text-[40px] leading-none font-medium tracking-[-0.04em] tabular-nums">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
          <SectionTitle as="h2" size="card" className="mt-12 text-[13px] leading-[18px] font-normal tracking-normal text-[var(--contrast-muted)]">
            Recognised on sight
          </SectionTitle>
          <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
            {agents.map((agent) => (
              <li key={agent.name} className="flex items-center gap-2.5">
                <Image
                  src={agent.src}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  className="h-5 w-5 opacity-80 brightness-0 dark:invert"
                />
                <span className="text-[13px] text-[var(--contrast-soft)]">{agent.name}</span>
              </li>
            ))}
          </ul>
          <SponsorsWall />
        </Reveal>
      </Container>
    </section>
  );
}
