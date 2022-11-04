import './stylesheets/LoadingStyles.css';

import { useEffect, useState } from "react";

function ProgressiveImage({
    loadingIconSrc,
    src,
    imgClass,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(loadingIconSrc);
    useEffect(() => {
        setImgSrc(loadingIconSrc)
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src])
    const loadingClass = loadingIconSrc && imgSrc === loadingIconSrc ? "loading" : "loaded";

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            className={`${imgClass} ${loadingClass}`}
            style={{ filter: `${imgSrc.includes('images') ? 'drop-shadow(0.5em 0em 0.5em rgba(0, 0, 0, 0.48))' : 'none'}` }}
        />
    )
}

export default ProgressiveImage;