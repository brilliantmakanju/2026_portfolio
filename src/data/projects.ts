// Project cards rendered from verified repository code.
// Every schema, folder and count below was checked against the actual repos.

export type Diagram = {
  key: string;
  label: string;
  caption: string;
  /** Inline mermaid source (rendered lazily by the runtime). */
  code?: string;
  /** Path to a pre-rendered SVG in /public — used instead of `code`. */
  svg?: string;
  /** Initial zoom for static SVGs (1 = fit width). */
  zoom?: number;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  positioning: string;
  status: string;
  statusKind: "live" | "off" | "open";
  timeframe?: string;
  demo?: { src: string; caption: string; label?: string; length?: string };
  liveUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
  repoUrl?: string;
  processorUrl?: string;
  related?: { label: string; href: string };
  stack: string[];
  scope: string[];
  problem: string;
  built: string[];
  decisions: string[];
  diagrams: Diagram[];
  /** Optional "how to use it" block, rendered instead of diagrams. */
  usage?: { cmd: string; note: string }[];
  folder: string;
  proves: string;
};

export const threadchat: Project = {
  id: "threadchat",
  index: "01",
  title: "ThreadChat",
  positioning:
    "A live SaaS for following specific YouTube comment threads, with live updates and versioned edit and deletion history.",
  status: "Live",
  statusKind: "live",
  timeframe: "Jun 2026 - Jul 2026",
  // Temporarily hidden until the demo is ready to show again.
  // demo: {
  //   src: "https://threadchat.jolexhive.com/demo.mp4",
  //   label: "Watch the 20-second demo",
  //   length: "20s",
  //   caption: "A short look at the live inbox and threaded replies.",
  // },
  liveUrl: "https://threadchat.jolexhive.com",
  stack: ["Rust", "Axum", "Tokio", "SvelteKit", "Svelte 5", "TypeScript", "WebSockets", "PostgreSQL", "Redis", "Tailwind CSS 4"],
  scope: ["8-crate Rust workspace", "16 tables · 29 migrations · 76 sqlx-prepared queries", "28 route patterns (34 endpoints) · 4-tier rate limiting", "4-tier polling: 30s–6h Pro, 5m–12h free", "6 Redis pub/sub channel families", "100/500 daily write quota (trial/Pro)"],
  problem:
    "There is no focused way to follow a specific YouTube comment thread. YouTube has notifications, but they are unreliable. Sometimes they never arrive. Sometimes you get pinged and the comment isn't even visible when you open the thread. And there is no history of what was edited or deleted.",
  built: [
    "Rust/Axum REST and WebSocket API on Tokio, with 1-hour JWTs, 30-day refresh tokens and single-use 10-second WebSocket tickets.",
    "Redis pub/sub fanout across six per-thread channels (new, edit, delete, restore, reaction, thread deleted) that every API instance subscribes to.",
    "Tokio polling worker that claims due threads with SKIP LOCKED, scales cadence by activity and Pro status, backs off on failures, and throttles against a Redis daily YouTube quota that resets at Pacific midnight.",
    "Comment sync diffs YouTube against the database to detect new, edited and deleted comments, writing each change to comment_history as a version.",
    "Google OAuth login and YouTube OAuth link (youtube.force-ssl), with refresh tokens encrypted using AES-256-GCM.",
    "SvelteKit 5 frontend on Cloudflare with runes, TanStack Query, cookie sessions, and a WebSocket client that patches open threads live.",
    "Paddle checkout, customer portal and idempotent webhooks (processed_webhook_events) drive the Pro role; the Dodo client exists but its routes are commented out.",
    "Manifest V3 Chrome side panel that opens the same inbox on YouTube using the shared cookie session.",
    "Dockerized the Axum API and Tokio polling worker as separate images; the SvelteKit frontend runs as a Cloudflare Worker on threadchat.jolexhive.com.",
  ],
  decisions: [
    "Always wanted to learn Rust, so I picked it over Django and Python to build ThreadChat.",
    "Redis pub/sub over in-process broadcast: fanout survives horizontal scaling across API instances.",
    "Connection pooling and partial indexes over per-tick scans: the scheduler claims only threads whose next_poll_at is due.",
    "Single-use WebSocket tickets over putting the JWT in the URL: the credential lives 10 seconds, stays in memory, and is consumed atomically.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Sixteen tables from the 29 SQL migrations; core relationships shown, plus waitlist, checkout_attempts and processed_webhook_events.",
      svg: "/diagrams/threadchat-db.svg",
    },
  ],
  folder: `threadchat/
├── tw/                          # Rust workspace
│   ├── crates/                  # tw-api · tw-polling · tw-core · tw-domain
│   │                            # tw-infrastructure · tw-jobs · tw-macros · tw-telemetry
│   ├── migrations/              # 29 SQL migrations
│   ├── .sqlx/                   # 76 offline query caches
│   ├── scripts/                 # dev.sh
│   ├── docker-compose.yml
│   ├── Dockerfile.twapi
│   └── Dockerfile.twpolling
├── frontend/                    # SvelteKit 5 app (Cloudflare adapter)
│   ├── src/routes/              # api proxy · (app) · auth · blog · pricing
│   ├── src/lib/                 # api · state · clients · components
│   └── static/
└── extension_2/                 # Manifest V3 Chrome side panel`,
  proves: "Real-time state, background ingestion, and paid access coordinating across Rust, PostgreSQL, and Redis.",
};

