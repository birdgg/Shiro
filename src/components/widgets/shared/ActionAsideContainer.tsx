'use client'

import { useViewport } from '~/atoms'
import { clsxm } from '~/lib/helper'
import { usePageScrollLocationSelector } from '~/providers/root/page-scroll-info-provider'
import { useIsEOWrappedElement } from '~/providers/shared/WrappedElementProvider'

export const ActionAsideContainer: Component = ({ className, children }) => {
  const isEOA = useIsEOWrappedElement()
  const h = useViewport((v) => v.h)

  const isEndOfPage = usePageScrollLocationSelector(
    (y) => {
      const threshold = 100

      return y + h >= document.body.scrollHeight - threshold
    },
    [h],
  )

  return (
    <div
      className={clsxm(
        'absolute bottom-0 left-0 -mb-4 max-h-[300px] flex-col space-y-8 p-4 transition-all duration-200 ease-in-out',
        !isEOA ? 'opacity-20 hover:opacity-100' : '',
        className,
        isEndOfPage && 'bottom-[100px]',
      )}
    >
      {children}
    </div>
  )
}
