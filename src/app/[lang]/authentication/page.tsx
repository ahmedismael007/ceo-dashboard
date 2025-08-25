import { SupportedLocales } from "@/types/globals"
import { redirect } from "next/navigation"


const page = async ({ params }: {
    params: Promise<{ lang: SupportedLocales }>
}) => {
    const { lang } = await params

    redirect(`/${lang}/authentication/login`)
    return
}

export default page