export const pushtodraft: Project = {
  id: "pushtodraft",
  index: "02",
  title: "Push to Draft",
  positioning:
    "A multi-tenant Django/Next.js SaaS built to turn GitHub commits into platform-tailored social posts; its shared backend became the JolexHive SaaS starter kit.",
  status: "Decommissioned",
  statusKind: "off",
  timeframe: "Jan 2025 - Jan 2026",
  backendUrl: "https://github.com/brilliantmakanju/pushtodraftbackend",
  frontendUrl: "https://github.com/brilliantmakanju/commit-to-post-ui",
  stack: ["Python", "Django", "DRF", "PostgreSQL", "django-tenants", "Next.js 16", "React 19", "Zustand", "TanStack Query", "Tailwind CSS 4", "Axios", "Dodo Payments"],
  scope: [
    "4 publish handlers (Twitter, LinkedIn, Slack, Discord)",
    "2 OAuth flows (Twitter, LinkedIn) + Discord webhook; Fernet-encrypted tokens",
    "Twitter token refresh + health checks",
    "7-model shared billing app (Dodo) with plan-change history",
    "5 base prompts, 9 tone presets, per-platform rules",
    "django-tenants schema isolation",
    "Starter kit reused by BranchForge, PlaylistDNA and PlaythroughEditor",
  ],
  problem:
    "Developers want to share code updates on social media, but turning a commit into a platform-appropriate post by hand is tedious, so it gets skipped.",
  built: [
    "Multi-tenant Django SaaS on django-tenants: shared apps in the public schema and product models in per-organization schemas.",
    "GitHub App install, reconnect and disconnect flows, plus a signed webhook receiver with delivery logs and a 100-call/hour per-organization rate limit.",
    "Versioned prompt engine with five base-prompt generations, nine tone presets, per-platform rules and a streamed Llama 3 70B completion.",
    "Post and PostGroup models for drafts, scheduling, media, soft delete and per-integration publish tracking across four platforms.",
    "Publisher handlers for Twitter, LinkedIn, Slack and Discord; Twitter tokens refresh ahead of expiry and are health-checked.",
    "OAuth flows for Twitter and LinkedIn plus a Discord webhook connect flow; tokens are Fernet-encrypted at rest.",
    "Shared JolexHive starter kit for auth (Allauth + Sesame + JWT), tenants/roles/invites, billing, email, alerts, cron and feature flags.",
    "BranchForge and PlaylistDNA run as tenant apps in the same backend; PlaythroughEditor reuses the starter-kit base with product-specific changes.",
  ],
  decisions: [
    "Schema-per-tenant over row-level isolation: stronger data boundaries and simpler per-tenant queries.",
    "Fernet encryption over plain storage: third-party OAuth tokens and webhook URLs are encrypted before they reach the database.",
    "A reusable starter kit over copy-paste: shared auth, tenancy, billing, email, alerts and cron live once; each product adds tenant-scoped models.",
    "Registry-based downgrade handlers over hard-coded billing rules: each app declares what to pause when a plan drops.",
    "Versioned prompts and external config over one hard-coded prompt: tones and platform rules change without rewriting the generator.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Public schema holds organizations, accounts, roles and billing (seven models in the app; the four core tables are shown). Repository, post and integration tables live in each organization's tenant schema. OAuth token columns are Fernet-encrypted.",
      svg: "/diagrams/pushtodraft-db.svg",
      zoom: 2.51,
    },
  ],
  folder: `jolexhive/
├── backend/
│   ├── push_draft/              # commit-to-post app (decommissioned)
│   │   ├── models/              # post, repository, integration, webhook
│   │   ├── ai_prompts/          # 5 base prompts + article prompt
│   │   ├── serializers/
│   │   └── views/posting/       # posts, OAuth, webhooks, dashboard
│   ├── branchforge/             # tenant app: causal simulation
│   ├── playlistdna/             # tenant app
│   ├── payment/                 # 7-model billing app, Dodo webhooks
│   ├── tenants/                 # orgs, domains, roles, invites
│   ├── authentication/          # Allauth + Sesame + JWT
│   ├── communication/           # email + export requests
│   ├── alerts/                  # notifications
│   ├── cron_triggers/
│   ├── core/                    # feature flags, Studio apps
│   └── config/
└── frontend/                    # Next.js 16 app
    ├── app/                     # dashboard, forge, playlistdna, settings, checkout
    ├── components/
    ├── hooks/
    ├── lib/
    └── zustand/`,
  proves: "Tenant isolation, encrypted third-party credentials, and a reusable SaaS foundation that later products build on.",
};

