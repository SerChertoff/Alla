type LawyerPortraitProps = {
  variant?: "hero" | "about";
  className?: string;
};

/** Декоративный портрет без внешних изображений; при появлении фото замените содержимое на <img>. */
export function LawyerPortrait({ variant = "hero", className = "" }: LawyerPortraitProps) {
  const isHero = variant === "hero";
  return (
    <div
      className={[
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border shadow-2xl",
        isHero
          ? "aspect-[4/5] max-w-sm border-white/20 bg-white/10 backdrop-blur"
          : "aspect-[4/5] border-sand-200 bg-gradient-to-br from-brand/10 via-white to-sand-100",
        className,
      ].join(" ")}
      aria-hidden
    >
      <svg
        className={isHero ? "h-[85%] w-[85%] text-white/90" : "h-[80%] w-[80%] text-brand/35"}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="210" rx="70" ry="12" fill="currentColor" opacity={isHero ? 0.15 : 0.2} />
        <path
          d="M100 28c-22 0-40 18-40 40v6c0 22 18 40 40 40s40-18 40-40v-6c0-22-18-40-40-40z"
          fill="currentColor"
          opacity={isHero ? 0.35 : 0.45}
        />
        <path
          d="M48 118c0-28 24-52 52-52s52 24 52 52v22c0 16-12 28-28 28H76c-16 0-28-12-28-28v-22z"
          fill="currentColor"
          opacity={isHero ? 0.5 : 0.55}
        />
        <path
          d="M64 168c12 28 32 44 36 44s24-16 36-44"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity={isHero ? 0.4 : 0.35}
        />
      </svg>
      <p
        className={[
          "absolute bottom-4 left-4 right-4 text-center text-xs leading-snug",
          isHero ? "text-white/75" : "text-neutral-500",
        ].join(" ")}
      >
        {isHero ? "Алла Иванова" : "Семейное право · Барнаул"}
      </p>
    </div>
  );
}
