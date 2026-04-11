/** Единое место для контактов и URL. При деплое задайте VITE_SITE_URL и при желании VITE_CONTACT_EMAIL в .env */
const trimSlash = (s: string) => s.replace(/\/$/, "");

export const siteUrl = trimSlash(
  import.meta.env.VITE_SITE_URL?.trim() || "https://gordienko.ru"
);

export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "office@alla-gordienko.ru";

export const site = {
  lawyerName: "Гордиенко Алла Владимировна",
  tagline: "Семейный юрист · Барнаул",
  phoneDisplay: "+7 (913) 247-88-11",
  phoneTel: "+79132478811",
  /** Для JSON-LD (schema.org) */
  phoneStructured: "+7-913-247-88-11",
  email: contactEmail,
  address: "г. Барнаул, ул. Деповская, 13-2",
  /** Для JSON-LD (schema.org), в одном месте с текстом адреса */
  postalAddress: {
    "@type": "PostalAddress" as const,
    streetAddress: "ул. Деповская, 13-2",
    addressLocality: "Барнаул",
    addressCountry: "RU",
  },
  telegram: "https://t.me/alla_gordienko_lawyer",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?text=%D0%91%D0%B0%D1%80%D0%BD%D0%B0%D1%83%D0%BB%2C%20%D1%83%D0%BB.%20%D0%94%D0%B5%D0%BF%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2C%2013-2&z=17",
} as const;