export const branchforge: Project = {
  id: "branchforge",
  index: "03",
  title: "BranchForge",
  positioning:
    "A causal what-if engine that builds a seven-stage scenario from curated facts and stores a trace for every step.",
  status: "Waitlist",
  statusKind: "open",
  timeframe: "Dec 2025 - Jan 2026",
  stack: [
    "Python",
    "Django",
    "DRF",
    "PostgreSQL",
    "django-tenants",
    "Next.js",
    "React",
    "TypeScript",
    "React Flow",
    "TanStack Query",
    "OpenRouter",
  ],
  scope: [
    "7-stage LLM pipeline",
    "5 tenant models + 2 shared models",
    "4 causal link types",
    "0.30 prompt-level confidence threshold",
    "SHA-256 branch identity",
  ],
  problem:
    "Ask an LLM a what-if question and it usually answers in free text: no fact inventory, no explicit cause-effect graph, and no record of which source supported which step.",
  built: [
    "Seven sequential prompt stages: load and inherit, map affected nodes, propose an initial DAG, reflect and augment, propagate and simulate, critique and verify, final synthesis. Stages 3-6 route to the reasoning model; Stages 1, 2 and 7 use the fast model, with settings overrides for both.",
    "Stage 1's validation prompt checks fact count, intervention grounding, conflicts and schema errors. A false proceed flag marks the branch failed before Stages 2-7; malformed JSON at any stage also fails the branch.",
    "Every completed stage writes a SimulationStage row with parsed JSON, raw output, token count and the last prompt message, plus an AuditEntry. Fork, halt, completion and error events also write audit rows.",
    "GroundedFact rows carry source URL, publication date, confidence, half-life, entities and affected variables. The runner computes an exponential half-life weight for every fact and injects the fact inventory, immediate parent summary and intervention into each prompt.",
    "Stage 3's prompt specifies a topological sort and weakest-edge cycle breaking; Stage 3 and Stage 4 DAG edges are persisted as CausalLink rows with link type (direct, confounder, mediator, collider), strength, sign, lag, effect magnitude, source fact IDs and confidence.",
    "Stage 5's prompt applies a do-operator: sever incoming edges to the intervention, propagate effects through the refined DAG and produce outcome ranges. Stage 6 is an adversarial critique; Stage 7 synthesizes narrative, outcomes, risks and sources.",
    "BranchNode is a self-referencing tree with parent, depth, scenario and root flags. Its SHA-256 hash is derived from parent hash, intervention and creation time and stored once; origin_stage and origin_audit_entry record what spawned a fork.",
    "DRF API: branch CRUD, get-or-create-root, fork-from-scenario and fork-from-parent. The pipeline runs synchronously inside the fork request.",
    "Next.js and React Flow frontend: scenario dashboard, branch canvas with a fork modal, 1s/3s polling while a branch is pending or simulating, and a side panel for narrative, outcomes, causal chain, sources and risks.",
    "Runs as a tenant app on the shared JolexHive django-tenants base. Scenario and GroundedFact live in the shared schema; the five BranchForge tables live in each tenant schema.",
  ],
  decisions: [
    "Seven explicit stages over one prompt: every stage leaves a stored trace and a clear failure point instead of one opaque answer.",
    "Prompt-level 0.30 confidence checks, with Stage 1's proceed flag enforced by the runner; later stages return halt or error payloads rather than stopping the loop.",
    "DAG-first prompting over free-text reasoning: Stages 3 and 4 must commit to typed edges, strengths, signs and lags.",
    "Reasoning-model routing for Stages 3-6 and fast-model routing for Stages 1, 2 and 7, with settings overrides for each class.",
    "Synchronous pipeline over a task queue: simpler request flow and immediate serialization, at the cost of long-running HTTP requests.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Five tenant tables plus shared User, Scenario and GroundedFact. BranchNode is a self-referencing tree (parent, SET_NULL); origin_stage and origin_audit_entry are nullable FKs that record which stage or audit event spawned a fork. source_fact_ids is JSON, not a foreign key.",
      svg: "/diagrams/branchforge-db.svg",
      zoom: 1.74,
    },
    {
      key: "arch",
      label: "Architecture",
      caption:
        "Compact view. The DRF fork action runs all seven stages synchronously; Stages 2-4 map nodes, propose the DAG and refine it. Stage 1 can stop the run when its proceed flag is false. Each stage writes a trace to Postgres, and Stages 3/4 also write typed CausalLinks. The 0.30 confidence threshold is in the prompts; only Stage 1's flag is enforced by the runner.",
      code: `graph LR
    API[DRF fork] --> S1[1 Validate]
    S1 -->|proceed| S2[2-4 Build DAG]
    S1 -->|stop| Fail[Mark failed]
    S2 --> S5[5 Propagate]
    S5 --> S6[6 Critique]
    S6 --> S7[7 Synthesize]
    S7 --> DB[(Postgres trace)]`,
    },
  ],
  folder: `jolexhive/
├── backend/branchforge/
│   ├── models/                # 5 tenant models
│   ├── services/simulation.py # 7-stage runner
│   ├── prompts/v1/stages/     # one prompt per stage
│   ├── views/                 # branch CRUD + fork actions
│   ├── serializers/
│   ├── utils/ai/              # prompt loader
│   ├── admin/
│   └── migrations/
└── frontend/
    ├── app/app/branchforge/   # landing + waitlist
    ├── app/(authenticated)/forge/[forgeid]/
    └── components/apps/branchforge/
        ├── branch/            # React Flow canvas, fork modal, side panel
        ├── dashboard/
        └── landing/`,
  proves:
    "Multi-stage LLM orchestration with a stored trace per stage, typed causal links and a forkable branch tree on a shared multi-tenant base.",
};

