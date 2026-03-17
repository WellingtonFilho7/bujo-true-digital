import { campaign } from '../config/campaign'
import { family } from '../content/family'

export function Footer() {
  return (
    <footer className="bg-ink py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="font-serif text-lg font-semibold text-white">{campaign.coupleName}</p>
            <p className="text-sm text-stone-400 mt-0.5">{campaign.location}</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-stone-400">
            <a
              href={`https://instagram.com/${campaign.instagram1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @{campaign.instagram1}
            </a>
            <a
              href={`https://instagram.com/${campaign.instagram2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @{campaign.instagram2}
            </a>
            <a
              href={`mailto:${campaign.email}`}
              className="hover:text-white transition-colors"
            >
              {campaign.email}
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8">
          <p className="text-stone-500 text-[15px]">{family.closing}</p>
          <p className="text-stone-400 text-[15px] mt-1 italic">{family.signature}</p>
        </div>

      </div>
    </footer>
  )
}
