---
title: "Contribute"
description: "How to contribute technical articles, engineering notes, corrections, and release documentation to the Vix.cpp blog."
date: 2026-05-23
---

# Contribute

The Vix.cpp blog documents the engineering work behind the project: runtime architecture, CLI workflows, build system design, diagnostics, SDK packaging, production tooling, roadmap decisions, and release history.

Contributions are welcome when they improve technical clarity, document real implementation decisions, or help developers understand how Vix.cpp evolves.

## What belongs here

This blog is focused on engineering content.

Good contributions include:

- deep technical articles about Vix.cpp internals
- release notes and changelog improvements
- architecture explanations
- CLI workflow documentation
- build system and CMake notes
- diagnostics and error handling write-ups
- production deployment and operations notes
- roadmap documents
- corrections to existing articles

This is not a marketing blog. Articles should explain real design decisions, implementation tradeoffs, and technical behavior.

## Writing style

Write for experienced C++ developers.

Prefer precise explanations over broad claims. Explain why a change exists, what problem it solves, and how it affects the runtime or developer workflow.

Use short paragraphs. Keep one idea per paragraph. Avoid unnecessary spacing between sentences inside the same paragraph.

When documenting a feature, focus on:

1. the problem
2. the design decision
3. the implementation direction
4. the impact on developers
5. compatibility or migration notes when needed

## Article structure

Most technical articles should use this structure:

```markdown
---
title: "Article title"
description: "Short description of what the article explains."
date: YYYY-MM-DD
---

# Article title

Opening context.

## Problem

What was difficult or broken before.

## Design

How Vix solves it.

## Implementation

Important internal details.

## Developer impact

What changes for users.

## Notes

Compatibility, tradeoffs, or future direction.
```

Release articles should explain the motivation behind the version, not only list changes.

A changelog page should answer: why did this release exist?

## Markdown rules

Use valid Markdown.

Code blocks must always specify the language when possible:

```cpp
#include <vix.hpp>
```

Use inline code for commands, symbols, APIs, filenames, and module names.

Examples:

```markdown
`vix build`
`RuntimeExecutor`
`VixConfig.cmake`
`vix::http`
```

Do not put normal prose inside a `cpp` code block.

## Links

Use root-relative links for internal pages:

```markdown
[Changelog](/posts/changelog/)
[vix.app](/posts/vix-app/)
[Roadmap](/posts/roadmap/)
```

Use relative links only when linking inside the same folder:

```markdown
[Production simplicity checklist](./production-simplicity-checklist.md)
```

## Technical accuracy

Do not hide architectural problems.

If a release fixed a difficult issue, explain the issue clearly. If a design changed because the old approach created limitations, document that honestly.

The goal is to build trust with developers by showing the reasoning behind Vix.cpp decisions.

## Local development

Install dependencies:

```bash
npm install
```

Run the blog locally:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Contribution checklist

Before submitting changes:

- make sure the Markdown is valid
- keep paragraphs readable and compact
- verify internal links
- check code fences
- avoid unfinished placeholders
- build the site locally if possible

## Commit style

Use clear commit messages.

Examples:

```bash
docs(blog): add roadmap section
docs(changelog): expand v2.0.0 release notes
docs(blog): improve article index
docs(contribute): document writing guidelines
```

## Direction

The blog should help developers understand Vix.cpp as a serious C++ runtime project.

Every article should make the project easier to inspect, trust, use, or contribute to.