export const playthrougheditor: Project = {
  id: "playthrougheditor",
  index: "04",
  title: "PlaythroughEditor",
  positioning: "A browser editor that turns chat instructions into timeline edits, then hands the render to a GPU worker.",
  status: "Decommissioned",
  statusKind: "off",
  timeframe: "Dec 2025 - Jan 2026",
  repoUrl: "https://github.com/brilliantmakanju/playthrougheditor",
  processorUrl: "https://github.com/brilliantmakanju/video_processor_gpu_infra",
  related: { label: "PlaythroughProcessor", href: "#playthroughprocessor" },
  stack: ["Python", "Django 5.2", "DRF", "Next.js 15.5", "React 19", "Zustand", "PostgreSQL", "Redis", "Cloudflare R2", "RunPod"],
  scope: [
    "20 Django models across 6 apps",
    "6 edit types, 4 creatable through chat",
    "30-second debounced autosave",
    "RunPod export with presigned R2 source upload and output PUT",
    "Dodo checkout and signed webhooks; Paddle handler retained",
  ],
  problem:
    "Video creators need to edit gameplay footage through natural language instructions without learning timeline-based editing software.",
  built: [
    "Next.js 15.5 editor with a video canvas, timeline, chat panel, edit stack, subtitle blocks and export modal.",
    "Server-side /api/ai/chat proxy streams OpenAI-compatible completions, replaces 15 known prompt-injection patterns, strips control characters, and applies a 20-per-minute rate limit, 4,000-character message cap and 60-second timeout.",
    "Zustand owns the edit list, subtitles and chat history; chat JSON is merged only when it does not overlap an existing edit, then autosaved as a full project snapshot after 30 seconds.",
    "Django/DRF Project and Edit models keep raw edit properties in JSON; a project PATCH replaces the Edit rows from the editor snapshot and rebuilds editor-facing refs when the project is read back.",
    "New-project wizard checks 16:9 and a 4,900-second duration constant (its error copy still says 30 minutes), uploads the source and thumbnail through presigned R2 PUTs, and caches the source locally in IndexedDB for preview.",
    "RunPod export proxy creates a 2-hour presigned R2 output PUT, submits video URL, edit JSON, paid flag and target resolution, then polls RunPod every 5 seconds for up to 40 minutes.",
    "Per-user querysets plus TenantAccessPermission tie projects and edits to both the authenticated account and the tenant domain.",
    "Billing scaffolding remains in the tree: Dodo checkout route, signed webhook handler, payment models and a Paddle webhook.",
    "Published as a single Apache-2.0 monorepo with root setup docs, architecture notes, the database schema diagram, Docker Compose for PostgreSQL and Redis, and CI.",
  ],
  decisions: [
    "Next.js over server-rendered Django pages: the timeline, local video preview and streaming chat all need client-side state.",
    "Keep the AI key behind a server route: validation, prompt-injection filtering and per-IP rate limiting stay out of the browser.",
    "Let chat add edits, not rewrite them: the assistant can create zoom, speed, cut and text, but cannot modify or delete existing timeline items.",
    "Store a JSON snapshot alongside normalized Edit rows: the snapshot loads the editor quickly, while the rows keep the timeline queryable; each save replaces the row set.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Selected tables: Project and Edit live in the tenant schema; ExportRequest stores project_id as a plain UUID reference, not a database FK.",
      svg: "/diagrams/playthrougheditor-db.svg",
    },
  ],
  folder: `playthrougheditor/
├── .github/workflows/           # CI: lint, type-check, build, Django check
├── docs/                        # architecture, database-schema.svg
├── backend/
│   ├── authentication/          # JWT, billing, downgrade service
│   ├── communication/           # ExportRequest, email
│   ├── tenant_core/             # Project, Edit, export views
│   ├── tenants/                 # organizations, domains, roles
│   ├── alerts/                  # notifications
│   ├── core/                    # feature flags
│   ├── cron_triggers/
│   └── config/
├── frontend/
│   ├── app/api/ai/chat/         # server-side streaming proxy
│   ├── app/(authenticated)/editor/
│   ├── components/editor/       # chat, timeline, edits, export
│   ├── hooks/                   # autosave, export, upload
│   ├── zustand/                 # editor store
│   ├── lib/                     # AI, R2, API client
│   └── config/                  # site metadata and R2 host
├── docker-compose.yml           # PostgreSQL + Redis
├── LICENSE                      # Apache-2.0
└── README.md                    # setup, architecture, GPU worker link`,
  proves: "Server-streamed AI editing, a typed editor state machine, tenant-scoped persistence and a deferred GPU render handoff.",
};

