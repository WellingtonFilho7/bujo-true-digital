import type { FooterContent } from '../content/site'

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-ink py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-2xl font-semibold">{content.title}</p>
            <p className="mt-2 text-sm text-stone-400">{content.location}</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-300">
            {content.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-stone-800 pt-8">
          <p className="text-pretty text-[15px] text-stone-400">{content.closing}</p>
          <p className="mt-2 text-[15px] text-stone-300">{content.signature}</p>
        </div>
      </div>
    </footer>
  )
}
