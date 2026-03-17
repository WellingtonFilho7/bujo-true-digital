import { campaign } from '../config/campaign'

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-stone-200 bg-stone-900">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <p className="text-sm font-medium text-stone-100">{campaign.coupleName}</p>
          <p className="text-xs text-stone-500 mt-0.5">{campaign.location}</p>
        </div>

        <div className="flex flex-wrap gap-5 text-xs text-stone-500">
          <a
            href={`https://instagram.com/${campaign.instagram1}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-200 transition-colors"
          >
            @{campaign.instagram1}
          </a>
          <a
            href={`https://instagram.com/${campaign.instagram2}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-200 transition-colors"
          >
            @{campaign.instagram2}
          </a>
          <a
            href={`mailto:${campaign.email}`}
            className="hover:text-stone-200 transition-colors"
          >
            {campaign.email}
          </a>
        </div>

      </div>
    </footer>
  )
}
