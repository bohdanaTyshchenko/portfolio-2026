import Image from "next/image";
import { LinkRow } from "./LinkRow";

const IMG_PORTRAIT = "/images/figma/portrait.png";
const IMG_SPEAKING = "/images/figma/speaking.png";
const IMG_WORK = "/images/figma/work-preview.png";
const IMG_LEADERSHIP_GRAPHIC = "/images/figma/leadership-philosophy.svg";

export function HomePage() {
  return (
    <main className="h-dvh max-h-dvh overflow-hidden bg-p-white text-p-text">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-[1728px] grid-cols-1 grid-rows-6 lg:grid-cols-3 lg:grid-rows-2">
        {/* About */}
        <section className="flex h-full min-h-0 flex-col justify-between overflow-hidden bg-p-white p-3 sm:p-6 lg:p-8">
          <p className="shrink-0 font-medium text-xs uppercase leading-tight tracking-[-0.05em] text-p-grey-50 sm:text-base lg:text-2xl lg:leading-9 lg:tracking-[-0.72px]">
            About
          </p>
          <div className="flex min-h-0 flex-col justify-end gap-1 sm:gap-4 lg:gap-7">
            <h1 className="font-medium text-[0.65rem] uppercase leading-tight tracking-[-0.06em] text-p-text sm:text-lg md:text-2xl lg:text-[65px] lg:leading-[70px] lg:tracking-[-4px]">
              I&apos;m Bohdana,
              <br />a Product
              <br />
              Design Manager.
            </h1>
            <p className="max-w-md font-normal text-[0.6rem] leading-snug tracking-[-0.04em] text-p-grey-80 sm:text-xs md:text-sm lg:text-lg lg:leading-[29px] lg:tracking-[-0.72px]">
              Based in Toronto. I spend my days shipping products and building a
              culture where designers thrive. By night I create content that
              helps designers grow.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="relative flex h-full min-h-0 flex-col justify-end overflow-hidden bg-p-green p-3 sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(45%,16rem)] lg:block">
            <Image
              src={IMG_LEADERSHIP_GRAPHIC}
              alt=""
              fill
              unoptimized
              className="object-contain object-right object-top"
              sizes="(min-width: 1024px) 16rem, 0"
            />
          </div>
          <div className="relative flex min-h-0 max-w-md flex-col gap-1">
            <h2 className="font-medium text-xs uppercase leading-tight tracking-[-0.06em] text-p-grey-100 sm:text-base md:text-xl lg:text-[56px] lg:leading-[60px] lg:tracking-[-3.36px]">
              Leadership
              <br />
              philosophy
            </h2>
            <p className="max-w-sm font-normal text-[0.6rem] leading-snug tracking-[-0.04em] text-p-grey-60 sm:text-xs md:text-sm lg:text-lg lg:leading-[29px] lg:tracking-[-0.72px]">
              I lead by example, listen before I speak, and see my job as
              clearing the path — not having all the answers.
            </p>
          </div>
        </section>

        {/* Public speaking */}
        <section className="relative isolate flex h-full min-h-0 flex-col justify-between overflow-hidden bg-p-orange p-3 text-p-white sm:p-6 lg:p-8">
          <div className="absolute inset-0 -z-10">
            <Image
              src={IMG_SPEAKING}
              alt=""
              fill
              className="object-cover opacity-40 mix-blend-multiply"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>
          <h2 className="relative font-medium text-xs uppercase leading-tight tracking-[-0.06em] sm:text-base md:text-xl lg:text-[56px] lg:leading-[60px] lg:tracking-[-3.36px]">
            Public speaking
          </h2>
          <p className="relative max-w-lg font-medium text-[0.6rem] leading-snug tracking-[-0.04em] sm:text-xs md:text-base lg:text-2xl lg:leading-9 lg:tracking-[-0.72px]">
            A product design project focused on solving a real user problem. From
            research to release.
          </p>
        </section>

        {/* Portrait */}
        <section className="relative h-full min-h-0 overflow-hidden">
          <Image
            src={IMG_PORTRAIT}
            alt="Portrait"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
        </section>

        {/* My work */}
        <section className="relative flex h-full min-h-0 flex-col overflow-hidden bg-p-white px-3 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-10">
          <div
            className="pointer-events-none absolute left-[10%] top-[15%] size-8 rounded-full bg-p-pink/80 blur-[2px] sm:size-16 lg:size-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[12%] top-[8%] size-6 rounded-full bg-p-blue/90 sm:size-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[22%] left-[8%] size-5 rounded-full bg-p-orange/90 sm:size-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[30%] right-[18%] size-4 rounded-full bg-p-green/90 sm:size-14"
            aria-hidden
          />
          <div className="relative z-10 flex h-full min-h-0 w-full max-w-[450px] flex-col gap-1 self-center lg:gap-6">
            <div className="relative min-h-0 w-full flex-1">
              <div className="absolute inset-0 overflow-hidden rounded-lg border border-p-grey-10">
                <Image
                  src={IMG_WORK}
                  alt="Project preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-1 sm:gap-3 lg:gap-6">
              <h2 className="font-medium text-[0.65rem] uppercase leading-tight tracking-[-0.06em] text-black sm:text-lg md:text-3xl lg:text-[65px] lg:leading-[70px] lg:tracking-[-4px]">
                My work
              </h2>
              <p className="font-normal text-[0.6rem] leading-snug tracking-[-0.04em] text-p-grey-60 sm:text-xs md:text-sm lg:text-lg lg:leading-[29px] lg:tracking-[-0.72px]">
                A product design project focused on solving a real user problem.
                From research to release.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="flex h-full min-h-0 flex-col justify-end overflow-hidden bg-p-pink px-3 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
          <div className="flex min-h-0 flex-col justify-end gap-2 lg:gap-7">
            <div className="flex min-h-0 flex-col gap-2 lg:gap-7">
              <LinkRow href="https://instagram.com" label="Instagram" />
              <LinkRow href="https://tiktok.com" label="Tiktok" />
              <LinkRow href="https://linkedin.com" label="Linkedin" />
            </div>
            <div className="mt-1 flex flex-col gap-2 lg:mt-2 lg:gap-7">
              <LinkRow href="mailto:hello@example.com" label="Email" />
              <LinkRow href="/resume.pdf" label="resume" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
