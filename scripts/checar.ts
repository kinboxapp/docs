// Roda localmente as mesmas checagens do CI (1 a 6). Obrigatório antes de todo push: o repositório é público
// e uma branch fica visível antes de o CI rodar.
// Uso: bun scripts/checar.ts [--base origin/main] [--completo]
const args = process.argv.slice(2)
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main'
const completo = args.includes('--completo') ? ['--completo'] : []

const etapas: [string, string[]][] = [
  ['mint validate', ['mint', 'validate']],
  ['mint broken-links', ['mint', 'broken-links', '--check-anchors']],
  ['frontmatter', ['bun', 'scripts/check-frontmatter.ts']],
  ['navegação', ['bun', 'scripts/check-navegacao.ts', ...completo]],
  ['imagens', ['bun', 'scripts/check-imagens.ts']],
  ['dados sensíveis', ['bun', 'scripts/check-sensivel.ts', '--base', base]],
]

let falhou = false
for (const [nome, cmd] of etapas) {
  const r = Bun.spawnSync(cmd, { cwd: `${import.meta.dir}/..`, stdout: 'pipe', stderr: 'pipe' })
  // Limpa os spinners do mint para a saída ficar legível
  const saida = (r.stdout.toString() + r.stderr.toString()).replace(/\x1b\[[0-9;]*[A-Za-z]/g, '').replace(/^.*⠋.*$|^.*[⠙⠹⠸⠼⠴⠦⠧⠇⠏].*$/gm, '').trim()
  if (r.exitCode === 0) console.log(`✓ ${nome}`)
  else {
    falhou = true
    console.log(`✗ ${nome}\n${saida}\n`)
  }
}
process.exit(falhou ? 1 : 0)
