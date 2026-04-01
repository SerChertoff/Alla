import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { site } from "@/config/site";
import { openConsultationMailto } from "@/lib/mailto";

registerLocale("ru", ru);

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z
    .string()
    .min(10, "Укажите телефон")
    .regex(/^[+0-9()\s-]{10,}$/, "Некорректный формат"),
  email: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.string().email("Некорректный email").optional()
  ),
  preferredAt: z.date({ required_error: "Выберите дату" }),
  message: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

type ConsultModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ConsultModal({ open, onClose }: ConsultModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const preferredAt = watch("preferredAt");

  useEffect(() => {
    if (!open) return;
    reset({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = (data: FormValues) => {
    openConsultationMailto({
      to: site.email,
      name: data.name,
      phone: data.phone,
      email: data.email,
      preferredAt: data.preferredAt,
      message: data.message,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-title"
        >
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 text-neutral-500 hover:bg-sand-100 hover:text-neutral-800"
              aria-label="Закрыть"
            >
              ✕
            </button>

            <h2 id="consult-title" className="text-xl font-semibold text-neutral-900">
              Запись на консультацию
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Оставьте контакты и удобную дату — я свяжусь с вами для уточнения времени.
            </p>

            {isSubmitSuccessful ? (
              <div className="mt-6 space-y-3 rounded-lg bg-sand-100 px-4 py-3 text-sm text-neutral-800">
                <p>
                  Спасибо! Должен открыться почтовый клиент с черновиком письма на{" "}
                  <a className="font-medium text-brand hover:underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  . Если этого не произошло, напишите на ту же почту или позвоните:{" "}
                  <a className="font-medium text-brand hover:underline" href={`tel:${site.phoneTel}`}>
                    {site.phoneDisplay}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="name">
                    Имя
                  </label>
                  <input
                    id="name"
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("name")}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="phone">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("phone")}
                    autoComplete="tel"
                    placeholder="+7 ..."
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="email">
                    Email (необязательно)
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("email")}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <span className="text-sm font-medium text-neutral-800">Удобная дата</span>
                  <div className="mt-1">
                    <DatePicker
                      selected={preferredAt}
                      onChange={(d) => d && setValue("preferredAt", d, { shouldValidate: true })}
                      locale="ru"
                      dateFormat="d MMMM yyyy"
                      minDate={new Date()}
                      placeholderText="Выберите дату"
                      className="w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                      wrapperClassName="w-full"
                    />
                  </div>
                  {errors.preferredAt && (
                    <p className="mt-1 text-xs text-red-600">{errors.preferredAt.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-800" htmlFor="message">
                    Кратко о ситуации (необязательно)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm outline-none ring-brand/30 focus:ring-2"
                    {...register("message")}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                    className="rounded-lg border border-sand-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-sand-50"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
