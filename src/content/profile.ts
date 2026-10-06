import type { Locale } from "@/i18n/routing";

export const profile = {
  firstName: "Moïse",
  lastName: "Tsiorinambinina",
  photo: "/images/moise.jpg",
  location: "Antananarivo, Madagascar",
  // Le CV diffère selon la langue.
  cv: {
    fr: "https://drive.google.com/file/d/1p7o2lF3p7SPBT6XIhu0Aee1LxOnd5Kbb/view?usp=sharing",
    en: "https://drive.google.com/file/d/1GqmEcq5uKQxB2VxhU4liRW00L8LmGFKi/view?usp=sharing",
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
