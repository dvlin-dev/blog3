import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

type ImgCardType = {
  url: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
  mdx?: boolean;
} & React.ComponentPropsWithoutRef<'figure'>;

export default function ImgCard({
  url,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  ...rest
}: ImgCardType) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded my-2 md:my-4 shadow dark:shadow-none':
          !noStyle,
        'mx-auto w-full': mdx && +width <= 800,
      })}
      style={{
        ...(mdx && +width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        className='img-blur'
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <div className='absolute left-0 top-0'>
          <Image
            width={+width}
            height={+height}
            src={url}
            alt={alt}
            title={title || alt}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
}
