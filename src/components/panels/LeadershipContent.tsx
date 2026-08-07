import Image from "next/image";
import { PanelContent } from "@/components/work/PanelContent";
import { typography } from "@/lib/typography";

type LeadershipContentProps = {
  onClose: () => void;
};

const PHILOSOPHY = [
  {
    title: "Lead by example",
    body: "I hold myself to the same standards I expect from my team. Trust is built through consistency — owning mistakes, meeting commitments, and showing up fully every day.",
  },
  {
    title: "Lead with empathy",
    body: "I listen first and lead second. When people feel genuinely understood, they do their best work — and creating that environment is my core responsibility as a leader.",
  },
  {
    title: "Lead with support",
    body: "My role as a leader isn't to have all the answers — it's to clear the path for others to find theirs. I focus on removing blockers, offering guidance without micromanaging, and making sure my team has what they need to succeed.",
  },
] as const;

const RESPONSIBILITIES = [
  {
    title: "Leading projects",
    body: "Setting design direction and keeping work moving from kickoff to ship.",
  },
  {
    title: "Managing & growing people",
    body: "One-on-ones, growth plans, and honest feedback that helps designers level up.",
  },
  {
    title: "Hiring",
    body: "Hiring designers and making sure the team stays full and capable.",
  },
  {
    title: "Product strategy",
    body: "Shaping strategy for the parts of the product my team owns.",
  },
  {
    title: "Hands-on support",
    body: "Being there for designers at every step, from first idea to final review.",
  },
  {
    title: "Design ops",
    body: "Keeping our documentation and design system organized, and introducing processes that make the team's work smoother.",
  },
  {
    title: "Cross-functional collaboration",
    body: "Working closely with leadership across product, engineering, and QA.",
  },
] as const;

const TEAM_NOTES = [
  {
    name: "Raina",
    color: "bg-[#fee8f0]",
    body: "It has been very refreshing to see your management style. When I joined this team under crazy circumstances I wasn't sure what to expect, but from the beginning you made sure that I feel very welcomed. You support the team in so many amazing ways and it's lovely to see that.",
  },
  {
    name: "Anna",
    color: "bg-[#f4fadd]",
    body: "Thanks Bohdana, for all your support and tips! The biggest thank you for believing in me and trusting me with more responsibility and independence. This year was really exciting for me in terms of my own projects, troubleshooting, and presentations. Thanks for being a great manager! P.S. I really admire how calmly you give feedback and guide us in shaping our vision.",
  },
  {
    name: "Rula",
    color: "bg-[#e5f1fd]",
    body: "You're the rock of this team and you have brought so much energy and positive change from the moment you joined. I appreciate everything you do for us and your very calm self makes me feel zen as well. Would've been in shambles without you. Love you.",
  },
  {
    name: "Olha",
    color: "bg-[#ffe6df]",
    body: "Thanks for one more year of great management, understanding and supporting. Thanks for giving opportunities for improving design skills. Thanks for advocating painful design questions with stakeholders or researchers. Thanks for giving opportunity to work independently.",
  },
] as const;

function SectionHeading({ children }: { children: string }) {
  return <h5 className={`${typography.h5} text-p-text`}>{children}</h5>;
}

function PhilosophyColumn({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2">
      <h5 className={`${typography.h5} text-p-text`}>{title}</h5>
      <p className={`${typography.bodyL} text-p-text`}>{body}</p>
    </section>
  );
}

function TeamPhoto({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div className="relative aspect-[1024/600] w-full overflow-hidden rounded-[20px] bg-p-grey-5">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 508px"
        />
      </div>
      <figcaption className={`${typography.bodyS} text-p-grey-60`}>
        {caption}
      </figcaption>
    </figure>
  );
}

export function LeadershipContent({ onClose }: LeadershipContentProps) {
  return (
    <PanelContent
      title="Leadership philosophy"
      onClose={onClose}
      headerClassName="pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
      contentClassName="pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 lg:pt-[150px]"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1040px] flex-col gap-16 lg:gap-[160px]">
        {/* Team photos + intro + philosophy */}
        <div className="flex min-w-0 flex-col gap-8">
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
            <TeamPhoto
              src="/images/leadership/team-01.png"
              alt="Five team members posing on a video call"
              caption="Weekly show-and-tell with the design team"
            />
            <TeamPhoto
              src="/images/leadership/team-02.png"
              alt="Nine team members raising drinks on a video call"
              caption="End-of-year cocktail workshop with the team"
            />
          </div>

          <p className={`${typography.h4} text-p-text`}>
            I lead the product design team at Dig Insights. My philosophy is
            simple: do the work, listen first, and clear the path — the rest
            follows.
          </p>

          <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:gap-12">
            {PHILOSOPHY.map((column) => (
              <PhilosophyColumn
                key={column.title}
                title={column.title}
                body={column.body}
              />
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="flex min-w-0 flex-col gap-6">
          <SectionHeading>Day to day</SectionHeading>
          <div className="flex min-w-0 flex-col">
            {RESPONSIBILITIES.map((item) => (
              <div
                key={item.title}
                className="grid min-w-0 grid-cols-1 gap-1 border-b border-p-grey-10 py-5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[280px_1fr] sm:gap-8"
              >
                <p className={`${typography.bodyL} font-medium text-p-text`}>
                  {item.title}
                </p>
                <p className={`${typography.bodyL} text-p-grey-60`}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes from the team */}
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex min-w-0 flex-col gap-2">
            <SectionHeading>Notes from my team</SectionHeading>
            <p className={`${typography.bodyL} text-p-text`}>
              I could talk about my management style all day, but my team says
              it better. These are real notes from our retros and year-end
              reviews.
            </p>
          </div>

          <div className="columns-1 gap-6 sm:columns-2">
            {TEAM_NOTES.map((note) => (
              <figure
                key={note.name}
                className={`mb-6 break-inside-avoid rounded-[20px] p-6 sm:p-8 ${note.color}`}
              >
                <blockquote className={`${typography.bodyL} text-p-text`}>
                  {note.body}
                </blockquote>
                <figcaption
                  className={`mt-4 ${typography.h6} text-p-grey-60`}
                >
                  {note.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </PanelContent>
  );
}
