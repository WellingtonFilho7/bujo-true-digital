import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

import type { SupportContent } from '../content/site'
import { pixPayload } from '../utils/pix'
import type { SharePayload } from '../utils/share'
import { copyText, sharePage } from '../utils/share'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

function resetAfter(delay: number, callback: () => void) {
  window.setTimeout(callback, delay)
}

export function SupportSection({
  content,
  sharePayload,
}: {
  content: SupportContent
  sharePayload: SharePayload
}) {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle')
  const [shareState, setShareState] = useState<'idle' | 'success' | 'error'>('idle')
  const qr = pixPayload(content.pixKey, content.pixName)

  async function handleCopyKey() {
    const copied = await copyText(content.pixKey)

    if (!copied) {
      setCopyState('error')
      resetAfter(2200, () => setCopyState('idle'))
      return
    }

    setCopyState('success')
    resetAfter(2200, () => setCopyState('idle'))
  }

  async function handleShare() {
    const result = await sharePage({ payload: sharePayload })

    if (result === 'cancelled' || result === 'shared') {
      return
    }

    if (result === 'copied') {
      setShareState('success')
      resetAfter(2200, () => setShareState('idle'))
      return
    }

    setShareState('error')
    resetAfter(2200, () => setShareState('idle'))
  }

  return (
    <section id="como-ajudar" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm text-stone-500">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-stone-900 md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-7 text-stone-600 md:text-base">
            {content.intro}
          </p>
          <p className="mt-4 max-w-3xl text-pretty text-sm leading-7 text-stone-500 md:text-[15px]">
            {content.impact}
          </p>
        </div>

        <div className="mt-10 rounded-[32px] bg-ink p-8 text-white shadow-sm md:p-12">
          <p className="text-sm text-stone-400">{content.pixLabel}</p>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="rounded-[24px] bg-white p-4">
              <QRCodeSVG value={qr} size={180} level="M" bgColor="#FAF8F5" fgColor="#1C1917" />
            </div>

            <div className="max-w-xl">
              <p className="text-sm text-stone-400">{content.pixKeyLabel}</p>
              <p className="mt-2 font-serif text-3xl font-semibold text-white">{content.pixKey}</p>
              <p className="mt-2 text-sm text-stone-300">{content.pixName}</p>

              <button
                type="button"
                onClick={handleCopyKey}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-100"
              >
                {copyState === 'success' ? content.copiedLabel : content.copyLabel}
              </button>
              {copyState === 'error' ? (
                <p className="mt-3 text-sm text-stone-300">{content.copyErrorMessage}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm">
            <p className="text-sm text-stone-500">{content.whatsapp.title}</p>
            <p className="mt-3 text-pretty text-[15px] leading-7 text-stone-600">
              {content.whatsapp.body}
            </p>
            <a
              href={content.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stone-900 px-5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
            >
              <WhatsAppIcon />
              {content.whatsapp.label}
            </a>
          </article>

          <article className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm">
            <p className="text-sm text-stone-500">{content.share.title}</p>
            <p className="mt-3 text-pretty text-[15px] leading-7 text-stone-600">
              {content.share.body}
            </p>
            <button
              type="button"
              onClick={handleShare}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stone-900 px-5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
            >
              <ShareIcon />
              {shareState === 'success'
                ? content.share.copiedLabel
                : shareState === 'error'
                  ? content.share.errorLabel
                  : content.share.label}
            </button>
            {shareState === 'error' ? (
              <p className="mt-3 text-sm text-stone-500">{content.share.errorMessage}</p>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  )
}
