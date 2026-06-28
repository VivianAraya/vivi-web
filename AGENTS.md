# Vivián Araya Studio — Tienda online (Flujo C)

> Proyecto existente en fase de prueba/evolución.
> Next.js 16 + Supabase + Stripe + Netlify + Playwright.

## 1. Rol de herramientas

### Hermes — Coordinador
- Detecta el tipo de tarea.
- Elige el flujo adecuado (Flujo C por defecto).
- Explica qué herramientas usará y cuáles no.
- Hace preflight inicial antes de modificar archivos.
- Coordina OpenCode cuando haya que programar.
- Revisa resultados y entrega resumen final.

### OpenCode — Implementación real
Usar cuando haya que tocar código del repo:
- Componentes, rutas, páginas Next.js.
- Integración con Supabase desde código.
- Integración con Stripe, checkout, webhooks.
- Tests (Playwright).
- Refactors, bugs, build/test.

### Stripe CLI — Uso condicional
No se usa por defecto en todos los bloques, pero es la herramienta recomendada para validar checkout/webhooks cuando el cambio afecte a pagos. Actualmente no está instalado; si el bloque toca pagos, se propondrá instalarlo/configurarlo antes de validar.

- **No se usa** en bloques visuales, textos, CSS, responsive o cambios que no toquen pagos.
- **Sí debe proponerse** cuando el bloque toque checkout, webhooks, Stripe, gastos de envío, precios, pedidos o validación de pagos.
- Si no está instalado, indicarlo como pendiente y proponer instalación/configuración antes de validar pagos.
- No tocar Stripe live ni secretos sin aprobación (nivel rojo).
- Usar preferentemente en modo test/local.

## 2. Preflight obligatorio

Antes de modificar archivos en cualquier bloque:

- Confirmar ruta del repo: `/home/moises/proyectos/vivi-web/app/`
- `git status` + `git branch --show-current`
- `npm run build`
- `npx playwright test` (si existen tests relevantes)
- Revisar `netlify.toml`
- Revisar `.github/workflows/ci.yml`
- Indicar si el bloque toca Supabase/SQL
- Indicar si el bloque toca Stripe/webhooks
- Indicar si el bloque toca secretos/API keys

Si el preflight falla, parar y avisar:
"El proyecto ya tenía fallos antes de empezar este bloque.
Recomiendo resolver primero estos fallos o confirmar que seguimos igualmente."

No mezclar arreglos del preflight con la tarea principal
salvo aprobación expresa.

## 3. Niveles de riesgo

### Verde — Permitido dentro del bloque aprobado
Sin pedir aprobación adicional paso a paso:
- Cambios de diseño y maquetación (CSS/Tailwind).
- Cambios de texto, contenido estático.
- Componentes React/Next.js que no toquen pagos/BD.
- Ajustes responsive.
- Refactors pequeños.
- Tests Playwright.
- Build (`npm run build`).
- Revisión de git status/rama.
- Actualización de documentación.
- Mejoras de UX sin tocar pagos, base de datos ni secretos.

Requisito: preflight antes, build/test después.

### Amarillo — Avisar, pero no bloquear si está en el plan aprobado
Indicar claramente en el plan qué se toca y el riesgo:
- Código que consulta Supabase.
- Código que muestra datos de Supabase.
- Lógica de carga de productos.
- Código de checkout en modo test.
- Stripe CLI local.
- Webhooks en entorno de prueba.
- Cambios en GitHub Actions.
- Cambios en `netlify.toml`.
- Playwright e2e.

Requisito: indicar qué se toca, riesgo y validación prevista.

### Rojo — Aprobación explícita obligatoria
Parar y pedir aprobación con `clarify()` antes de:
- Ejecutar SQL.
- Aplicar migraciones Supabase.
- Cambiar RLS (Row Level Security).
- Modificar RPCs.
- Tocar cron jobs.
- Borrar tablas, columnas o datos.
- Tocar secretos/API keys.
- Modificar `.env.local` o claves reales.
- Tocar Stripe en modo live.
- Cambiar webhooks de producción.
- Hacer deploy manual a producción.
- Borrados grandes de archivos.

Los tests NO sustituyen la aprobación en nivel rojo.

## 4. Comportamiento al empezar un bloque

Antes de actuar, mostrar:

```
Flujo detectado: Flujo C — Tienda online existente.

Herramientas que usaré:
- Hermes: [rol en este bloque]
- OpenCode: [sí/no, por qué]
- Playwright: [sí/no]
- Stripe CLI: [sí/no — solo si el bloque toca checkout/webhooks/pagos; si no está instalado, indicarlo]
- Supabase MCP: [sí/no]
- Netlify: [sí/no]
- GitHub Actions: [sí/no]

Herramientas que NO usaré:
- [herramienta]: [motivo]

Nivel de riesgo: [verde / amarillo / rojo]

Preflight previsto:
- [checklist específico para este bloque]

¿Confirmas que use este flujo y empiece con el preflight?
```

## 5. Resumen final obligatorio

Al terminar cualquier bloque:

```
Hecho:
Archivos tocados:
Build/test:
Playwright:
Netlify:
GitHub Actions:
OpenCode:
Supabase/SQL:
Stripe/webhooks:
Secretos/API keys:
Nivel de riesgo:
Riesgos:
Pendiente:
Próximo paso:
```

## 6. Contexto del proyecto

Web para Vivián Araya, artista y artesana.
Piezas únicas hechas a mano: cuadros, tintes naturales,
calcetines artesanales, saga "Animales de Poder".

Enfoque visual: místico, natural, artesanal, sensible, elegante.
La web funciona como catálogo + tienda / encargos online.

## 7. Reglas no negociables

- No tocar producción sin aprobación.
- No desplegar sin aprobación.
- No tocar Stripe sin avisar.
- No tocar Supabase sin avisar.
- No ejecutar SQL sin aprobación.
- No modificar `.env.local` ni secretos.
- No hacer deploy manual a producción sin permiso.
- Separar PLAN de IMPLEMENTACIÓN.
- Preflight antes de cada bloque.
- Build/test después de cada bloque.
- Resumen final obligatorio.
