import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from 'react'
import type { Img } from '@/content/projects'

export const srcSet = (img: Pick<Img, 'src' | 'widths'>, ext: 'avif' | 'webp') =>
  img.widths.map((w) => `${img.src}-${w}.${ext} ${w}w`).join(', ')

export const fallbackSrc = (img: Pick<Img, 'src' | 'widths'>, target = 1440) => {
  const w = img.widths.find((x) => x >= target) ?? img.widths[img.widths.length - 1]
  return `${img.src}-${w}.webp`
}

type Props = {
  img: Img
  sizes: string
  priority?: boolean
  alt?: string
  className?: string
  imgClassName?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'alt' | 'style'>

/** Manifest-driven <picture>: AVIF + WebP, intrinsic size from the manifest (no CLS). */
export const Picture = forwardRef<HTMLImageElement, Props>(function Picture(
  { img, sizes, priority, alt, className, imgClassName, style, imgStyle, ...rest },
  ref,
) {
  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={srcSet(img, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(img, 'webp')} sizes={sizes} />
      <img
        ref={ref}
        src={fallbackSrc(img)}
        width={img.w}
        height={img.h}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={imgClassName}
        style={imgStyle}
        draggable={false}
        {...rest}
      />
    </picture>
  )
})
