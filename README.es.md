# Agent Skills

50 procedimientos en inglés, generalizados para verificación, agentes, infraestructura, seguridad y método de trabajo. Cada directorio contiene un `SKILL.md` estándar con sólo `name` y `description` en el frontmatter. No se incluyen skills ejecutables, plantillas, plugins ni credenciales.

[English](README.md) · [Licencia MIT](LICENSE) · [Mapa de fuentes](SOURCE-MAP.md)

## Confianza y alcance

Leé cada skill antes de habilitarlo. El texto no concede herramientas, cuentas, permisos ni autoridad. Las pruebas deliberadas requieren fixtures desechables y canarios sintéticos, nunca producción. Imports y comandos dry-run pueden tener efectos; un stub no es aislamiento de red. Usá privilegios mínimos y autorizaciones separadas para datos sensibles, efectos externos o acciones irreversibles.

Es una colección estándar Agent Skills, no un plugin de Claude Code ni Codex. La compatibilidad se refiere al formato portable y a las ubicaciones documentadas. No certifica comportamiento en todos los runtimes, modelos o infraestructuras. No se ejecutaron todos los procedimientos como pruebas de integración.

Preferí un subconjunto pertinente: las descripciones consumen contexto de descubrimiento aunque los cuerpos se carguen progresivamente. No se garantiza que las 50 entren en el presupuesto de cualquier plataforma. Evitá nombres duplicados y mantené actualizadas las instrucciones superiores de seguridad y autorización, aunque cambie la caché.

## Instalación

Los comandos de registro corresponden a una versión publicada y aprobada; preparar este repositorio no prueba una publicación npm. Revisá primero las fuentes y la lista de archivos del paquete.

### Pi

`pi install npm:@otixe/agent-skills`

Para un checkout local revisado: `pi install /path/to/agent-skills`. Elegí los recursos pertinentes con `pi config`. Se declara `skills/`, sin extensiones, prompts ni temas. Consultá la [documentación de paquetes](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md) de tu versión para instalación por proyecto y filtros.

### Claude Code y Codex

Desde un checkout revisado, copiá un directorio elegido. Ejemplo en Bash: comprobá el destino y no sobrescribas uno existente.

```bash
skill=redaction-before-truncation
destination="$HOME/.claude/skills"
mkdir -p "$destination"
test ! -e "$destination/$skill" && cp -R "skills/$skill" "$destination/"
```

Claude Code usa `~/.claude/skills` para skills personales y `.claude/skills` por proyecto. Codex usa `~/.agents/skills` y `.agents/skills`, respectivamente. Para Codex cambiá `destination` a `"$HOME/.agents/skills"`. Conservá juntos directorio y `SKILL.md`; respetá la recarga de tu plataforma.

