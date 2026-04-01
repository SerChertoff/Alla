import { useState } from "react";
import { NavLink } from "react-router-dom";
import { site } from "@/config/site";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/about", label: "О себе" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/blog", label: "Блог" },
  { to: "/contact", label: "Контакты" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-brand text-white"
      : "text-neutral-700 hover:bg-sand-200/80",
  ].join(" ");

type HeaderProps = {
  onOpenConsult: () => void;
};

export function Header({ onOpenConsult }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="text-lg font-semibold text-neutral-900">{site.lawyerName}</span>
          <span className="text-xs text-neutral-600">Семейный юрист · Барнаул</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenConsult}
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark md:inline-flex"
          >
            Записаться
          </button>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-neutral-800 hover:bg-sand-200 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-sand-200 bg-sand-50 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenConsult();
              }}
              className="mt-2 rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Записаться на консультацию
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
