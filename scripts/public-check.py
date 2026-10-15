#!/usr/bin/env python3
"""Check the public inventory and scan its complete text for sensitive signatures."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
LOCAL = re.compile(r'/(?:home|Users)/[A-Za-z0-9_.-]+|[A-Za-z]:[\\/](?:Users|work)[\\/]', re.I)
SECRET = re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')
PRIVATE_HOST = re.compile(r'\b[a-z0-9-]+\.tail[0-9a-z]+\.ts\.net\b', re.I)


def inventory() -> str:
    dependencies = json.loads((ROOT / 'skill-dependencies.json').read_text())
    lines = [f'Authored skills: {len(dependencies)}']
    for name, companions in dependencies.items():
        lines.append(f'{name}: {", ".join(companions) or "none"}')
    return '\n'.join(lines) + '\n'


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--inventory', action='store_true', help='Print stable skill and companion inventory')
    parser.add_argument('--denylist', type=Path, help='External JSON array of private literal terms; keep outside the public tree')
    args = parser.parse_args()
    if args.inventory:
        print(inventory(), end='')
        return 0
    patterns = [('personal absolute path', LOCAL), ('credential', SECRET), ('private network host', PRIVATE_HOST)]
    if args.denylist:
        terms = json.loads(args.denylist.read_text())
        if not isinstance(terms, list) or not terms or any(not isinstance(term, str) or not term for term in terms):
            parser.error('denylist must be a nonempty JSON array of nonempty literal strings')
        patterns.append(('external private term', re.compile('|'.join(re.escape(term) for term in terms), re.I)))
    manifest = json.loads((ROOT / 'export-allowlist.json').read_text())
    approved = {record['path'] for record in manifest['files']}
    failures = []
    if len(approved) != len(manifest['files']):
        failures.append('duplicate path in export allowlist')
    actual = set()
    for file in sorted(ROOT.rglob('*')):
        relative = file.relative_to(ROOT)
        if '.git' in relative.parts:
            continue
        if file.is_symlink():
            failures.append(f'{relative}: symlink is outside the publication boundary')
            continue
        if not file.is_file():
            continue
        actual.add(relative.as_posix())
        try:
            body = file.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            failures.append(f'{relative}: unreviewed binary content')
            continue
        for label, pattern in patterns:
            for match in pattern.finditer(body):
                line = body.count('\n', 0, match.start()) + 1
                failures.append(f'{relative}:{line}: {label}')
    failures.extend(f'unapproved file: {name}' for name in sorted(actual - approved))
    failures.extend(f'missing approved file: {name}' for name in sorted(approved - actual))
    expected = (ROOT / 'docs/golden/inventory.txt').read_text()
    if inventory() != expected:
        failures.append('skill inventory differs from docs/golden/inventory.txt')
    if failures:
        print('\n'.join(failures), file=sys.stderr)
        return 1
    print(f'Public boundary: {len(actual)} approved UTF-8 files; no sensitive path, credential or network-host signatures.')
    if args.denylist:
        print(f'External export audit: {len(terms)} private literal terms checked; no matches.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
