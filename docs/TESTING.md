# Architecture de tests (Velyx CLI)

Ce document décrit la stratégie de tests recommandée pour `velyx`, un CLI Node.js orienté Laravel.

## Objectifs

- Fiabiliser les comportements critiques (`init`, `add`, `list`).
- Garder des tests rapides en local.
- Limiter les faux positifs liés aux mocks excessifs.
- Rendre la CI prédictible.

## Pyramide de tests

### 1. Tests unitaires

Portée:
- Fonctions utilitaires pures (`src/utils/*`).
- Parsing/validation de schémas (`zod`).
- Fonctions de transformation (ex: filtrage/liste, injection de contenu texte).

Caractéristiques:
- Très rapides.
- Pas d'I/O réel si possible.
- Mocks ciblés (`fs`, `process`, `prompts`) uniquement quand nécessaire.

### 2. Tests d'intégration (service-level)

Portée:
- `InitService`, `ComponentService`, `ConfigManager`.
- Flux applicatifs avec fichiers réels dans un dossier temporaire.

Caractéristiques:
- Utiliser un projet Laravel fixture minimal.
- Conserver le filesystem réel (temp dir) pour valider les effets de bord.
- Mocker seulement les frontières externes instables:
  - réseau/registry
  - installation de dépendances shell

### 3. Tests E2E CLI

Portée:
- Exécution réelle des commandes CLI (`init`, `add`, `list`).
- Vérification de l'exit code, stdout/stderr et des fichiers générés.

Caractéristiques:
- Peu nombreux mais critiques (smoke tests).
- Reproduisent les cas utilisateur réels.

## Structure recommandée

```text
tests/
  unit/
    utils/
  integration/
    services/
    flows/
  e2e/
    cli/
  fixtures/
    laravel-minimal/
  helpers/
    temp-project.ts
    cli-runner.ts
```

Notes:
- Les tests unitaires proches du code (`src/**/*.test.ts`) restent acceptables.
- Les tests d'intégration et E2E doivent être centralisés dans `tests/`.

## Règles de mock

- Ne pas mocker ce qu'on veut valider.
- Unitaire: mocks autorisés et fréquents.
- Intégration: mock du réseau et des process externes uniquement.
- E2E: éviter les mocks globaux; privilégier des fixtures contrôlées.

## Gestion des fixtures Laravel

Approche:
- Maintenir un `tests/fixtures/laravel-minimal` stable et minimal.
- Pour chaque test d'intégration/E2E:
  1. Copier la fixture vers un temp dir.
  2. Exécuter la commande dans ce temp dir (`--cwd` ou `process.chdir`).
  3. Asserter les fichiers produits.
  4. Nettoyer le temp dir.

Pré-requis fixture minimale:
- `composer.json` avec `laravel/framework` (ou `illuminate/foundation`).
- `artisan`.
- `package.json` avec `tailwindcss` v4+.
- Arborescence `resources/` cohérente (`css`, `js`, `views`).

## Cas de tests prioritaires

### `init`
- Échec hors projet Laravel.
- Échec sans Tailwind v4.
- Génération de `velyx.json`.
- Création de `resources/css/velyx.css`.
- Injection CSS quand `@import "tailwindcss"` est présent.
- Respect de `--cwd`.

### `add`
- Échec si projet non initialisé.
- Ajout d'un composant et écriture des fichiers attendus.
- Gestion des conflits (skip/overwrite/cancel).
- Auto-import JS si entry JS détecté.
- Respect de `--cwd`.

### `list`
- Récupération registre.
- Filtre `query`.
- Pagination `limit` / `offset`.
- Sortie `--json`.

## Conventions

- Nommage: `*.test.ts`.
- 1 comportement métier par test.
- Assertions orientées effet observable (fichiers, sortie CLI, exit code).
- Éviter les snapshots volumineux pour la sortie CLI.

## Couverture

Objectif progressif:
- Étape 1: couverture globale >= 60%.
- Étape 2: couverture globale >= 75%.

Règle qualité:
- La couverture ne remplace pas la pertinence.
- Prioriser les flux critiques plutôt que des lignes triviales.

## CI recommandée

Pipeline:
1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm test:coverage` (sur branche principale ou PRs importantes)

Bonnes pratiques:
- Exécuter les E2E sur Linux en CI (environnement stable).
- Séparer éventuellement les jobs `unit+integration` et `e2e`.
- Ne pas dépendre d'un réseau externe réel dans les tests.

## Plan d'implémentation conseillé

1. Mettre en place `tests/helpers` + fixture Laravel minimale.
2. Ajouter les premiers tests d'intégration sur `init`.
3. Ajouter les tests d'intégration sur `add`.
4. Ajouter 2-3 smoke tests E2E CLI.
5. Monter progressivement les seuils de couverture.
