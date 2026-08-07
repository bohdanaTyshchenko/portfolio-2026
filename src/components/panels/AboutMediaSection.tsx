"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { typography } from "@/lib/typography";
import { AboutKanban } from "./AboutKanban";
import { TorontoMapWidget, TORONTO_MAP_LINK } from "./TorontoMapWidget";

/** Figma split: 578px left / 435px right within a 1040px content row. */
const MEDIA_GRID =
  "grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[578fr_435fr] lg:gap-x-[27px] lg:gap-y-8";

function PhotoCaption({
  children,
  className = "",
}: {
  children: import("react").ReactNode;
  className?: string;
}) {
  return (
    <p className={`${typography.bodyS} text-p-grey-60 ${className}`.trim()}>
      {children}
    </p>
  );
}

type GallerySlide = {
  src: string;
  alt: string;
  objectPosition?: string;
};

function AboutGallery({
  slides,
  label,
  className = "",
}: {
  slides: GallerySlide[];
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  return (
    <div
      role="group"
      aria-label={label}
      aria-roledescription="carousel"
      className={`group/gallery relative w-full overflow-hidden rounded-[20px] bg-p-grey-5 ${className}`.trim()}
    >
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          fill
          unoptimized
          className={`object-cover transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
          style={
            slide.objectPosition
              ? { objectPosition: slide.objectPosition }
              : undefined
          }
          sizes="(max-width: 1024px) 100vw, 50vw"
          aria-hidden={index !== active}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/gallery:opacity-100 group-has-[:focus-visible]/gallery:opacity-100">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to photo ${index + 1} of ${slides.length} in ${label}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
            className="pointer-events-auto cursor-pointer p-1.5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-p-white"
          >
            <span
              className={`block size-2.5 rounded-full transition-[background-color,transform] duration-300 ${
                index === active
                  ? "scale-110 bg-p-white"
                  : "bg-p-white/50 hover:bg-p-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const FILM_SLIDES: GallerySlide[] = [
  {
    src: "/images/about/film-shots.png",
    alt: "Favorite film photography shots",
  },
  {
    src: "/images/about/film/film-01.png",
    alt: "Person standing at a round window overlooking city towers",
  },
  {
    src: "/images/about/film/film-02.png",
    alt: "Striped building facade against the sky, framed by branches",
  },
  {
    src: "/images/about/film/film-03.png",
    alt: "Three people sitting on a rooftop under a clear blue sky",
  },
  {
    src: "/images/about/film/film-04.png",
    alt: "Bicycles leaning against a wall in front of a bamboo grove",
  },
  {
    src: "/images/about/film/film-05.png",
    alt: "Path through rows of orange torii gates",
  },
  {
    src: "/images/about/film/film-06.png",
    alt: "Moss-covered stone statues packed together on a hillside",
  },
];

const LIFE_SLIDES: GallerySlide[] = [
  {
    src: "/images/about/life-photo.png",
    alt: "CN Tower at sunset",
    objectPosition: "50% 35%",
  },
  {
    src: "/images/about/life/life-02.png",
    alt: "Posing in a kimono with an origami crane overhead",
  },
  {
    src: "/images/about/life/life-03.png",
    alt: "Smoked salmon and caviar toasts in takeout boxes",
  },
  {
    src: "/images/about/life/life-04.png",
    alt: "Iced matcha drinks and a pastry at a cafe",
  },
  {
    src: "/images/about/life/life-05.png",
    alt: "Standing next to a cactus on a sunny sidewalk",
  },
  {
    src: "/images/about/life/life-06.png",
    alt: "Exploring a workshop full of white plaster statues",
  },
  {
    src: "/images/about/life/life-07.png",
    alt: "Red dress against pink and purple walls under a jacaranda tree",
  },
];

export function AboutMediaSection() {
  return (
    <div className={MEDIA_GRID}>
      <div className="flex min-w-0 flex-col gap-6 lg:col-start-1 lg:row-start-1">
        <div className="flex min-w-0 flex-col gap-2">
          <TorontoMapWidget />
          <PhotoCaption>
            A{" "}
            <a
              href={TORONTO_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-p-grey-20 underline-offset-2 transition-opacity hover:opacity-70"
            >
              map of favourite food and drink spots
            </a>{" "}
            in Toronto, by me and my friend
          </PhotoCaption>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
          <div className="flex min-w-0 flex-col gap-2">
            <AboutGallery
              slides={FILM_SLIDES}
              label="Film shots gallery"
              className="aspect-[277/259]"
            />
            <div className="flex min-w-0 items-start justify-between gap-3">
              <PhotoCaption>Favourite film shots</PhotoCaption>
              <PhotoCaption className="shrink-0 text-right">
                <a
                  href="https://www.instagram.com/bohdana.film/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-p-grey-20 underline-offset-2 transition-opacity hover:opacity-70"
                >
                  @bohdana.film
                </a>
              </PhotoCaption>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <AboutGallery
              slides={LIFE_SLIDES}
              label="Life photos gallery"
              className="aspect-[277/259]"
            />
            <PhotoCaption>Bits of everyday life</PhotoCaption>
          </div>
        </div>
      </div>

      <div className="group/ig relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] bg-p-grey-5 p-6 sm:p-8 lg:col-start-2 lg:row-start-1">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="relative z-[1] flex min-w-0 gap-2">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-[10px] sm:size-16">
                <Image
                  src="/images/about/avatar.png"
                  alt="Bohdana profile photo"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-between">
                <p className={`${typography.h4} text-p-text`}>BOHDANA</p>
                <p className={`${typography.bodyL} text-p-grey-60`}>
                  @the.bohdana
                </p>
              </div>
            </div>
            <div className="relative size-14 shrink-0 sm:size-16">
              {/* Marco-style fill: circle grows from the logo to flood the card on hover */}
              <span
                aria-hidden
                className="absolute inset-0 z-0 scale-0 rounded-full bg-p-pink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/ig:scale-[40] group-hover/ig:duration-[1100ms] group-hover/ig:ease-[cubic-bezier(0.45,0.05,0.15,1)]"
              />
              <Image
                src="/images/about/instagram-logo.png"
                alt=""
                fill
                unoptimized
                className="z-[1] object-contain"
                sizes="64px"
                aria-hidden
              />
            </div>
          </div>

          <p className={`relative z-[1] ${typography.bodyL} text-p-text`}>
            I make design content — career advice, resources, and the things I
            wish someone had told me earlier. If that sounds useful, come say
            hi.
          </p>
        </div>

        <Link
          href="https://www.instagram.com/the.bohdana?igsh=am0zOGx2aWVyMHZ3&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-[1] mt-6 flex w-full min-w-0 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-p-grey-20 px-2 py-4 ${typography.h5} normal-case text-p-text transition-[border-color,background-color,box-shadow] duration-300 hover:border-transparent hover:bg-p-white hover:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)] group-hover/ig:border-p-text/20 hover:group-hover/ig:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text`}
        >
          Let&apos;s be friends
          <MaterialIcon name="arrow_outward" size={24} />
        </Link>
      </div>

      <p
        className={`min-w-0 ${typography.bodyL} text-p-text lg:col-start-1 lg:row-start-2`}
      >
        Outside of work: 25+ countries so far, and a film camera that comes
        along to most of them — I like that it forces me to slow down. I also
        host events for designers in Toronto, because the best career
        conversations still happen in person.
      </p>

      <p
        className={`min-w-0 ${typography.bodyL} text-p-text lg:col-start-2 lg:row-start-2`}
      >
        I&apos;ve been making content since I was 12. Once I started talking
        about design and the career side of it, it grew into a community —
        25K on TikTok and 16K on Instagram, mostly designers comparing notes
        and asking honest questions.
      </p>
    </div>
  );
}

export function AboutKanbanSection() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <AboutKanban />
      <PhotoCaption>
        Go ahead, drag them around. Finishing the board comes with a small
        reward.
      </PhotoCaption>

      <p className={`mt-6 min-w-0 ${typography.bodyL} text-p-text`}>
        My week runs on a board like this — work, content, travel, life
        admin. If it&apos;s not written down, it doesn&apos;t happen. I like
        small, concrete tasks over big vague ones, and I&apos;d rather finish
        three things than start ten. The same applies to how I design: scope
        it down, ship it, then make it better.
      </p>
    </div>
  );
}
