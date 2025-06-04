import i18next from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getInitialNamespaces } from "remix-i18next/client";
import Backend from "i18next-http-backend";
import i18n from "./i18n";
import en from "./locales/en";
import es from "./locales/es";

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend) // to fetch transalations
    .init({
      ...i18n,
      ns: getInitialNamespaces(),
      // backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" }, // fetch transalation
      //resources: { en: { translation: en }, es: { translation: es } }, //embedded translation
      backend: { loadPath: "/api/locales/{{lng}}/{{ns}}" },
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ["htmlTag"],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

hydrate().catch((error) => console.error("error"));
