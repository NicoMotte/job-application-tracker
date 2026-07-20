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

test("affiche une erreur quand une transition métier est interdite", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Id").fill("app-error-1");
  await page.getByLabel("Entreprise").fill("Qobuz");
  await page.getByRole("button", { name: "Créer" }).click();

  await expect(page.getByText("Candidature créée")).toBeVisible();

  await page
    .locator('select[data-application-id="app-error-1"]')
    .selectOption("interview");

  await page.locator('button[data-change-status="app-error-1"]').click();

  await expect(
    page.getByText("Cannot move application from draft to interview"),
  ).toBeVisible();
});
