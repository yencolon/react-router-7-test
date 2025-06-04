import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { Button, DarkThemeToggle } from "flowbite-react";
import i18next from "~/i18next.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  let t = await i18next.getFixedT(request);
  return {
    greeting: t("greeting"),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  let { t } = useTranslation();

  return (
    <main className="flex flex-1 flex-col items-center justify-center h-screen">
      <h1 className="text-3xl p-3">{t("greeting")}</h1>
      <h2 className="text-2xl p-3">{loaderData.greeting}</h2>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
      <Form className="flex gap-4">
        <Button type="submit" name="lng" value="es">
          Español
        </Button>
        <Button type="submit" name="lng" value="en">
          English
        </Button>
      </Form>
    </main>
  );
}
