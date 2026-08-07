import Image from "next/image";
import { PanelContent } from "@/components/work/PanelContent";
import { typography } from "@/lib/typography";

type PublicSpeakingContentProps = {
  onClose: () => void;
};

const ENGAGEMENTS = [
  {
    event: "Spark Design Conference",
    host: "UW/UX Club · University of Waterloo",
    role: "Speaker",
    body: "Gave a talk on personal brand as a product designer — why it matters, and how to build one step by step.",
  },
  {
    event: "Design Hackathon",
    host: "Western University",
    role: "Speaker",
    body: "Spoke to hackathon teams with “Design Is Not Just UI: What Product Designers Really Do” — an honest look at the parts of the job no one puts in the job description.",
  },
  {
    event: "Design Workshop",
    host: "York University",
    role: "Workshop host",
    body: "Ran a workshop for design students on building a personal brand as a product designer — practical steps over vague advice.",
  },
  {
    event: "Designathon",
    host: "UW/UX Club · University of Waterloo",
    role: "Judge",
    body: "Invited back by UW/UX to judge student work — reviewing projects and giving every team honest, practical feedback.",
  },
] as const;

const EVENT_MOMENTS = [
  {
    src: "/images/speaking/spark-01.png",
    alt: "Bohdana wearing her Spark Design Conference speaker badge",
  },
  {
    src: "/images/speaking/western-01.png",
    alt: "Laptop with presentation slides in a hall full of hackathon participants",
  },
  {
    src: "/images/speaking/judge-01.png",
    alt: "Judge badge and a thank-you envelope at the judges' table",
  },
  {
    src: "/images/speaking/spark-02.png",
    alt: "Presentation screens showing the talk “Design Is Not Just UI: What Product Designers Really Do”",
  },
  {
    src: "/images/speaking/judge-02.png",
    alt: "Bohdana holding her event badge in a mirror selfie",
  },
  {
    src: "/images/speaking/york-01.png",
    alt: "A flower and thank-you card next to a microphone",
  },
] as const;

function SectionHeading({ children }: { children: string }) {
  return <h5 className={`${typography.h5} text-p-text`}>{children}</h5>;
}

function EventPhoto({
  src,
  alt,
  caption,
  aspectClass = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div
        className={`relative w-full overflow-hidden rounded-[20px] bg-p-grey-5 ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 508px"
        />
      </div>
      {caption ? (
        <figcaption className={`${typography.bodyS} text-p-grey-60`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function PublicSpeakingContent({ onClose }: PublicSpeakingContentProps) {
  return (
    <PanelContent
      title="Talks, podcasts, and design events"
      onClose={onClose}
      headerClassName="pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
      contentClassName="pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 lg:pt-[150px]"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1040px] flex-col gap-16 lg:gap-[160px]">
        <p className={`${typography.h4} text-p-text`}>
          I love being where designers gather — on stage, on a panel, at a
          judges&apos; table, or on a picnic blanket. Sometimes I&apos;m the one
          speaking, and sometimes I&apos;m the one bringing everyone together.
        </p>

        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex min-w-0 flex-col gap-2">
            <SectionHeading>Events I organize</SectionHeading>
            <p className={`${typography.bodyL} text-p-text`}>
              I run design picnics in Toronto — casual, no-agenda meetups where
              designers can actually talk to each other instead of networking
              at each other. The most recent one had more than 140 sign-ups,
              and people had a blast. Good conversations, good snacks, and a
              lot of new friendships that started on a blanket in the park.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
            <EventPhoto
              src="/images/speaking/picnic-01.png"
              alt="A large group of designers posing together at a park picnic in Toronto"
              aspectClass="aspect-[4/3]"
            />
            <EventPhoto
              src="/images/speaking/picnic-02.png"
              alt="A group of designers gathered around picnic blankets in a Toronto park"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex min-w-0 flex-col gap-2">
            <SectionHeading>Where I&apos;ve been invited</SectionHeading>
            <p className={`${typography.bodyL} text-p-text`}>
              Universities and design communities have invited me to speak, run
              workshops, and judge student work. I always aim for the same
              thing: real talk over polished theory — the stuff I wish someone
              had told me earlier.
            </p>
          </div>

          <div className="flex min-w-0 flex-col">
            {ENGAGEMENTS.map((item) => (
              <div
                key={`${item.event}-${item.role}`}
                className="grid min-w-0 grid-cols-1 gap-1 border-b border-p-grey-10 py-5 first:pt-0 last:border-b-0 sm:grid-cols-[280px_1fr] sm:gap-8"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <p className={`${typography.bodyL} font-medium text-p-text`}>
                    {item.event}
                  </p>
                  <p className={`${typography.bodyS} text-p-grey-60`}>
                    {item.host} · {item.role}
                  </p>
                </div>
                <p className={`${typography.bodyL} text-p-grey-60`}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {EVENT_MOMENTS.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[277/259] w-full overflow-hidden rounded-[20px] bg-p-grey-5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 340px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <SectionHeading>Want me at your event?</SectionHeading>
          <p className={`${typography.bodyL} text-p-text`}>
            I talk about product design, design leadership, how to break into
            the field, growing a career without burning out, and building an
            audience as a designer. If you&apos;d like me on your stage, panel,
            or podcast —{" "}
            <a
              href="mailto:hello@bohdana.design"
              className="underline decoration-p-grey-20 underline-offset-2 transition-opacity hover:opacity-70"
            >
              send me a note
            </a>
            .
          </p>
        </div>
      </div>
    </PanelContent>
  );
}
