import './stylesheets/LoadingStyles.css';

import React, { useEffect, useState } from "react";

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

    const isLoading = loadingIconSrc && imgSrc === loadingIconSrc;
    const loadingClass = loadingIconSrc && imgSrc === loadingIconSrc ? "loading" : "loaded";
    const WrapComponent = isLoading ? 'div' : React.Fragment;

    return (
        <WrapComponent>
            <img
                {...{ src: imgSrc, ...props }}
                alt={props.alt || ""}
                className={`${imgClass} ${loadingClass} ${imgSrc.includes('images') ? 'drop-shadow' : ''}`}
            />
        </WrapComponent>
    )
}

export default ProgressiveImage;