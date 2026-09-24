import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { Body, Container, SectionTitle } from "@/components/site/surface";
import { bench, columns, links } from "@/lib/links";

const notes = [
  "The PTY is read at device speed and parsed in large batches, off the render path, so drawing never throttles reading.",
  "The hot paths are lock-free. A big cat never waits on the renderer.",
  "The server buffers up to 16 MiB ahead of the window before backpressure applies, enough that a flood finishes writing while the window is still catching up.",
];

export function DeepDive() {
  return (
    <section id="performance" className="scroll-mt-4 border-t border-[var(--line)] bg-[var(--contrast)] text-[var(--contrast-ink)]">
      <Container className="py-16 md:py-[112px]">
        <Reveal>
          <SectionTitle className="sm:text-[52px]">
            95 ms for an 11 MB cat.
          </SectionTitle>
          <Body className="mt-6 max-w-[54ch] text-[var(--contrast-muted)]">
            <p>
              Same machine, same day, same 155 by 40 grid. Apple M1 Pro, macOS 26.3.1,
              five-run averages. Roughly twice the throughput of Alacritty, Ghostty, or
              Kitty on a big cat.
            </p>
          </Body>
        </Reveal>

        <Reveal className="mt-12">
          <div
            className="overflow-x-auto rounded-sm focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--contrast)]"
            role="region"
            aria-label="Performance benchmark table"
            tabIndex={0}
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Five-run average throughput: nermal versus Alacritty, Ghostty, and Kitty
              </caption>
              <thead>
                <tr className="border-b border-[var(--line)] text-[13px] text-[var(--contrast-muted)]">
                  <th scope="col" className="py-3 pr-4 font-normal">
                    Measure
                  </th>
                  {columns.map((column) => (
                    <th
                      scope="col"
                      key={column}
                      className={
                        column === "nermal"
                          ? "px-4 py-3 font-medium text-[var(--contrast-ink)]"
                          : "px-4 py-3 font-normal"
                      }
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bench.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--line)]">
                    <th scope="row" className="py-4 pr-4 text-[15px] font-normal">
                      {row.label}
                      <span className="mt-1 block text-[13px] font-normal text-[var(--contrast-muted)]">
                        {row.note}
                      </span>
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={columns[index]}
                        className={
                          index === 0
                            ? "px-4 py-4 text-[15px] font-medium tabular-nums"
                            : "px-4 py-4 text-[15px] text-[var(--contrast-muted)] tabular-nums"
                        }
                      >
                        {value} {row.unit}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[62ch] text-[13px] leading-[18.5px] text-[var(--contrast-muted)]">
            Cold launch is the GUI at 105 MB plus the persistent server at 11 MB. The
            method is in{" "}
            <a
              href={links.bench}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm underline decoration-white/30 underline-offset-4 transition-colors duration-150 outline-none hover:decoration-white focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--contrast)]"
            >
              scripts/bench
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <ul className="grid gap-8 md:grid-cols-3">
            {notes.map((note) => (
              <li key={note} className="min-w-0 text-[15px] leading-[22.5px] text-[var(--contrast-soft)]">
                {note}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <Image
            src="/hero.webp"
            alt="The nermal workbench, GPU-rendered, with a persistent sidebar of panes"
            width={1470}
            height={956}
            loading="lazy"
            sizes="(min-width: 1080px) 1016px, 100vw"
            className="h-auto w-full rounded-[14px] ring-1 ring-white/10"
          />
        </Reveal>
      </Container>
    </section>
  );
}