export const playthroughprocessor: Project = {
  id: "playthroughprocessor",
  index: "05",
  title: "PlaythroughProcessor",
  positioning: "The RunPod worker built to turn PlaythroughEditor timeline JSON into an MP4 with NVENC.",
  status: "Decommissioned",
  statusKind: "off",
  timeframe: "Dec 2025 - Jan 2026",
  repoUrl: "https://github.com/brilliantmakanju/video_processor_gpu_infra",
  related: { label: "PlaythroughEditor", href: "#playthrougheditor" },
  stack: ["Python", "FFmpeg 7.1.3", "NVENC/NVDEC", "CUDA 12.8", "RunPod", "Docker"],
  scope: [
    "4 effects: zoom, speed, subtitles, watermark",
    "4 output sizes: 360p, 480p, 720p, 1080p",
    "2 concurrent segments; 10-minute segment and concat caps",
    "2-hour global job alarm",
    "HTTP + Google Drive input; R2 + GoFile + public-URL output",
    "NVENC CQ 23; libx264 CRF 23 fallback path",
  ],
  problem:
    "GPU video processing is expensive and easy to misconfigure, especially when quality presets and VRAM budgets must hold under load.",
  built: [
    "RunPod handler validates a job, starts a 2-hour SIGALRM, downloads the source and edit map, and returns a JSON result with the delivery URL, processing time and output size.",
    "Timeline planner splits at every edit and cut boundary, drops cut ranges, attaches overlapping subtitles and marks untouched same-resolution ranges as stream-copy candidates.",
    "Two-thread segment renderer stream-copies clean ranges and otherwise uses CUDA decode, scale_cuda Lanczos, h264_nvenc VBR at CQ 23, spatial and temporal AQ, and a 32-surface limit.",
    "Hybrid path keeps drawtext and watermark filters on the CPU, then uploads frames back to CUDA for NVENC; unpaid jobs get a watermark when WATERMARK_URL is set.",
    "Disk guards: a source over 500 MB with less than 6 GB free is recompressed to 3 Mbps with NVENC; under 3 GB free, CQ rises to 26.",
    "Final assembly uses the concat demuxer, stream copy and faststart; output goes to a presigned R2 PUT, GoFile as the no-URL fallback, or the caller's public URL.",
    "Docker builds FFmpeg 7.1.3 from source with NVENC, NVDEC and CUDA on a CUDA 12.8.1 base, targeting sm_89; the handler deletes temp files and clears its alarm in finally.",
  ],
  decisions: [
    "RunPod serverless over a persistent GPU: auto-scaling with zero idle cost.",
    "Cap at 2 concurrent segments instead of unlimited parallelism: the config comments and L4 surface limits favour predictable VRAM use over maximum throughput.",
    "Stream-copy untouched ranges instead of re-encoding everything: faster, and avoids a generation of quality loss.",
    "Join with -c copy instead of a final encode: near-instant assembly, but it assumes every segment shares codec, resolution and timebase.",
  ],
  diagrams: [
    {
      key: "arch",
      label: "Architecture",
      caption:
        "Job in, 2-hour alarm set, input validated. The worker downloads the video and edit map, re-compresses the source when disk is tight, probes it, splits the timeline at every edit boundary (dropping cuts, attaching subtitles and effects), and renders two segments at a time: copyable ranges are stream-copied, the rest go through speed, zoom, subtitle and watermark filters on a CUDA + NVENC path or a libx264 fallback. Parts are joined with -c copy and faststart, then delivered through an R2 presigned PUT, GoFile, or a caller public URL. The handler returns URL, time and size, then deletes its temp files. It never touches the database.",
      code: `flowchart LR
    subgraph Ingest["1 · Ingest"]
        direction TB
        Job["RunPod serverless job<br/>CUDA 12.8 · FFmpeg 7.1.3"] --> Timeout["Start 2-hour timeout"]
        Timeout --> Validate["Validate input<br/>video · edit map · resolution · paid flag"]
        Validate --> Fetch["Download video + edit map<br/>HTTP · Google Drive · inline JSON<br/>3 attempts"]
        Fetch --> Shrink["Disk guard<br/>big file + low space<br/>re-compress to 3 Mbps (NVENC)"]
    end

    subgraph Plan["2 · Plan"]
        direction TB
        Probe["ffprobe metadata<br/>resolution · fps · audio · duration"] --> Parse["Parse edit map<br/>zoom · speed · cut · subtitles"]
        Parse --> Res["Choose output size<br/>360p · 480p · 720p · 1080p<br/>or original"]
        Res --> Segments["Build segment plan<br/>split at every edit boundary<br/>drop cuts · attach effects"]
        Segments --> Quality["Quality guard<br/>CQ 26 when free disk under 3 GB"]
    end

    subgraph Render["3 · Render"]
        direction TB
        Prep["Prepare render<br/>check GPU · watermark for unpaid jobs"] --> Workers["Render segments<br/>2 workers · 10-minute cap each"]
        Workers --> Copy["Copyable ranges<br/>stream copy"]
        Workers --> Effects["Apply effects<br/>speed · zoom · subtitles · watermark"]
        Effects --> Encode["Encode<br/>CUDA + NVENC<br/>CPU hybrid<br/>libx264 fallback"]
        Copy --> Join["Join segments<br/>-c copy · faststart"]
        Encode --> Join
    end

    subgraph Deliver["4 · Deliver"]
        direction TB
        Upload["Upload result<br/>R2 presigned PUT if upload_url<br/>GoFile if no URL at all<br/>else reuse public_url"] --> Result["Return JSON<br/>URL · time · output size"]
        Result --> Cleanup["finally<br/>delete temps · clear timeout"]
    end

    Ingest --> Plan
    Plan --> Render
    Render --> Deliver`,
    },
  ],
  folder: `playthroughprocessor/
├── effects/               # zoom, speed, caption, watermark (color disabled)
├── processor/             # analyzer, timeline, segment + final renderers
├── storage/               # R2, GoFile, Google Drive, downloader
├── utils/                 # FFmpeg, GPU detection, retries
├── handler.py             # RunPod serverless entry
├── config.py              # encoder, timeouts, resolutions, watermark
└── Dockerfile             # CUDA 12.8 + FFmpeg 7.1.3`,
  proves: "Timeline segmentation, hardware-accelerated encoding, disk and VRAM limits, and storage handoff in a serverless GPU worker.",
};

