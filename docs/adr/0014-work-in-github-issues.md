# 0014. Work is tracked in GitHub Issues

- **Date:** 2026-11-04
- **Status:** Accepted
- **Supersedes:** the `tasks.md` part of [0012](0012-project-knowledge-files.md)

## Context

Open work lived in `tasks.md`, and `/publish` recorded each release there. There was no view
across repos, and nothing linked a to-do to the commit or PR that finished it. On 2026-11-04 every
open item became a GitHub issue on the owner's Backlog project board.

## Decision

- Open work is a GitHub issue, labelled `type:*`, `priority:*` and `area:*`.
- Finished work closes its issue from the commit or PR (`Fixes #N`).
- A release closes the issues it completes with a comment naming the version. The GitHub
  Release is the record of the release.
- `tasks.md` is deleted. Its history stays in git.

## Consequences

+ One board across repos, and every to-do links to the change that closed it.
+ `/publish` no longer needs a docs commit after the tag just to log the release.
− Tracking work depends on GitHub: reading it needs `gh` or the web, not a file.
