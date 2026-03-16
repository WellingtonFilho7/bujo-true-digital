import { campaign } from '../config/campaign'

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-stone-100">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-stone-400">

        <div>
          <p className="text-stone-600">{campaign.coupleName}</p>
          <p className="text-xs mt-0.5">{campaign.location}</p>
        </div>

        <div className="flex flex-wrap gap-5 text-xs">
          <a
            href={`https://instagram.com/${campaign.instagram1}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-600 transition-colors"
          >
            @{campaign.instagram1}
          </a>
          <a
            href={`https://instagram.com/${campaign.instagram2}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-600 transition-colors"
          >
            @{campaign.instagram2}
          </a>
          <a
            href={`mailto:${campaign.email}`}
            className="hover:text-stone-600 transition-colors"
          >
            {campaign.email}
          </a>
        </div>

      </div>
    </footer>
  )
}