export const hiringradar: Project = {
  id: "hiringradar",
  index: "06",
  title: "HiringRadar",
  positioning: "A Python CLI that finds companies that are hiring, enriches them with Gemini and exports a clean list.",
  status: "CLI tool",
  statusKind: "open",
  timeframe: "Sep 2025 - Oct 2025",
  stack: ["Python", "SQLite", "Gemini", "aiohttp", "BeautifulSoup", "Rich", "Tkinter"],
  scope: [
    "4 discovery sources: Hacker News, GitHub, search engines and job boards",
    "SQLite store with company, description, robots and session tables",
    "Markdown, CSV and PDF exports",
    "CLI plus a Tkinter desktop GUI",
  ],
  problem:
    "Finding companies that are actually hiring means checking job boards, hiring threads and career pages by hand. The data is inconsistent, duplicated and stale quickly.",
  built: [
    "Python CLI with one-shot, scheduled, stats, database-search and export commands.",
    "Discovers companies from Hacker News hiring threads, GitHub search, search engines and job boards, then resolves domains and checks career pages.",
    "Stores each company in SQLite, writes a Markdown file per company, and exports daily CSV files and a PDF report.",
    "Uses Gemini to generate company descriptions and caches the generated text in SQLite.",
    "Checks robots.txt, rotates user agents and applies delays and exponential backoff between requests.",
  ],
  decisions: [
    "SQLite over a server database: one portable file that runs on a small droplet and is easy to copy.",
    "Multiple discovery sources over one job board: each source finds companies the others miss.",
    "Keep the data portable: SQLite, Markdown and CSV all carry the same records.",
  ],
  diagrams: [],
  folder: `hiringradar/
├── hiringradar/          # discovery, careers, storage, AI, HTTP, database
├── companies_md/         # one Markdown file per company
├── exports/              # daily and master CSV files
├── main.py               # CLI entry
├── gui.py                # Tkinter GUI
└── requirements.txt`,
  proves: "A small data pipeline: discover, enrich, deduplicate, store and export.",
};

