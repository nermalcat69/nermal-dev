import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/surface";

const features = [
  { src: "history.png", w: 1858, h: 1202, title: "Git history", body: "Stage, commit, and browse history from the sidebar, next to your files and your terminal." },
  { src: "diff.png", w: 2060, h: 1388, title: "Inline diffs", body: "Open any commit and read the diff in unified or side-by-side view without leaving the window." },
  { src: "terminals.png", w: 1210, h: 794, title: "Terminal instances", body: "Every pane in a workspace is listed in the side panel. Group them into tabs like Claude, GPU, or VPS." },
  { src: "session.png", w: 1004, h: 1276, title: "Session details", body: "Working directory, shell, branch, running processes, and a year of activity for the focused pane." },
  { src: "search.png", w: 1006, h: 864, title: "Project search", body: "Search and replace across every file in the workspace, with case and regex toggles." },
  { src: "monitor.png", w: 1004, h: 1026, title: "Activity monitor", body: "CPU, GPU, and memory per process, with a button to inspect or kill anything that runs away." },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-4 bg-[var(--paper)] text-[var(--ink)]">
      <Container className="pt-2 pb-16 md:pb-[84px]">
        <div className="columns-1 gap-3 md:columns-3">
          {features.map((f) => (
            <Reveal key={f.title} className="mb-8 break-inside-avoid">
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-[10px] ring-1 ring-black/10">
                  <Image
                    src={`/v0/${f.src}`}
                    alt={f.title}
                    width={f.w}
                    height={f.h}
                    sizes="(min-width: 768px) 340px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] leading-[22px] font-medium">{f.title}</h3>
                  <p className="mt-1 text-[14px] leading-[21px] text-pretty text-[var(--quiet)]">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
