# Source image assets

This folder holds **source/master image files** used to produce optimized assets in the parent `images/` directory.

## Current files

- `carbonfiber-original.webp` — source for the `ut-research-orange-carbon-fiber-bg-*.webp` variants used by the plugin (registered as CSS variables in `src/Core/class-app.php`)

## Distribution

Files here are **excluded from the production zip** via `.distignore` and are not shipped when running `./build-dist.sh`. Only the optimized WebP files in the parent `images/` folder are included in distribution builds.

## Why keep these in the repo?

So your team can re-export sizes or update the carbon fiber texture without tracking down the original asset elsewhere.
