import React, { useEffect, useMemo, useState } from "react";
import { buildAssetUrl } from "../../utils/helper/asset.helper";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  fallbackSrc?: string;
};

export const Image = ({
  src,
  fallbackSrc = "/no-image.png",
  ...rest
}: Props) => {
  const [error, setError] = useState<boolean>(false);
  const { onError, ...imgProps } = rest;

  useEffect(() => {
    setError(false);
  }, [src]);

  const finalSrc = useMemo(() => {
    if (!src) return fallbackSrc;
    return buildAssetUrl(src);
  }, [src, fallbackSrc]);

  return (
    <img
      {...imgProps}
      src={error ? fallbackSrc : finalSrc}
      onError={() => {
        setError(true);
      }}
    />
  );
};
