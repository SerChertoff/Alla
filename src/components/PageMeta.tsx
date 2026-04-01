import { Helmet } from "react-helmet-async";
import { siteUrl } from "@/config/site";

type PageMetaProps = {
  title: string;
  description: string;
  path?: string;
};

export function PageMeta({ title, description, path = "/" }: PageMetaProps) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
