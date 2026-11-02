import { existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const assets = join('dist', 'assets')
if (!existsSync(assets)) process.exit(0)

for (const entry of readdirSync(assets, { withFileTypes: true })) {
  if (!entry.isFile()) continue
  if (/^(?:index|motion|three|ConstellationCanvas)-[A-Za-z0-9_-]+\.(?:js|css|map)$/.test(entry.name)) {
    rmSync(join(assets, entry.name))
  }
}
