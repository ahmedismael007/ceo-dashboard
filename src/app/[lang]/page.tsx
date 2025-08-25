import { getDictionary } from "@/lib/utils/dictionaries";
import { SupportedLocales } from "@/types/globals";

export default async function Home({ params }: {
  params: Promise<{ lang: SupportedLocales }>
}) {
  const { lang } = await params

  const dict = await getDictionary(lang)
  return (
    <div>{dict.x}</div>
  );
}
