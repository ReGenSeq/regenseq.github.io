---
name: Git authentication
description: Authentication boundaries for diagnosing this project's Git integration.
---

Keep the GitHub origin URL free of embedded credentials. Test push authentication with a non-uploading dry run, not just a remote read.

**Why:** The Git pane reported an LFS lock-verification authentication failure despite successful repository reads and no LFS-tracked files. Reconnecting alone left embedded remote credentials in place; a credential-free origin then passed the push dry run.

**How to apply:** For recurring authentication problems, inspect only redacted remote information, distinguish read from write access, and avoid destructive history repairs. A successful dry run does not confirm that an actual push or the Git pane succeeded.
