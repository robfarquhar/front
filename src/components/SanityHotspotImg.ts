import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
// import { dataset, projectId } from "./sanityConfig"
import { isNil, join, map, pipe, split } from "ramda";

const client = sanityClient({
  dataset: process.env.GATSBY_SANITY_DATASET,
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  useCdn: true,
});

// const builder = imageUrlBuilder({ projectId, dataset })
const builder = imageUrlBuilder(client);
export const sanityImageSrc = (source: any) => builder.image(source);

export const getFluidImage = (
  rawImage: any,
  fluidImage: any
  // width: number,
  // height: number
) => {
  const url = sanityImageSrc(rawImage).url()!;

  const rect = new URL(url).searchParams.get("rect");

  const addRectToUrl = (rect: string | null) => (incomingUrl: string) => {
    if (isNil(rect)) return incomingUrl;

    const [url, size] = split(" ")(incomingUrl);
    return `${url}&rect=${rect} ${size}`;
  };
  const convertUrl = addRectToUrl(rect);

  const addRectToUrlSet = (rect: string | null) => (incomingUrl: string) =>
    isNil(rect)
      ? incomingUrl
      : pipe(split(","), map(convertUrl), join(","))(incomingUrl);
  const convertUrlSet = addRectToUrlSet(rect);

  return {
    ...fluidImage,
    src: convertUrl(fluidImage.src),
    srcSet: convertUrlSet(fluidImage.srcSet),
    srcSetWebp: convertUrlSet(fluidImage.srcSetWebp),
    srcWebp: convertUrl(fluidImage.srcWebp),
  };
};
