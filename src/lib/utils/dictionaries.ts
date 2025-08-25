import { SupportedLocales } from "@/types/globals";
import "server-only";

const dictionaries: Record<SupportedLocales, () => Promise<any>> = {
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
    ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: SupportedLocales) => {
    return dictionaries[locale]?.() ?? dictionaries.en();
};
