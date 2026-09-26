import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { Card, CardCopy, CardMedia, Container, EqualGrid } from "@/components/site/surface";

export function Split() {
  return (
    <section id="editor" className="scroll-mt-4 bg-[var(--paper)] text-[var(--ink)]">
      <Container className="pt-2 pb-16 md:pb-[84px]">
        <EqualGrid>
          <Reveal>
            <Card tone="light" id="workspace">
              <CardMedia className="overflow-hidden rounded-[10px] ring-1 ring-black/10">
                <Image
                  src="/v0/workspaces.png"
                  alt="Workspace switcher listing workspaces and their tabs"
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  className="object-cover object-left-top"
                />
              </CardMedia>
              <CardCopy title="Workspace, tab, pane.">
                <p className="text-[var(--quiet)]">
                  A pane is one terminal: one shell on one PTY. A tab is a layout of panes.
                  A workspace is a named set of tabs, usually a project. The server is the
                  fourth word, and the reason the other three survive a reboot.
                </p>
                <p className="text-[var(--quiet)]">
                  Open a file and the editor docks beside the terminal, with syntax
                  highlighting, auto-save, and conflict detection. Every project keeps its
                  own files, git, and terminals in one workspace.
                </p>
              </CardCopy>
            </Card>
          </Reveal>
          <Reveal>
            <Card tone="dark" id="agents">
              <CardMedia className="overflow-hidden rounded-[10px] ring-1 ring-white/10">
                <Image
                  src="/v0/instances.png"
                  alt="Terminal instances list with per-pane memory"
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  className="object-cover object-left-top"
                />
              </CardMedia>
              <CardCopy title="Recognised on sight.">
                <p className="text-[#a1a1a1]">
                  22 coding CLIs are recognised in the pane, including Claude Code and
                  Codex. Nermal does not wrap them. You get per-pane status, a notification
                  when one needs you, git context on the row, and the session resumes after
                  a reboot.
                </p>
              </CardCopy>
            </Card>
          </Reveal>
        </EqualGrid>
      </Container>
    </section>
  );
}
