import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf les routes internes de Next et les fichiers statiques (ceux qui ont une extension).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
