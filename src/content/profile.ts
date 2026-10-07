import type { Locale } from "@/i18n/routing";

export const profile = {
  firstName: "Moïse",
  lastName: "Tsiorinambinina",
  photo: "/images/moise.jpg",
  location: "Madagascar",
  // Le CV diffère selon la langue.
  cv: {
    fr: "https://drive.google.com/file/d/1UftfOyznclp3W27f1dnUihO5XsXQ2V0m/view?usp=drive_link",
    en: "https://drive.google.com/file/d/1yW9ckvB-ck4kWOLg5YZSKwnxqaFptTPN/view?usp=drive_link",
  } satisfies Record<Locale, string>,
};

export const contact = {
  phoneDisplay: "+261 34 90 637 88",
  phone: "tel:+261349063788",
  whatsapp: "https://wa.me/261349063788",
  emailAddress: "tsiorymauyz@gmail.com",
  email: "mailto:tsiorymauyz@gmail.com",
  linkedin: "https://linkedin.com/in/moise-tsiorinambinina",
  github: "https://github.com/mauyz",
};
