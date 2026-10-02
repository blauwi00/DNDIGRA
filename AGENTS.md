# Instructions for coding agents
Read AI_HANDOFF.md before editing. It records current user requirements and known regressions.
Do not change the running game or deploy unless the owner resumes implementation. Current authorization is source export only.
Use Node.js 24, npm ci, npm run build. Run tests appropriate to the changed behavior.
Browser modules in dist/*.js are partly authored source; do not delete dist wholesale. Generated files: dist/voxel.js, dist/hero-rules.js, dist/inventory-rules.js, dist/client, dist/server.
Keep sprites/SVG icons; no emoji or Unicode substitute icons. Prioritize portrait mobile viewport and readable contrast.
No secrets, player saves, API tokens or credentials in commits. Preserve .openai/hosting.json identity for the existing Site; GitHub export does not deploy it.
Do not claim visual QA from DOM or geometry-only tests.
