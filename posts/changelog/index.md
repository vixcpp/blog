---
title: "Vix.cpp Changelog"
description: "Version-by-version release notes for Vix.cpp, covering runtime architecture, CLI workflows, SDK packaging, build system improvements, diagnostics, and ecosystem changes."
date: 2026-05-23
---

# Vix.cpp Changelog

This changelog tracks the evolution of Vix.cpp release by release.

Each entry documents the technical changes behind a specific version: runtime architecture, CLI behavior, build system improvements, SDK packaging, module boundaries, diagnostics, examples, and developer experience.

## Latest releases

- [Vix.cpp v2.6.0](./v2.6.0.md) — AI agent module, official `vix.app`, Vue + Vix workflows, target-aware builds, async-powered `vix dev`, production backend tooling, and the new game runtime foundation.

- [Vix.cpp v2.5.6](./v2.5.6.md) — generated library workflow fixes, header-only build guidance, Ninja target diagnostics, and cleaner CLI output.

- [Vix.cpp v2.5.5](./v2.5.5.md) — `vix run` registry dependency linking, installed module consistency, package export cleanup, and the first experimental `vix.app` workflow.

- [Vix.cpp v2.5.3](./v2.5.3.md) — execution replay, runtime diagnostics, incremental build graph foundations, improved test/check output, and a dedicated dev session engine.

- [Vix.cpp v2.5.2](./v2.5.2.md) — stable `vix::print`, `vix::input`, runtime targets, binary export, smarter `vix run`, and optional HTTPS support.

- [Vix.cpp v2.5.1](./v2.5.1.md) — HTTP session lifecycle fixes, `.env` standardization, cleaner examples, and production-oriented WebSocket examples.

- [Vix.cpp v2.5.0](./v2.5.0.md) — runtime shutdown stability, async cleanup, WebSocket session write fixes, benchmark paths, and module build reliability.

## Ecosystem releases

- [Vix.cpp v2.4.0](./v2.4.0.md) — native static file serving, new standalone modules, umbrella headers, `vix::tests`, expanded environment handling, and real-world examples.

- [Vix.cpp v2.3.1](./v2.3.1.md) — OpenSSL package resolution fixes for consumer projects, especially macOS and Homebrew environments.

- [Vix.cpp v2.3.0](./v2.3.0.md) — ultra-fast direct C++ execution, smart CMake fallback, script caching, database flags, and a cleaner run pipeline.

- [Vix.cpp v2.2.0](./v2.2.0.md) — manifest, resolver, lockfile architecture, semver dependency resolution, transitive packages, and interactive config generation.

## V2 stabilization releases

- [Vix.cpp v2.1.19](./v2.1.19.md) — structured CMake diagnostics, dedicated build failure detectors, cleaner errors, reliable `--clean`, and publish edge-case fixes.

- [Vix.cpp v2.1.18](./v2.1.18.md) — robust SQLite target compatibility across CMake versions and exported WebSocket dependency fixes.

- [Vix.cpp v2.1.17](./v2.1.17.md) — SQLite target resolution fixes for exported WebSocket packages and better `VixConfig.cmake` dependency handling.

- [Vix.cpp v2.1.16](./v2.1.16.md) — Linux release portability, SDK runtime compatibility, header-only `fmt` and `spdlog`, and packaged artifact validation.

- [Vix.cpp v2.1.15](./v2.1.15.md) — SDK binary portability, relative RPATH handling, installer UX, and self-contained runtime behavior.

- [Vix.cpp v2.1.14](./v2.1.14.md) — cache module dependency cleanup, `vix::json` unification, and `VixTargets` export fixes.

- [Vix.cpp v2.1.13](./v2.1.13.md) — export-safe `nlohmann_json` integration, cache module FetchContent fixes, and SDK packaging reliability.

- [Vix.cpp v2.1.12](./v2.1.12.md) — JSON and SQLite export safety, CMake package stabilization, and reusable SDK installability.

- [Vix.cpp v2.1.11](./v2.1.11.md) — full SDK packaging for Linux, macOS, and Windows with `bin`, `include`, and `lib` layouts.

- [Vix.cpp v2.1.10](./v2.1.10.md) — Windows dependency resolution, cross-platform build stability, and Boost dependency cleanup.

- [Vix.cpp v2.1.9](./v2.1.9.md) — `fmt` migration completion, logging dependency propagation, and simplified CMake configuration.

- [Vix.cpp v2.1.8](./v2.1.8.md) — macOS `spdlog` compatibility fixes and logging portability improvements.

- [Vix.cpp v2.1.7](./v2.1.7.md) — macOS build fixes and complete cross-platform dependency setup.

- [Vix.cpp v2.1.6](./v2.1.6.md) — Linux dependency restoration and aarch64 cross-compilation fixes.

- [Vix.cpp v2.1.5](./v2.1.5.md) — Linux aarch64 release pipeline fixes and cross-compilation dependency discovery.

- [Vix.cpp v2.1.4](./v2.1.4.md) — warning-free builds, safer runtime patterns, cleaner CMake configuration, and CLI cleanup.

- [Vix.cpp v2.1.3](./v2.1.3.md) — clean runtime output, task execution, `vix fmt`, `vix info`, global updates, and REPL improvements.

- [Vix.cpp v2.1.2](./v2.1.2.md) — shell completion, paginated search, PTY runtime output, and improved command suggestions.

- [Vix.cpp v2.1.1](./v2.1.1.md) — registry dependency resolution, generated CMake safety, and dependency loading order fixes.

- [Vix.cpp v2.1.0](./v2.1.0.md) — runtime performance, structured documentation, real-world examples, template improvements, and ecosystem maturity.

## V2 foundation

- [Vix.cpp v2.0.0](./v2.0.0.md) — the first official V2 release, replacing the Boost.Beast-based V1 runtime with a Boost-free native HTTP stack, async-first architecture, and cleaner module boundaries.