export const vulti: Project = {
  id: "vulti",
  index: "07",
  title: "Vulti",
  positioning: "A single-file Bash CLI that remembers terminal commands and rebuilds a machine after a reinstall.",
  status: "Open Source",
  statusKind: "open",
  timeframe: "Dec 2025",
  repoUrl: "https://github.com/brilliantmakanju/vulti",
  stack: ["Bash", "Linux", "Git"],
  scope: ["12 distro IDs across 3 package-manager families", "9 subcommands in a zero-dependency single file", "Zip restore with dry-run mode"],
  problem:
    "Reinstalling a Linux machine means re-remembering dozens of install commands and package lists.",
  built: [
    "Single Bash script with add, run, list, rm, view, save, backup, restore and reset commands.",
    "Pipe-delimited command store at ~/.vulti/commands.db, so no database is required.",
    "Distro detection for Arch, Debian/Ubuntu and Fedora, mapping to pacman, apt and dnf.",
    "System snapshot of packages and ~/.config into a portable zip archive.",
    "Install script and MIT license.",
  ],
  decisions: [
    "Pure Bash over a compiled binary: runs on any Linux box with no runtime.",
    "Flat file over SQLite: greppable, editable and zero-dependency.",
    "Zip archive over a sync service: backups stay local and portable.",
  ],
  diagrams: [],
  usage: [
    { cmd: "vulti add obs --cmd 'sudo pacman -S obs-studio'", note: "save a command under a tag" },
    { cmd: "vulti run obs", note: "run it; add --sudo or --bg when needed" },
    { cmd: "vulti list", note: "see every saved tag and command" },
    { cmd: "vulti save", note: "snapshot installed packages and ~/.config" },
    { cmd: "vulti backup", note: "zip the command store, configs and snapshots" },
    { cmd: "vulti restore --from backup.zip", note: "restore on a reinstalled machine" },
  ],
  folder: `vulti/
├── vulti                  # single-file Bash CLI
├── install.sh
├── README.md
├── LICENSE
├── monetization.md
└── testing_plan.md`,
  proves: "Tooling instincts: a zero-dependency CLI that solves a real repeated problem.",
};

