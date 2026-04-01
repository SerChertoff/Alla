export function openConsultationMailto(params: {
  to: string;
  name: string;
  phone: string;
  email?: string;
  preferredAt: Date;
  message?: string;
}): void {
  const dateStr = params.preferredAt.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const body = [
    `Запись на консультацию`,
    ``,
    `Имя: ${params.name}`,
    `Телефон: ${params.phone}`,
    params.email ? `Email: ${params.email}` : null,
    `Удобная дата: ${dateStr}`,
    params.message ? `\nКратко о ситуации:\n${params.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const href = `mailto:${params.to}?subject=${encodeURIComponent("Запись на консультацию — " + params.name)}&body=${encodeURIComponent(body)}`;
  window.location.assign(href);
}

export function openContactMailto(params: {
  to: string;
  name: string;
  email?: string;
  message: string;
}): void {
  const body = [
    `Сообщение с сайта`,
    ``,
    `Имя: ${params.name}`,
    params.email ? `Email: ${params.email}` : null,
    ``,
    params.message,
  ]
    .filter(Boolean)
    .join("\n");

  const href = `mailto:${params.to}?subject=${encodeURIComponent("Сообщение с сайта от " + params.name)}&body=${encodeURIComponent(body)}`;
  window.location.assign(href);
}
