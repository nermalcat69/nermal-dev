import { Closing } from "@/components/site/closing";
import { DeepDive } from "@/components/site/deep-dive";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Features } from "@/components/site/features";
import { Split } from "@/components/site/split";
import { Statement } from "@/components/site/statement";
import { Trust } from "@/components/site/trust";
import { loadStats } from "@/lib/github";

export default async function Home() {
  const stats = await loadStats();

  return (
    <>
      <Nav />
      <main className="min-h-screen py-2 pr-2 lg:pl-[156px] xl:pl-[176px]">
        <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[18px] border border-[var(--panel-line)] bg-[var(--panel)]">
          <Hero />
          <Statement />
          <Split />
          <Features />
          <Trust stats={stats} />
          <DeepDive />
          <Closing />
        </div>
      </main>
    </>
  );
}
