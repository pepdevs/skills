#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "tiktoken>=0.12.0,<1",
# ]
# ///
"""Report the file and token sizes of skill instructions."""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

import tiktoken


REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SKILLS_DIR = REPO_ROOT / "skills"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Report bytes and estimated context tokens for SKILL.md files."
    )
    parser.add_argument(
        "paths",
        nargs="*",
        type=Path,
        help="Files or directories to inspect. Defaults to the repository skills directory.",
    )
    parser.add_argument(
        "--encoding",
        default="o200k_base",
        help="Tiktoken encoding to use. Default: o200k_base.",
    )
    parser.add_argument(
        "--context-window",
        type=positive_integer,
        metavar="TOKENS",
        help="Show each skill's percentage of this context window.",
    )
    return parser.parse_args()


def positive_integer(value: str) -> int:
    parsed = int(value)
    if parsed <= 0:
        raise argparse.ArgumentTypeError("must be greater than zero")
    return parsed


def find_skill_files(paths: Iterable[Path]) -> list[Path]:
    skill_files: set[Path] = set()

    for supplied_path in paths:
        path = supplied_path.resolve()
        if path.is_file():
            if path.name != "SKILL.md":
                raise ValueError(f"expected a SKILL.md file: {supplied_path}")
            skill_files.add(path)
            continue
        if path.is_dir():
            skill_files.update(candidate.resolve() for candidate in path.rglob("SKILL.md"))
            continue
        raise ValueError(f"path does not exist: {supplied_path}")

    return sorted(skill_files)


def display_path(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def main() -> int:
    args = parse_args()
    paths = args.paths or [DEFAULT_SKILLS_DIR]

    try:
        skill_files = find_skill_files(paths)
    except ValueError as error:
        print(f"Error: {error}")
        return 2

    if not skill_files:
        print("No SKILL.md files found.")
        return 1

    try:
        encoding = tiktoken.get_encoding(args.encoding)
    except ValueError as error:
        print(f"Error: {error}")
        return 2

    rows: list[tuple[str, int, int]] = []
    for path in skill_files:
        raw = path.read_bytes()
        token_count = len(encoding.encode(raw.decode("utf-8")))
        rows.append((display_path(path), len(raw), token_count))

    path_width = max(len("Skill"), *(len(path) for path, _, _ in rows))
    heading = f"{'Skill':<{path_width}}  {'Bytes':>8}  {'KiB':>7}  {'Tokens':>8}"
    if args.context_window:
        heading += "  Context"

    print(f"Encoding: {args.encoding}")
    print(heading)
    print("-" * len(heading))

    total_bytes = 0
    total_tokens = 0
    for path, byte_count, token_count in rows:
        total_bytes += byte_count
        total_tokens += token_count
        line = f"{path:<{path_width}}  {byte_count:>8,}  {byte_count / 1024:>7.2f}  {token_count:>8,}"
        if args.context_window:
            line += f"  {token_count / args.context_window:>7.3%}"
        print(line)

    print("-" * len(heading))
    total = f"{'TOTAL':<{path_width}}  {total_bytes:>8,}  {total_bytes / 1024:>7.2f}  {total_tokens:>8,}"
    if args.context_window:
        total += f"  {total_tokens / args.context_window:>7.3%}"
    print(total)
    print("Counts include SKILL.md content only. Loaded references consume additional tokens.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
