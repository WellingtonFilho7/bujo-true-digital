import type { HeroContent } from '../content/site'

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden bg-ink text-white">
      <picture className="absolute inset-0">
        {content.image.mobileSrc ? (
          <source media="(max-width: 767px)" srcSet={content.image.mobileSrc} />
        ) : null}
        <img
          src={content.image.src}
          alt={content.image.alt}
          width={content.image.width}
          height={content.image.height}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-dvh max-w-6xl items-end px-6 pb-16 pt-28 md:pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm text-white/70">{content.eyebrow}</p>
          <h1 className="max-w-2xl text-balance font-serif text-5xl leading-tight font-semibold md:text-7xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/84 md:text-lg">
            {content.mission}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={content.primaryAction.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-[#934722]"
            >
              {content.primaryAction.label}
            </a>
            <a
              href={content.secondaryAction.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-5 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/8"
            >
              {content.secondaryAction.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
