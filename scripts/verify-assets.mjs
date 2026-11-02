import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : [path]
  })
}

const refs = new Set()
for (const path of files('src')) {
  if (!/\.(tsx?|css)$/.test(path)) continue
  const source = readFileSync(path, 'utf8')
  for (const match of source.matchAll(/\/assets\/[A-Za-z0-9_./-]+/g)) {
    refs.add(match[0])
  }
  const aliases = Object.fromEntries([...source.matchAll(/const ([A-Z]+) = (?:'([^']+)'|`([^`]+)`)/g)]
    .map(([, name, literal, template]) => [name, literal || template]))
  for (let pass = 0; pass < 2; pass++) {
    for (const [name, value] of Object.entries(aliases)) {
      aliases[name] = value.replace(/\$\{\s*([A-Z]+)\s*\}/g, (_, parent) => aliases[parent] || '')
    }
  }
  for (const [, alias, suffix] of source.matchAll(/\$\{\s*([A-Z]+)\s*\}(\/[A-Za-z0-9_./-]+)/g)) {
    if (aliases[alias]?.startsWith('/assets/')) refs.add(aliases[alias] + suffix)
  }
}

const missing = [...refs].filter((url) => !existsSync(resolve('public', url.slice(1))))
if (missing.length) {
  process.stderr.write(`Assets ausentes:\n${missing.join('\n')}\n`)
  process.exitCode = 1
} else {
  process.stdout.write(`${refs.size} referências estáticas de assets verificadas.\n`)
}
