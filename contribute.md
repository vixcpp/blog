---
title: "Contribute"
description: "How to contribute code, documentation, tests, examples, bug reports, and engineering articles to Vix.cpp."
date: 2026-07-19
article: false
---

# Contribute to Vix.cpp

Vix.cpp is built in the open.

Contributions can improve the runtime, CLI, SDK modules, build workflows, package tooling, diagnostics, documentation, examples, tests, release notes, and the engineering blog.

You do not need to begin with a large feature. A focused bug report, a failing test, a clearer diagnostic, a documentation correction, or a small example can be just as valuable as a new subsystem.

## Ways to contribute

### Report a bug

A useful bug report should make the problem reproducible.

Include:

- the Vix.cpp version;
- operating system and architecture;
- compiler and compiler version;
- the command that failed;
- the smallest project or source file that reproduces the issue;
- the complete error output;
- the expected behavior;
- any workaround you already tested.

When possible, run the failing command with additional diagnostics enabled and include the relevant output.

```bash
VIX_LOG_LEVEL=debug vix build
```

Remove credentials, private package tokens, local secrets, and confidential source code before publishing logs.

### Improve diagnostics

Compiler and build failures are often technically correct but difficult to act on.

Contributions are welcome for:

- clearer compiler-error extraction;
- linker failure detection;
- CMake configuration diagnostics;
- sanitizer output;
- runtime crash reports;
- package-resolution errors;
- actionable hints;
- regression tests for previously confusing failures.

A diagnostic change should include an example of the original output and the improved result.

### Add or improve tests

Tests are one of the most useful contribution paths.

Good test contributions include:

- regression coverage for a fixed bug;
- cross-platform behavior;
- malformed manifest handling;
- dependency-resolution edge cases;
- build target selection;
- package installation and update behavior;
- runtime lifecycle and shutdown behavior;
- CLI output and exit codes;
- generated project validation.

A regression test should fail before the fix and pass after it.

### Improve documentation

Documentation contributions may cover:

- incorrect commands;
- missing prerequisites;
- unclear explanations;
- incomplete API examples;
- platform-specific behavior;
- outdated package names;
- broken links;
- migration notes;
- compatibility limitations.

Examples should be small enough to understand quickly and complete enough to compile or run.

### Write examples

A strong example demonstrates one idea without unnecessary application code.

Useful examples include:

- a minimal HTTP route;
- a WebSocket endpoint;
- a `vix.app` project;
- an application module;
- a registry dependency;
- a private package workflow;
- database access;
- asynchronous execution;
- a Vix Note document;
- a diagnostic or testing pattern.

Prefer examples that can be copied into an empty directory and run with a small number of commands.

### Contribute to the engineering blog

The blog accepts technical writing related to Vix.cpp and the surrounding native development ecosystem.

A good article may explain:

- how a subsystem works;
- why an architectural decision was made;
- how a performance result was measured;
- how a difficult bug was isolated;
- how a cross-platform issue was fixed;
- how an application was built with Vix.cpp;
- what was learned from a release or migration.

Articles should be based on implementation details, reproducible behavior, or direct engineering experience.

Avoid unsupported performance claims, vague promotional language, and comparisons that do not describe their methodology.

## Before starting

For a small correction, opening a pull request directly is usually enough.

For a larger change, begin with an issue or technical proposal. This avoids spending time on an implementation that conflicts with ongoing architectural work.

A proposal should answer:

1. What problem does this solve?
2. Who experiences the problem?
3. What is the smallest useful change?
4. Which modules or workflows are affected?
5. Does it change public APIs, manifests, lockfiles, generated files, or package compatibility?
6. How will the behavior be tested?
7. Are there simpler alternatives?

## Development setup

Clone the repository and initialize its modules:

```bash
git clone https://github.com/vixcpp/vix.git
cd vix
git submodule update --init --recursive
```

Create a focused branch:

```bash
git checkout -b fix/clear-build-diagnostic
```

Use a branch name that describes the work:

```text
fix/package-install-path
feat/note-extension-runtime
docs/app-modules-guide
test/websocket-shutdown
refactor/build-error-classification
```

Keep unrelated changes in separate branches and pull requests.

## Building the project

Use the project’s documented build workflow for the area you are changing.

A typical development build is:

```bash
vix build --build-target all
```

For additional output:

```bash
vix build --build-target all -v
```

When changing only one module, build and test that module before running broader validation.

Do not commit generated build directories, compiler caches, local SDK installations, package archives, credentials, or machine-specific configuration.

## Running tests

Run the smallest relevant test first, then the wider suite.

Examples:

```bash
vix tests
```

```bash
ctest --test-dir build --output-on-failure
```

For a focused CTest selection:

```bash
ctest --test-dir build -R package --output-on-failure
```

When a change affects runtime safety or memory ownership, use the sanitizer configuration available for that module or workflow.

A pull request should explain which tests were run and on which platform.

## Code contribution guidelines

### Keep changes focused

