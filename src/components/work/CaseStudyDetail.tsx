import Image from "next/image";
import { typography } from "@/lib/typography";
import type { CaseStudy } from "@/lib/types";

type CaseStudyDetailProps = {
  study: CaseStudy;
  placeholderColor?: "green" | "orange" | "pink" | "blue";
};

function SectionTitle({ children }: { children: string }) {
  return <h3 className={`${typography.h3} text-p-text`}>{children}</h3>;
}

function Subheading({ children }: { children: string }) {
  return <h5 className={`${typography.h5} text-p-text`}>{children}</h5>;
}

function BodyText({ children }: { children: string }) {
  return (
    <p className={`whitespace-pre-wrap ${typography.bodyL} text-p-text`}>
      {children}
    </p>
  );
}

function MetaLabel({ children }: { children: string }) {
  return (
    <p className={`${typography.bodyS} uppercase text-p-grey-50`}>{children}</p>
  );
}

function MetaValue({ children }: { children: string }) {
  return (
    <p className={`whitespace-pre-wrap ${typography.bodyL} text-p-text`}>
      {children}
    </p>
  );
}

function ImagePlaceholder({
  src,
  alt,
  caption,
  aspectClass = "aspect-[16/9]",
}: {
  src: string | null;
  alt: string;
  caption?: string;
  aspectClass?: string;
}) {
  return (
    <figure className="flex w-full flex-col gap-2">
      {src ? (
        <div className="w-full overflow-hidden rounded-[20px] bg-p-grey-10">
          <Image
            src={src}
            alt={alt}
            width={1685}
            height={948}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 900px"
            unoptimized
          />
        </div>
      ) : (
        <div
          className={`relative w-full overflow-hidden rounded-[20px] bg-p-grey-10 ${aspectClass}`}
        />
      )}
      {caption ? (
        <figcaption className={`${typography.bodyS} text-p-grey-60`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  const team = study.team ?? [];
  const tools = study.tools ?? [];
  const constraints = study.constraints ?? [];
  const features = study.features ?? [];
  const takeaway = study.takeaway ?? [];
  const research = study.research ?? {
    sections: [],
    key_user_stories: [],
  };
  const researchSections = research.sections ?? [];
  const stories = research.key_user_stories ?? [];
  const storiesLabel = research.key_user_stories_label ?? "Key user stories";
  const vision = study.vision;
  const visionSections = vision?.sections ?? [];
  const gallery = (study.gallery ?? []).filter(
    (src): src is string => Boolean(src),
  );

  return (
    <article className="flex w-full min-w-0 flex-col gap-16 lg:gap-[160px]">
      <div className="flex flex-col gap-8 sm:gap-10">
        <header className="flex flex-col gap-2 border-b border-p-grey-10 pb-5">
          <h1
            className={`${typography.h1} text-p-text max-sm:text-[40px] max-sm:leading-[46px]`}
          >
            {study.title}
          </h1>
          {study.company ? (
            <p className={`${typography.bodyL} text-p-grey-60`}>{study.company}</p>
          ) : null}
        </header>

        <section className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr] sm:gap-12 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col gap-8">
            {study.role ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>My role</MetaLabel>
                <MetaValue>{study.role}</MetaValue>
              </div>
            ) : null}
            {team.length > 0 ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>Team</MetaLabel>
                <ul className="flex flex-col gap-1">
                  {team.map((member) => (
                    <li key={member}>
                      <MetaValue>{member}</MetaValue>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {tools.length > 0 ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>Tools</MetaLabel>
                <MetaValue>{tools.join(", ")}</MetaValue>
              </div>
            ) : null}
            {study.timeline ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>Timeline</MetaLabel>
                <MetaValue>{study.timeline}</MetaValue>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-8">
            {study.description ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>Description</MetaLabel>
                <BodyText>{study.description}</BodyText>
              </div>
            ) : null}
            {study.context ? (
              <div className="flex flex-col gap-2">
                <MetaLabel>Context</MetaLabel>
                <BodyText>{study.context}</BodyText>
              </div>
            ) : null}
          </div>
        </section>

        {gallery.length > 0 ? (
          study.galleryLayout === "hero-split" && gallery.length >= 3 ? (
            <section className="flex w-full flex-col gap-4 sm:gap-6">
              <div className="w-full overflow-hidden rounded-[20px] bg-p-grey-10">
                <Image
                  src={gallery[0]!}
                  alt=""
                  width={3700}
                  height={332}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 1040px"
                  unoptimized
                />
              </div>
              <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-[minmax(0,561fr)_minmax(0,1232fr)] sm:gap-6">
                <div className="w-full overflow-hidden rounded-[20px] bg-p-grey-10">
                  <Image
                    src={gallery[1]!}
                    alt=""
                    width={1122}
                    height={1436}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 100vw, 360px"
                    unoptimized
                  />
                </div>
                <div className="w-full overflow-hidden rounded-[20px] bg-p-grey-10">
                  <Image
                    src={gallery[2]!}
                    alt=""
                    width={2464}
                    height={1436}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 100vw, 700px"
                    unoptimized
                  />
                </div>
              </div>
            </section>
          ) : (
            <section
              className={
                gallery.length === 1
                  ? "grid grid-cols-1"
                  : "grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
              }
            >
              {gallery.map((src, index) => (
                <div
                  key={`gallery-${index}`}
                  className={`relative w-full overflow-hidden rounded-[20px] bg-p-grey-10 ${
                    gallery.length === 1
                      ? "aspect-[16/9]"
                      : "aspect-[4/5] sm:aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes={
                      gallery.length === 1
                        ? "(max-width: 1024px) 100vw, 1040px"
                        : "(max-width: 640px) 100vw, 300px"
                    }
                    unoptimized
                  />
                </div>
              ))}
            </section>
          )
        ) : null}
      </div>

      {study.challenge ? (
        <section className="flex flex-col gap-2">
          <SectionTitle>Challenge</SectionTitle>
          <BodyText>{study.challenge}</BodyText>
        </section>
      ) : null}

      {study.makingTheCase ? (
        <section className="flex flex-col gap-2">
          <SectionTitle>Making the Case</SectionTitle>
          <BodyText>{study.makingTheCase}</BodyText>
        </section>
      ) : null}

      {constraints.length > 0 ? (
        <section className="flex flex-col gap-4">
          <SectionTitle>Constraints</SectionTitle>
          <div className="flex flex-col gap-4">
            {constraints.map((paragraph) => (
              <BodyText key={paragraph}>{paragraph}</BodyText>
            ))}
          </div>
        </section>
      ) : null}

      {study.approach || (study.approachSections?.length ?? 0) > 0 ? (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <SectionTitle>Approach</SectionTitle>
            {study.approach ? <BodyText>{study.approach}</BodyText> : null}
          </div>
          {(study.approachSections ?? []).map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <Subheading>{section.title}</Subheading>
              <BodyText>{section.body}</BodyText>
            </div>
          ))}
        </section>
      ) : null}

      {researchSections.length > 0 || stories.length > 0 ? (
        <section className="flex flex-col gap-8">
          <SectionTitle>Research</SectionTitle>

          {researchSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <Subheading>{section.title}</Subheading>
              <BodyText>{section.body}</BodyText>
            </div>
          ))}

          {stories.length > 0 ? (
            <div className="flex flex-col gap-2">
              <Subheading>{storiesLabel}</Subheading>
              <ul className="flex flex-col gap-2">
                {stories.map((story) => (
                  <li
                    key={story}
                    className={`italic ${typography.bodyL} text-p-grey-60`}
                  >
                    {story}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {vision && (vision.intro || visionSections.length > 0) ? (
        <section className="flex flex-col gap-8">
          <SectionTitle>Defining the Vision</SectionTitle>
          {vision.intro ? <BodyText>{vision.intro}</BodyText> : null}
          {visionSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <Subheading>{section.title}</Subheading>
              <BodyText>{section.body}</BodyText>
            </div>
          ))}
        </section>
      ) : null}

      {features.length > 0 ? (
        <section className="flex flex-col gap-4 sm:gap-5">
          <SectionTitle>Key features</SectionTitle>

          <div className="flex flex-col gap-12 sm:gap-14">
            {features.map((feature) => {
              const images =
                feature.images?.filter(Boolean) ??
                (feature.image_url ? [feature.image_url] : []);

              return (
                <div key={feature.title} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Subheading>{feature.title}</Subheading>
                    <BodyText>{feature.body}</BodyText>
                  </div>
                  {images.length > 1 ? (
                    feature.imagesLayout === "stack" ? (
                      <div className="flex w-full flex-col gap-4 sm:gap-6">
                        {images.map((src, index) => (
                          <figure
                            key={src}
                            className="flex w-full flex-col gap-2"
                          >
                            <div className="w-full overflow-hidden rounded-[20px] bg-p-grey-10">
                              <Image
                                src={src}
                                alt={feature.imageCaptions?.[index] ?? ""}
                                width={4106}
                                height={2310}
                                className="h-auto w-full"
                                sizes="(max-width: 1024px) 100vw, 900px"
                                unoptimized
                              />
                            </div>
                            {feature.imageCaptions?.[index] ? (
                              <figcaption
                                className={`${typography.bodyS} text-p-grey-60`}
                              >
                                {feature.imageCaptions[index]}
                              </figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <figure className="flex w-full flex-col gap-2">
                        {feature.imagesLayout === "aside-stack" ? (
                          images.length === 2 ? (
                            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[minmax(0,561fr)_minmax(0,1394fr)] sm:gap-5">
                              {images.map((src) => (
                                <div
                                  key={src}
                                  className="w-full overflow-hidden rounded-[20px] bg-p-grey-10"
                                >
                                  <Image
                                    src={src}
                                    alt=""
                                    width={5620}
                                    height={2024}
                                    className="h-auto w-full"
                                    sizes="(max-width: 640px) 100vw, 700px"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[minmax(0,561fr)_minmax(0,1405fr)] sm:grid-rows-[auto_auto] sm:gap-5">
                              <div className="relative aspect-[561/948] w-full overflow-hidden rounded-[20px] bg-p-grey-10 sm:row-span-2 sm:aspect-auto sm:h-full sm:min-h-0">
                                <Image
                                  src={images[0]!}
                                  alt=""
                                  fill
                                  className="object-cover object-top"
                                  sizes="(max-width: 640px) 100vw, 320px"
                                  unoptimized
                                />
                              </div>
                              {images.slice(1).map((src) => (
                                <div
                                  key={src}
                                  className="w-full overflow-hidden rounded-[20px] bg-p-grey-10"
                                >
                                  <Image
                                    src={src}
                                    alt=""
                                    width={5620}
                                    height={2024}
                                    className="h-auto w-full"
                                    sizes="(max-width: 640px) 100vw, 700px"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )
                        ) : (
                          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3 sm:gap-6">
                            {images.map((src) => (
                              <div
                                key={src}
                                className="relative aspect-[561/948] w-full overflow-hidden rounded-[20px] bg-p-grey-10"
                              >
                                <Image
                                  src={src}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, 320px"
                                  unoptimized
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {feature.caption ? (
                          <figcaption
                            className={`${typography.bodyS} text-p-grey-60`}
                          >
                            {feature.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    )
                  ) : (
                    <ImagePlaceholder
                      src={images[0] ?? null}
                      alt={feature.title}
                      caption={feature.caption}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {takeaway.length > 0 ? (
        <section className="flex flex-col gap-4 pb-8">
          <SectionTitle>Takeaway & reflection</SectionTitle>
          <div className="flex flex-col gap-4">
            {takeaway.map((paragraph) => (
              <BodyText key={paragraph}>{paragraph}</BodyText>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
