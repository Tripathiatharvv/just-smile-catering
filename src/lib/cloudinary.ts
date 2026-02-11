export const getCloudinaryUrl = (
    url: string,
    options: {
        width?: number;
        height?: number;
        quality?: number | "auto";
        format?: "auto" | "webp" | "avif" | "jpg";
        crop?: "fill" | "scale" | "fit" | "thumb";
        gravity?: string;
    } = {}
) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;
    const [base, assetPath] = parts;
    const transformations: string[] = [];
    transformations.push(`f_${options.format || "auto"}`);
    transformations.push(`q_${options.quality || "auto"}`);
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.gravity) transformations.push(`g_${options.gravity}`);
    return `${base}/upload/${transformations.join(",")}/${assetPath}`;
};
export const getCloudinaryVideoUrl = (
    url: string,
    options: {
        width?: number;
        quality?: number | "auto";
        format?: "auto" | "webm" | "mp4";
    } = {}
) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;
    const [base, assetPath] = parts;
    const transformations: string[] = [];
    transformations.push(`f_${options.format || "auto"}`);
    transformations.push(`q_${options.quality || "auto"}`);
    if (options.width) transformations.push(`w_${options.width}`);
    return `${base}/upload/${transformations.join(",")}/${assetPath}`;
};
