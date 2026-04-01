/** Единое место для контактов и URL. При деплое задайте VITE_SITE_URL и при желании VITE_CONTACT_EMAIL в .env */
const trimSlash = (s: string) => s.replace(/\/$/, "");

export const siteUrl = trimSlash(
  import.meta.env.VITE_SITE_URL?.trim() || "https://gordienko.ru"
);

export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "office@alla-ivanova.ru";

export const site = {
  lawyerName: "Гордиенко Алла Владимировна",
  tagline: "Семейный юрист · Барнаул",
  phoneDisplay: "+7 (906) 960-83-55",
  phoneTel: "+79069608355",
  /** Для JSON-LD (schema.org) */
  phoneStructured: "+7-906-960-83-55",
  email: contactEmail,
  address: "г. Барнаул, ул. Деповская, 13-2",
  /** Для JSON-LD (schema.org), в одном месте с текстом адреса */
  postalAddress: {
    "@type": "PostalAddress" as const,
    streetAddress: "ул. Деповская, 13-2",
    addressLocality: "Барнаул",
    addressCountry: "RU",
  },
  telegram: "https://t.me/alla_ivanova_lawyer",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=83.72%2C53.32%2C83.82%2C53.38&layer=mapnik",
} as const;
