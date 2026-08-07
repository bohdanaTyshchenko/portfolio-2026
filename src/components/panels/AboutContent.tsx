import { PanelContent } from "@/components/work/PanelContent";
import { typography } from "@/lib/typography";
import {
  AboutKanbanSection,
  AboutMediaSection,
} from "./AboutMediaSection";

type AboutContentProps = {
  onClose: () => void;
};

const BIO_COLUMNS = [
  {
    title: "Where it started",
    body: "I wrote my first code at 14, in a high school classroom in Dnipro. Later I moved to Canada for a program that was half UX, half software development. It didn't take long to figure out that I could write code, but design was the part I looked forward to.",
  },
  {
    title: "Learning by doing",
    body: "After six months of rejections, I landed my first UX internship at a dev shop where I was the only designer. There was no mentor and no process, so I learned to figure things out on my own — a habit that has stayed with me ever since.",
  },
  {
    title: "Where I am now",
    body: "I joined Dig Insights as a Product Designer and grew into the Product Design Manager role, which I've held for almost three years. I still design hands-on every week — it's hard to lead design well if you stop doing the work.",
  },
] as const;

function BioColumn({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2">
      <h5 className={`${typography.h5} text-p-text`}>{title}</h5>
      <p className={`${typography.bodyL} text-p-text`}>{body}</p>
    </section>
  );
}

export function AboutContent({ onClose }: AboutContentProps) {
  return (
    <PanelContent
      title="About"
      onClose={onClose}
      headerClassName="px-14 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
      contentClassName="px-14 pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 lg:pt-[150px]"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1040px] flex-col gap-16 lg:gap-[240px]">
        <div className="flex min-w-0 flex-col gap-8">
          <p className={`${typography.h4} text-p-text`}>
            I&apos;m Bohdana — a Product Design Manager in Toronto, originally
            from Ukraine. I moved to Canada eight years ago and built my
            career, and a good part of my life, around design.
          </p>

          <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:gap-12">
            {BIO_COLUMNS.map((column) => (
              <BioColumn
                key={column.title}
                title={column.title}
                body={column.body}
              />
            ))}
          </div>
        </div>

        <AboutMediaSection />

        <AboutKanbanSection />
      </div>
    </PanelContent>
  );
}
