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
};

export type Project = {
  id: string;
  index: string;
  title: string;
  positioning: string;
  status: string;
  statusKind: "live" | "off" | "open";
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
    "A live SaaS for following specific YouTube comment threads, with reply notifications and edit/deletion history.",
  status: "Live",
  statusKind: "live",
  liveUrl: "https://threadchat.jolexhive.com",
  stack: ["Rust", "Axum", "Tokio", "SvelteKit", "Svelte 5", "TypeScript", "WebSockets", "PostgreSQL", "Redis", "Tailwind CSS 4"],
  scope: ["8-crate Rust workspace", "16 tables · 29 migrations · 76 sqlx-verified queries", "30 API routes · 4-tier rate limiting", "Hot/warm/cold polling scheduler (15min / 8h / 7d)", "6 Redis pub/sub channel families"],
  problem:
    "There is no focused way to track specific YouTube comment threads with notifications and a history of edits and deletions.",
  built: [
    "Rust/Axum REST and WebSocket backend with Redis pub/sub fanout.",
    "Tokio polling worker that claims due threads from the database and fetches them from the YouTube Data API.",
    "SvelteKit frontend with no external state libraries.",
    "Google and YouTube OAuth with AES-encrypted token storage; Paddle billing live for the paid Pro tier (a Dodo Payments client is written but switched off).",
    "Comment edit and deletion history stored per version in comment_history.",
  ],
  decisions: [
    "Always wanted to learn Rust, so I picked it over Django and Python to build ThreadChat.",
    "Redis pub/sub over in-process broadcast: fanout survives horizontal scaling across API instances.",
    "Connection pooling and partial indexes over per-tick scans: the scheduler claims only threads whose next_poll_at is due.",
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
│   ├── crates/
│   │   ├── tw-api/              # Axum REST + WebSocket API
│   │   ├── tw-polling/          # YouTube polling worker
│   │   ├── tw-jobs/
│   │   ├── tw-domain/
│   │   ├── tw-core/
│   │   ├── tw-infrastructure/
│   │   ├── tw-macros/
│   │   └── tw-telemetry/
│   ├── migrations/              # 29 SQL migrations
│   ├── scripts/
│   ├── docker-compose.yml
│   └── Dockerfiles              # twapi · twpolling
└── frontend/                    # SvelteKit 5 app
    ├── src/routes/              # (app) auth blog conversations login pricing
    ├── src/lib/                 # api clients, stores, notifications
    └── static/`,
  proves: "Real-time state, background ingestion, and paid access coordinating across Rust, PostgreSQL, and Redis.",
};

export const pushtodraft: Project = {
  id: "pushtodraft",
  index: "02",
  title: "Push to Draft",
  positioning: "A multi-tenant SaaS that turns GitHub commits into platform-tailored social posts.",
  status: "Decommissioned",
  statusKind: "off",
  backendUrl: "https://github.com/brilliantmakanju/pushtodraftbackend",
  frontendUrl: "https://github.com/brilliantmakanju/commit-to-post-ui",
  stack: ["Python", "Django", "DRF", "PostgreSQL", "Next.js 16", "React 19", "Zustand", "TanStack Query", "Tailwind CSS", "Axios"],
  scope: ["4 platform publishers (Twitter, LinkedIn, Slack, Discord)", "2 OAuth integrations, Twitter with real refresh and health logic", "7-model billing ledger (Dodo)", "5 generations of the base prompt", "django-tenants schema isolation"],
  problem:
    "Developers want to share code updates on social media, but writing posts from commits by hand is tedious.",
  built: [
    "Multi-tenant Django SaaS with schema-per-tenant PostgreSQL isolation via django-tenants.",
    "AI pipeline that converts GitHub commits into platform-tailored posts, with versioned prompt files.",
    "OAuth integrations for Twitter and LinkedIn with AES-256 encrypted tokens and refresh.",
    "Dodo Payments billing webhooks with an automated plan-downgrade engine.",
    "BranchForge runs as a module inside this backend, with its own frontend route.",
  ],
  decisions: [
    "Schema-per-tenant over row-level isolation: stronger data boundaries and simpler per-tenant queries.",
    "AES-256 token encryption over plain storage: zero-trust handling of third-party OAuth tokens.",
    "Automated downgrade engine over manual enforcement: billing state changes pause excess repositories and integrations without human intervention.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Public schema holds organizations, accounts and roles. Repository data lives in each organization's tenant schema, so the Organization to Repository edge is a tenant boundary, not a shared-schema FK. OAuth token columns are AES-256 encrypted.",
      svg: "/diagrams/pushtodraft-db.svg",
    },
  ],
  folder: `jolexhive/
├── backend/
│   ├── push_draft/              # commit-to-post app
│   │   ├── models/              # post, repository, integration, webhook
│   │   ├── ai_prompts/          # 6 prompt versions
│   │   ├── serializers/
│   │   └── views/posting/       # dashboard, stats, shared mixins
│   ├── branchforge/             # causal simulation module
│   ├── payment/                 # Dodo webhooks + downgrade engine
│   ├── tenants/                 # django-tenants config
│   ├── authentication/
│   ├── communication/
│   ├── alerts/
│   ├── core/
│   └── config/
└── frontend/                    # Next.js 16 app
    ├── app/                     # dashboard, forge, settings, checkout
    ├── components/
    ├── hooks/
    ├── lib/
    └── zustand/`,
  proves: "Tenant isolation, encrypted third-party credentials, and billing state that changes application behavior.",
};

export const branchforge: Project = {
  id: "branchforge",
  index: "03",
  title: "BranchForge",
  positioning:
    "A causal simulation engine that grounds counterfactual scenarios in curated facts and a directed acyclic graph.",
  status: "Decommissioned",
  statusKind: "off",
  stack: ["Python", "Django", "DRF", "PostgreSQL"],
  scope: ["7 pipeline stages", "5 branchforge models + 2 core models", "Confidence threshold 0.30", "SHA-256 branch hashing"],
  problem:
    "Standard LLM scenario generation drifts into speculation and cannot show which facts or causal links produced a conclusion.",
  built: [
    "Seven-stage LLM and causal simulation pipeline that builds directed acyclic graphs from curated facts.",
    "Topological sort to detect and break feedback loops before propagation.",
    "Counterfactual interventions propagated along typed causal edges with time-decay fact weighting.",
    "Confidence gate that halts runs below a 0.30 threshold, plus schema validation on inputs and parsed JSON.",
    "SHA-256 branch hashing for Git-style scenario versioning, per-stage traces, and an append-only audit log.",
  ],
  decisions: [
    "Seven explicit stages over one prompt: each stage is auditable and can be retried independently.",
    "Confidence gate over always-complete output: low-confidence results never reach the user.",
    "DAG-first over free-text reasoning: the structural causal model forces cause-effect commitment.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "BranchNode is a self-referencing tree (parent, SET_NULL); origin_stage and origin_audit_entry are nullable FKs that record which stage or audit event spawned a fork.",
      svg: "/diagrams/branchforge-db.svg",
    },
    {
      key: "arch",
      label: "Architecture",
      caption: "The DRF API drives seven named stages left to right; each stage writes its trace to Postgres.",
      code: `graph LR
    Req[Scenario Request] --> API[DRF API]
    API --> S1[1 Load and Inherit]
    S1 --> S2[2 Map Affected Nodes]
    S2 --> S3[3 Propose Initial DAG]
    S3 --> S4[4 Reflect and Augment]
    S4 --> S5[5 Propagate and Simulate]
    S5 --> S6[6 Critique and Verify]
    S6 --> S7[7 Final Synthesis]
    S7 --> Gate{Confidence >= 0.30}
    Gate -->|Pass| DB[(PostgreSQL)]
    Gate -->|Halt| DB`,
    },
  ],
  folder: `branchforge/
├── models/                # branch_node, causal_link, intervention,
│                          # simulation_stage, audit_entry
├── services/simulation.py # 7-stage pipeline
├── views/
├── serializers/
├── prompts/
├── utils/ai/
├── permissions/
├── middleware/
├── management/
└── admin/`,
  proves: "A multi-stage LLM system with explicit failure boundaries, auditability, and versioned state.",
};

export const playthrougheditor: Project = {
  id: "playthrougheditor",
  index: "04",
  title: "PlaythroughEditor",
  positioning: "A web app that lets creators edit gameplay footage by typing instructions in a chat.",
  status: "Decommissioned",
  statusKind: "off",
  processorUrl: "https://github.com/brilliantmakanju/video_processor_gpu_infra",
  related: { label: "PlaythroughProcessor", href: "#playthroughprocessor" },
  stack: ["Python", "Django", "DRF", "Next.js", "React", "Zustand", "PostgreSQL", "Redis", "RunPod"],
  scope: ["19 database tables across 5 apps", "6 edit types (zoom, speed, text, shake, callout, cut)", "2 unified billing providers (Paddle + Dodo)", "RunPod export pipeline (submit → poll → signed delivery)"],
  problem:
    "Video creators need to edit gameplay footage through natural language instructions without learning timeline-based editing software.",
  built: [
    "Next.js 15 frontend with an editor workspace, chat panel, edit stack, subtitle blocks and an export modal.",
    "Django/DRF backend that stores Project and Edit rows and streams chat responses into an edited JSON config.",
    "Export requests are created server-side and dispatched to a RunPod endpoint via RUNPOD_API_KEY; Redis (django_redis) drives the cache layer behind payment-event dedupe and email throttling.",
    "PostgreSQL tenant schema for Project and Edit; a shared ExportRequest model tracks render status.",
    "Dual billing stack unified behind PaymentProvider/PaymentCustomer models: Paddle (subscription management with signature-verified webhooks) and Dodo (checkout), plus a plan-downgrade engine, on a django-tenants base.",
  ],
  decisions: [
    "Django and DRF over FastAPI: reuse a battle-tested SaaS foundation for auth, billing, and tenants.",
    "RunPod serverless over self-hosted GPU: pay only for GPU seconds with no idle cost.",
    "Chat edits merged into a JSON config over a manual timeline: removes the learning curve of traditional editors.",
  ],
  diagrams: [
    {
      key: "db",
      label: "Database",
      caption:
        "Project and Edit live in the tenant schema; ExportRequest stores project_id as a plain UUID reference, not a database FK.",
      svg: "/diagrams/playthrougheditor-db.svg",
    },
  ],
  folder: `playthrougheditor/
├── backend/
│   ├── authentication/          # JWT + payment (paddle.py)
│   ├── communication/           # ExportRequest
│   ├── tenant_core/             # Project, Edit
│   ├── tenants/
│   ├── core/
│   ├── alerts/
│   ├── cron_triggers/
│   └── config/
├── frontend/
│   ├── app/                     # Next.js routes
│   ├── components/editor/       # chat, edits, export
│   ├── zustand/                 # editor store
│   ├── hooks/
│   ├── lib/
│   ├── store/
│   └── types/`,
  proves: "A product that coordinates uploads, LLM interpretation, a render job, and signed storage delivery.",
};

export const playthroughprocessor: Project = {
  id: "playthroughprocessor",
  index: "05",
  title: "PlaythroughProcessor",
  positioning: "The GPU worker that renders PlaythroughEditor jobs with NVENC/NVDEC on RunPod serverless.",
  status: "Decommissioned",
  statusKind: "off",
  repoUrl: "https://github.com/brilliantmakanju/video_processor_gpu_infra",
  related: { label: "PlaythroughEditor", href: "#playthrougheditor" },
  stack: ["Python", "FFmpeg (NVENC)", "RunPod", "Docker"],
  scope: ["4 active effect modules + CPU/GPU dual paths", "4 output presets + original passthrough", "2 parallel workers with 10-minute segment caps", "R2 + GoFile upload, Google Drive download", "2-hour global timeout", "NVENC CQ 23 with a libx264 CRF 23 fallback"],
  problem:
    "GPU video processing is expensive and easy to misconfigure, especially when quality presets and VRAM budgets must hold under load.",
  built: [
    "RunPod serverless handler that validates a job, downloads the source and edit map, and returns a JSON result with the delivery URL, processing time and output size.",
    "NVENC/NVDEC hardware encode and decode with CUDA-accelerated Lanczos scaling.",
    "Disk-aware quality control: source re-compression to 3 Mbps when space is tight and a CQ 26 fallback under 3 GB free.",
    "Edit-map interpreter that splits the timeline at every edit boundary, drops cut ranges, attaches subtitles and marks ranges that can skip re-encoding.",
    "Two-worker segment rendering with a 10-minute cap per segment, plus a 2-hour global alarm and structured error payloads.",
    "Hybrid CPU/GPU design that offloads GPU-unsupported filters to the CPU before re-encoding on GPU.",
    "Smart copy mode that stream-copies untouched ranges and concatenates with -c copy + faststart.",
    "Delivery through an R2 presigned PUT, a caller-provided public URL, or GoFile as the fallback.",
  ],
  decisions: [
    "RunPod serverless over a persistent GPU: auto-scaling with zero idle cost.",
    "Worker cap of 2 over unlimited parallelism: prevents VRAM allocation failures on L4.",
    "Smart copy mode over always-reencode: faster for segments that need no processing.",
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
        Validate --> Fetch["Download video + edit map<br/>HTTP · Google Drive · inline JSON<br/>3 retries"]
        Fetch --> Shrink["Disk guard<br/>big file + low space<br/>re-compress to 3 Mbps (NVENC)"]
    end

    subgraph Plan["2 · Plan"]
        direction TB
        Probe["ffprobe metadata<br/>resolution · fps · audio · duration"] --> Parse["Parse edit map<br/>zoom · speed · cut · subtitles"]
        Parse --> Res["Choose output size<br/>720p · 1080p · 480p · 360p<br/>or original"]
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
├── processor/             # analyzer, job parser, renderers
├── storage/               # r2, gofile, gdrive, downloader
├── utils/                 # ffmpeg, gpu, retry
├── handler.py             # RunPod serverless entry
├── config.py
└── Dockerfile`,
  proves: "GPU resource control, hardware-accelerated media processing, and failure handling in a serverless worker.",
};

export const vulti: Project = {
  id: "vulti",
  index: "06",
  title: "Vulti",
  positioning: "A single-file Bash CLI that remembers terminal commands and rebuilds a machine after a reinstall.",
  status: "Open Source",
  statusKind: "open",
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