Referencias oficiales: [Agent Skills](https://agentskills.io/specification), [Claude Code](https://code.claude.com/docs/en/skills), [Codex](https://learn.chatgpt.com/docs/build-skills).

## Índice por categoría

Los identificadores son iguales en ambos idiomas; los cuerpos están en inglés.

### QA y verificación (17)

- [`executable-definition-of-done`](skills/executable-definition-of-done/SKILL.md)
- [`counterfactual-baseline-testing`](skills/counterfactual-baseline-testing/SKILL.md)
- [`positive-controls-for-absence`](skills/positive-controls-for-absence/SKILL.md)
- [`independent-dedup-audit`](skills/independent-dedup-audit/SKILL.md)
- [`parser-failure-mode-testing`](skills/parser-failure-mode-testing/SKILL.md)
- [`purpose-vs-literal-compliance`](skills/purpose-vs-literal-compliance/SKILL.md)
- [`rollback-and-dedup-effect-testing`](skills/rollback-and-dedup-effect-testing/SKILL.md)
- [`scoped-regression-review`](skills/scoped-regression-review/SKILL.md)
- [`audit-by-claim-unit`](skills/audit-by-claim-unit/SKILL.md)
- [`performance-claim-validation`](skills/performance-claim-validation/SKILL.md)
- [`absence-claim-verification`](skills/absence-claim-verification/SKILL.md)
- [`dashboard-render-verification`](skills/dashboard-render-verification/SKILL.md)
- [`python-syntax-vs-runtime-proof`](skills/python-syntax-vs-runtime-proof/SKILL.md)
- [`container-deployment-effect-check`](skills/container-deployment-effect-check/SKILL.md)
- [`lightweight-typescript-scanning`](skills/lightweight-typescript-scanning/SKILL.md)
- [`duplicate-port-listener-triage`](skills/duplicate-port-listener-triage/SKILL.md)
- [`source-to-sink-property-instrumentation`](skills/source-to-sink-property-instrumentation/SKILL.md)

### Pi y agentes (8)

- [`pi-cold-extension-loader-check`](skills/pi-cold-extension-loader-check/SKILL.md)
- [`pi-extension-fetch-seam-testing`](skills/pi-extension-fetch-seam-testing/SKILL.md)
- [`pi-isolated-environment-tests`](skills/pi-isolated-environment-tests/SKILL.md)
- [`pi-live-npm-tree-canary`](skills/pi-live-npm-tree-canary/SKILL.md)
- [`pi-subagent-stall-diagnostics`](skills/pi-subagent-stall-diagnostics/SKILL.md)
- [`pi-supervised-execution`](skills/pi-supervised-execution/SKILL.md)
- [`stable-prompt-cache-methodology`](skills/stable-prompt-cache-methodology/SKILL.md)
- [`fetch-timeout-effect-validation`](skills/fetch-timeout-effect-validation/SKILL.md)

### Infraestructura (12)

- [`read-only-deployment-inspection`](skills/read-only-deployment-inspection/SKILL.md)
- [`bounded-filesystem-recon`](skills/bounded-filesystem-recon/SKILL.md)
- [`disk-cleanup-quarantine`](skills/disk-cleanup-quarantine/SKILL.md)
- [`cron-preflight-alert-abort`](skills/cron-preflight-alert-abort/SKILL.md)
- [`vm-cpu-contention-triage`](skills/vm-cpu-contention-triage/SKILL.md)
- [`virtualization-memory-pressure`](skills/virtualization-memory-pressure/SKILL.md)
- [`isolated-container-cloning`](skills/isolated-container-cloning/SKILL.md)
- [`virtualization-storage-hygiene`](skills/virtualization-storage-hygiene/SKILL.md)
- [`postgres-lock-performance-validation`](skills/postgres-lock-performance-validation/SKILL.md)
- [`postgres-capacity-measurement`](skills/postgres-capacity-measurement/SKILL.md)
- [`postgres-per-row-cost-diagnosis`](skills/postgres-per-row-cost-diagnosis/SKILL.md)
- [`connection-pool-effect-testing`](skills/connection-pool-effect-testing/SKILL.md)

### Seguridad (8)

- [`redaction-before-truncation`](skills/redaction-before-truncation/SKILL.md)
- [`git-history-secret-audit`](skills/git-history-secret-audit/SKILL.md)
- [`safe-git-initialization`](skills/safe-git-initialization/SKILL.md)
- [`no-leak-claim-audit`](skills/no-leak-claim-audit/SKILL.md)
- [`external-effect-audit-without-execution`](skills/external-effect-audit-without-execution/SKILL.md)
- [`end-to-end-kill-switch-audit`](skills/end-to-end-kill-switch-audit/SKILL.md)
- [`asgi-wsgi-auth-middleware`](skills/asgi-wsgi-auth-middleware/SKILL.md)
- [`safe-browser-research`](skills/safe-browser-research/SKILL.md)

### Método (5)

- [`compaction-continuity-check`](skills/compaction-continuity-check/SKILL.md)
- [`verified-jsonl-extraction`](skills/verified-jsonl-extraction/SKILL.md)
- [`traceable-decision-log`](skills/traceable-decision-log/SKILL.md)
- [`delegation-contract-verification`](skills/delegation-contract-verification/SKILL.md)
- [`infrastructure-effect-classification`](skills/infrastructure-effect-classification/SKILL.md)

## Desarrollo y verificación

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm pack --dry-run --ignore-scripts
```

Se requiere Node.js 22 o posterior para desarrollar. El validador aplica un subconjunto portable estricto: nombres únicos en kebab-case minúsculo que coincidan con el directorio, exactamente dos campos string, descripción de hasta 1.024 puntos de código Unicode, UTF-8 válido sin BOM, LF, cuerpo con título y sin symlinks. La especificación admite más campos; esta colección no los usa.

CI valida frontmatter, controles negativos del validador y Markdown. No ejecuta los procedimientos de infraestructura ni certifica privacidad, publicación, permisos o revisión independiente. El payload npm usa una lista explícita: no incluye herramientas de desarrollo, lockfile, CI ni procedencia privada.

Los resultados y límites locales están en la [evidencia](https://github.com/otixe/agent-skills/blob/main/evidence/validation.json), disponible en el repositorio y no en npm. Los checks del productor no son QA independiente. Un cambio posterior invalida el sello y exige revalidar lo pertinente.
