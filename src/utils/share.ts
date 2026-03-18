export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'unavailable'

export type SharePayload = {
  title: string
  text: string
  url: string
}

type ShareOptions = {
  share?: (data: ShareData) => Promise<void>
  clipboard?: {
    writeText: (value: string) => Promise<void>
  }
  payload: SharePayload
}

export async function copyText(
  value: string,
  clipboard: ShareOptions['clipboard'] = navigator.clipboard,
): Promise<boolean> {
  if (!clipboard) return false

  try {
    await clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}

export async function sharePage({
  share = navigator.share?.bind(navigator),
  clipboard = navigator.clipboard,
  payload,
}: ShareOptions): Promise<ShareResult> {
  if (share) {
    try {
      await share(payload)
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled'
      }
    }
  }

  return (await copyText(payload.url, clipboard)) ? 'copied' : 'unavailable'
}