A pull request should solve one problem or introduce one coherent capability.

Avoid mixing:

- formatting changes;
- unrelated renames;
- dependency upgrades;
- large refactors;
- behavioral changes.

Small pull requests are easier to review, test, and revert.

### Preserve module boundaries

Public headers, internal implementation details, and module dependencies should remain clearly separated.

Before adding a dependency between modules, consider whether the behavior belongs in a lower-level shared module or can be expressed through an existing interface.

### Treat public APIs as stable contracts

Changes to public headers, CLI commands, manifest fields, lockfiles, package metadata, generated CMake, and installed SDK targets may affect existing users.

Document compatibility impact and provide migration guidance when behavior changes.

### Prefer explicit failures

Vix.cpp favors errors that explain:

- what failed;
- where it failed;
- which input caused it;
- what the developer can do next.

Do not replace a useful diagnostic with a generic failure message.

### Follow the existing style

Match the surrounding code before introducing a new convention.

Keep:

- naming consistent;
- headers self-contained;
- includes minimal and explicit;
- ownership clear;
- error handling visible;
- platform-specific code isolated;
- comments focused on intent rather than syntax.

## Pull request checklist

Before opening a pull request, verify that:

- the change solves a clearly described problem;
- unrelated files are not modified;
- the project builds successfully;
- relevant tests pass;
- a regression test was added when appropriate;
- public behavior is documented;
- examples and commands are accurate;
- new files contain the correct license information;
- generated artifacts and local configuration are excluded;
- the pull request explains validation and compatibility impact.

A useful pull request description contains:

```text
Problem
What was failing or missing?

Change
What does this implementation do?

Validation
Which builds, tests, platforms, or manual workflows were checked?

Compatibility
Does this change public APIs, manifests, packages, lockfiles, or output?
```

## Commit messages

Use short, direct commit messages that describe the result of the change.

Examples:

```text
fix(cli): preserve executable during global package install
```

```text
feat(note): add package-based extension discovery
```

```text
test(build): cover missing generated target diagnostics
```

```text
docs(app): explain module dependency resolution
```

Avoid messages such as:

```text
update files
fix issue
changes
work in progress
```

## Documentation and blog workflow

Documentation and blog pages are written in Markdown.

Use frontmatter that accurately describes the page:

```yaml
---
title: "How vix build resolves targets"
description: "An explanation of target discovery and build selection in Vix.cpp."
date: 2026-07-19
tag: "Build"
readingTime: "8 min read"
author: "Gaspard Kirira"
---
```

For collection pages that should not show article metadata:

```yaml
article: false
```

Technical articles should:

- use complete commands;
- identify assumptions;
- distinguish released behavior from planned work;
- include benchmark methodology beside benchmark results;
- mention known limitations;
- avoid presenting local measurements as universal guarantees.

## Security issues

Do not publish a security vulnerability in a public issue before maintainers have had time to evaluate it.

Potential security issues include:

- credential exposure;
- authentication bypass;
- unsafe archive extraction;
- package integrity failures;
- path traversal;
- arbitrary command execution;
- insecure temporary files;
- TLS verification problems;
- private package access leaks.

Send the report privately through the contact channel provided by Softadastra or the repository security policy.

Include a minimal reproduction, affected versions, impact, and any suggested mitigation.

## Licensing

Unless a repository states otherwise, contributions to Vix.cpp are submitted under the project’s MIT License.

Only contribute code, documentation, media, and examples that you have the right to submit.

Do not copy implementation code from incompatible licenses or closed-source projects.

## Community expectations

Technical disagreement is welcome. Personal attacks are not.

Contributors should:

- discuss the implementation rather than the person;
- explain tradeoffs with evidence;
- remain patient with new contributors;
- acknowledge uncertainty;
- avoid dismissive or hostile language;
- respect private security reports and confidential information.

The goal is to build useful software and leave the codebase easier to understand than before.

## Contribution areas

### Vix.cpp

Runtime, CLI, SDK modules, application modules, package workflows, diagnostics, tests, examples, and release engineering.

- [Vix.cpp repository](https://github.com/vixcpp/vix)
- [Vix.cpp documentation](https://docs.vixcpp.com)

### Vix Registry

Public package discovery and reusable packages for Vix applications.

- [Vix Registry](https://registry.vixcpp.com)

### Softadastra

Open C++ tooling and product infrastructure around Vix.cpp.

- [Softadastra](https://softadastra.com)

### Engineering blog

Corrections, implementation notes, benchmarks, architecture articles, and real application experience.

- [Browse the blog](/posts/)
- [Read the changelog](/posts/changelog/)

## Contact

The project is created and maintained by Gaspard Kirira through Softadastra.

- [Gaspard Kirira](https://gaspardkirira.softadastra.com)
- [Softadastra](https://softadastra.com)
- [Vix.cpp on GitHub](https://github.com/vixcpp/vix)

A good first contribution is small, reproducible, and easy to verify.
