# GitHub Actions Workflows

## Included workflows

| Workflow | Purpose |
|----------|---------|
| `code-quality.yml` | Runs ESLint, Stylelint, and PHPCS on pull requests — ready to use, no configuration needed |
| `deploy.yml` | **Template** — configure before enabling automatic or manual deploys |

Second Mile removed environment-specific deploy configuration so UT can wire deployment to your own WP Engine environment or hosting provider.

## Deploy setup checklist

1. Add repository **secret**: `WPE_SSHG_KEY_PRIVATE` (WP Engine SSH gateway private key)
2. Add repository **variables**:
   - `WPE_ENV` — your WP Engine environment name (e.g. `your-wp-engine-environment`)
   - `DEPLOY_REMOTE_PATH` (optional) — remote plugin path; defaults to `wp-content/plugins/ut-research-blocks/`
3. Open `deploy.yml` and confirm the deploy step matches your hosting setup. Replace the WP Engine action if you use a different deploy method.
4. Test with **Actions → Deploy Plugin (configure before use) → Run workflow**
5. After a successful test, optionally uncomment the `push: branches: [main]` trigger in `deploy.yml` for automatic deploys

## Build and staging

The deploy workflow runs `npm ci`, `npm run build`, then stages files with `rsync` using `.distignore` before uploading. This matches the local `./build-dist.sh` packaging approach.
