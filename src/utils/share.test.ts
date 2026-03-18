import { describe, expect, it, vi } from 'vitest'

import { sharePage } from './share'

describe('sharePage', () => {
  it('falls back to clipboard when Web Share is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)

    const result = await sharePage({
      share: undefined,
      clipboard: { writeText },
      payload: {
        title: 'Landing',
        text: 'Conheça o trabalho',
        url: 'https://example.com',
      },
    })

    expect(result).toBe('copied')
    expect(writeText).toHaveBeenCalledWith('https://example.com')
  })

  it('treats share cancellation as a neutral result', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('cancelled', 'AbortError'))

    const result = await sharePage({
      share,
      clipboard: { writeText: vi.fn() },
      payload: {
        title: 'Landing',
        text: 'Conheça o trabalho',
        url: 'https://example.com',
      },
    })

    expect(result).toBe('cancelled')
  })
})
