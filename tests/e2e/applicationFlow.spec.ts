import { expect, test } from "@playwright/test";

test("crée une candidature depuis l'interface web", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Id").fill("app-1");
  await page.getByLabel("Entreprise").fill("Deezer");
  await page.getByRole("button", { name: "Créer" }).click();

  await expect(page.getByText("Candidature créée")).toBeVisible();
  await expect(page.getByText("Deezer")).toBeVisible();
  await expect(page.getByText("statut : draft")).toBeVisible();
});
