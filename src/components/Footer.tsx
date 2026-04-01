import { Link } from "react-router-dom";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sand-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">{site.lawyerName}</p>
          <p className="mt-2 text-sm text-neutral-600">
            Семейный юрист. Помогаю пройти развод и сопутствующие вопросы спокойно и по правилам
            процесса.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Навигация</p>
          <ul className="mt-2 space-y-1 text-sm text-neutral-600">
            <li>
              <Link className="hover:text-brand" to="/services">
                Услуги и цены
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand" to="/reviews">
                Отзывы и кейсы
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand" to="/blog">
                Блог
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand" to="/contact">
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Важно</p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            Информация на сайте носит ознакомительный характер и не является публичной офертой.
            Итоговая стратегия и стоимость определяются после анализа ситуации.
          </p>
        </div>
      </div>
      <div className="border-t border-sand-200 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {site.lawyerName}. Барнаул.
      </div>
    </footer>
  );
}
