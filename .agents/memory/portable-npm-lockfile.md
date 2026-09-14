---
name: Portable npm lockfile
description: Prevent GitHub-hosted CI from receiving dependency URLs that only resolve inside Replit.
---

Keep npm lockfile tarball URLs reachable from public GitHub-hosted runners; do not commit Replit-internal package registry URLs.

**Why:** Replit package operations can record an internal package-firewall URL even when the same package exists on the public npm registry. Local installation then succeeds while GitHub Pages fails during dependency installation.

**How to apply:** After dependency or lockfile changes, search the lockfile for internal registry hosts and verify a clean install using the public npm registry before pushing.