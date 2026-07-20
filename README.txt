# Job Application Tracker

Prototype réalisé pour mettre en place une stratégie de test complète (test unitaire, intégration, API, End to End avec Playwright, intégration continue sous Git)

## Fonctionnalité

L’application permet de créer une candidature et de faire évoluer son statut.
Une API spécifique (dotée de sa propre suite de tests) a été développée pour ne pas dépendre d'un site web extérieur.
La stratégie de test vise, comme en environnement réel, l'optimisation du rapport coût/réduction du risque.
Par exemple, les transitions autorisées sont testées exhaustivement en tests unitaires, alors que seule une transition interdite est testée en test E2E (une suite E2E totale en environnement réel serait trop lourde et trop coûteuse à lancer).

## Stack

TypeScript
Node.js
Express
Vitest
Supertest
Playwright
GitHub Actions

## Stratégie de test


## Commandes

Installer les dépendances :

npm install

Lancer l’application en local :

npm run dev

Lancer les tests :

npm run test:unit
npm run test:integration
npm run test:api
npm run test:e2e

Lancer l’ensemble des tests :

npm run test:all

## Intégration continue

Une GitHub Action lance automatiquement les tests à chaque push ou pull request sur `main`.

La CI installe les dépendances, prépare Playwright, puis exécute les tests Vitest et Playwright.