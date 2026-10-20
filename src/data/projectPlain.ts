// Plain-English project copy, keyed by project id.
// Pattern per project: one line -> by the numbers -> problem -> what I
// built -> design decisions -> takeaway. Every claim maps to verified code.

export type PlainDecision = { title: string; body: string };

export type PlainProject = {
  /** Replaces the technical lead under the title. */
  oneLine: string;
  /** Single "by the numbers" row, dot-separated. */
  numbers: string[];
  problem: string;
  built: string[];
  decisions: PlainDecision[];
  takeaway: string;
};

export const projectPlain: Record<string, PlainProject> = {
  threadchat: {
    oneLine: "A working app that follows a YouTube comment thread for you.",
    numbers: [
      "16 database tables",
      "28 API routes",
      "8 separate Rust packages",
      "76 database queries checked at compile time",
    ],
    problem:
      "There is no focused way to follow a specific YouTube comment thread. YouTube has notifications, but they are unreliable. Sometimes they never arrive. Sometimes you get pinged and the comment isn't even visible when you open the thread. And there is no history of what was edited or deleted.",
    built: [
      "A web app that follows one YouTube conversation and shows new replies, edits, and deletions as they happen while the page is open.",
      "A background checker runs on a schedule: as often as every 30 seconds for active Pro threads, less often as a thread goes quiet, and it stays inside YouTube's daily data limit.",
      "Sign in with Google, connect a YouTube account, and pay for Pro through Paddle. New accounts get a 14-day trial.",
      "Every version of a comment is kept, so you can see what it said before an edit or deletion. History is part of Pro and the trial.",
      "Comments posted from the app go through YouTube, with a daily write limit of 100 on the trial and 500 on Pro.",
      "A Chrome side panel opens the same inbox next to YouTube using the same sign-in.",
    ],
    decisions: [
      {
        title: "Picked Rust to learn it.",
        body: "I wanted to build something real while learning a new language, so I chose a scope I could actually finish and shipped it.",
      },
      {
        title: "Used Redis to pass live updates between servers instead of assuming one server holds every connection.",
        body: "That way, if the app grows to several servers, people still get their messages.",
      },
      {
        title: "Only checked threads that were due.",
        body: "Instead of scanning every thread every minute, the scheduler only picks up threads whose next check time has passed.",
      },
      {
        title: "Used a throwaway pass for live connections.",
        body: "The browser gets a single-use ticket that expires in 10 seconds, so a leaked connection link cannot be reused.",
      },
    ],
    takeaway:
      "A working paid app that handles live messages, background checking, and subscriptions at the same time.",
  },

  pushtodraft: {
    oneLine:
      "A multi-company app for turning code commits into social posts, whose shared foundation became the base for later products.",
    numbers: [
      "4 publishing targets",
      "2 OAuth sign-ins + Discord webhook",
      "7 billing tables",
      "5 base prompts, 9 tones",
      "3 apps on the same starter kit",
    ],
    problem:
      "Developers want to share what they ship, but writing a separate post for each platform by hand is tedious. Nobody does it consistently.",
    built: [
      "A web app where each company gets its own separate space. One company's data is never visible to another, and this is enforced at the database level, not by remembering to filter.",
      "The AI layer has five versions of its base prompt, nine tone presets, and separate rules for each platform.",
      "Accounts can be connected for Twitter and LinkedIn, or a Discord webhook. The keys are encrypted, and Twitter's keys refresh before they expire.",
      "A shared billing app covers Dodo payments with seven tables for customers, subscriptions, plan changes, failures, and downgrade logs.",
      "Repositories, posts, post groups, connected accounts, and webhook delivery logs are all stored per company.",
      "The shared foundation became the JolexHive starter kit: BranchForge and PlaylistDNA run inside the same backend, and PlaythroughEditor reuses the same base with its own changes.",
    ],
    decisions: [
      {
        title: "Separate database space per company instead of one big table with a company column.",
        body: "Stronger separation, cleaner per-company backups, at the cost of some connection overhead.",
      },
      {
        title: "Encrypted keys instead of plain storage.",
        body: "If the database ever leaked, the third-party logins would still be useless.",
      },
      {
        title: "A reusable starter kit instead of rebuilding the same pieces for every app.",
        body: "Login, company separation, billing, email, alerts, and scheduled jobs live once, so a new product only adds its own tables and screens.",
      },
    ],
    takeaway:
      "Handling multiple companies in one app without them seeing each other, keeping outside logins secure, and turning that shared foundation into a starter kit for later products.",
  },

  branchforge: {
    oneLine:
      "A tool that answers \u201cwhat if?\u201d questions with a traceable chain of facts and causes, and can stop when the evidence is too thin.",
    numbers: [
      "7 separate steps",
      "5 product tables + 2 shared tables",
      "4 kinds of cause-and-effect link",
      "0.30 confidence cut-off in the prompts",
      "unique fingerprint per branch",
    ],
    problem:
      "Ask an AI model \u201cwhat if this happened?\u201d and it will usually answer in confident free text. It will not show which facts it used, it will not lay out what caused what, and it will not stop when the evidence is thin.",
    built: [
      "A tool that takes a curated set of facts and walks through a what-if question in seven separate steps, from checking the facts to writing the final answer.",
      "Step one can stop the run. It checks that the change is backed by facts, that the fact set is consistent and that there are enough sources. If it fails, the branch is marked failed and the other steps do not run.",
      "Each step is saved with its parsed result, raw output, token count and the last prompt message. Completing a step, forking, stopping and failing all write an audit entry.",
      "Facts carry a source link, publication date, confidence score and half-life. Older facts get a smaller weight in the prompt using a half-life decay formula.",
      "The middle steps build a cause-and-effect map and store each link as direct, confounder, mediator or collider, with its strength, direction, delay, effect size, source fact IDs and confidence.",
      "The simulation step tells the model to treat the change as forced: cut the links that normally feed the changed variable, then push the effect through the remaining map.",
      "The critique step asks for a pass or fail and a final confidence score. The last step turns the result into a narrative, outcome ranges, risks and sources.",
      "Each branch has a parent, a depth and a unique fingerprint built from the parent fingerprint, the change and the creation time. The fingerprint is stored once.",
      "The API can create a root branch, fork from a scenario or fork from an existing branch. It runs the whole chain inside that request.",
      "The frontend has a scenario list and a canvas. You can fork a branch from a node and open a side panel with the narrative, outcomes, causal chain, sources and risks.",
      "It runs as one of the apps on the shared JolexHive base. The scenario and fact tables are shared; the BranchForge tables live in each company's own database space.",
    ],
    decisions: [
      {
        title: "Seven separate steps instead of one big prompt.",
        body: "Each step leaves a saved trace and a clear place to fail. You can see where a conclusion came from instead of getting one opaque answer.",
      },
      {
        title: "A confidence cut-off instead of always answering.",
        body: "The prompts use 0.30 as the cut-off. Only the first step's stop flag is enforced by the runner; later steps ask the model to return a stop or error result.",
      },
      {
        title: "Map cause and effect before writing the answer.",
        body: "The model has to commit to links, strengths and delays instead of writing free-form reasoning with no structure.",
      },
      {
        title: "Send the hard steps to a reasoning model.",
        body: "Steps 3 to 6 use the reasoning model; steps 1, 2 and 7 use the faster model. Both can be changed in settings.",
      },
      {
        title: "Run the whole chain in the request instead of a background queue.",
        body: "The flow is simpler and the API can return the finished branch right away, but a long simulation holds the request open.",
      },
    ],
    takeaway:
      "A multi-step AI system that keeps a record of every step, stores cause-and-effect links as data, and gives each branch its own fingerprint.",
  },

  playthrougheditor: {
    oneLine: "A web app where you describe a cut in chat and see it appear on a timeline.",
    numbers: [
      "6 kinds of edit",
      "4 the assistant can add",
      "30-second autosave",
      "5-second export check",
    ],
    problem:
      "Editing gameplay footage means learning a timeline editor, which is a lot of work for a simple cut. Most creators would rather describe what they want and check the result.",
    built: [
      "A browser editor with a video player, timeline, chat panel, edit list and subtitle blocks.",
      "You type a change, and the assistant streams back a reply plus a structured edit. It can add zoom, speed, cut and text. It cannot change or remove something already on the timeline.",
      "Six edit types exist in the data model: zoom, speed, text, shake, callout and cut. Shake and callout can live in a project, but the chat does not create them.",
      "The editor saves itself after 30 seconds, so a refresh does not lose the timeline or the chat.",
      "Projects and timeline items are stored per user and per organisation, so one account cannot load another account's work.",
      "Uploads go straight to file storage with a temporary write link. A new project has to be 16:9. The length check allows 4,900 seconds, even though its error message says 30 minutes.",
      "Export sends the edit list to the GPU worker, checks progress every 5 seconds, and returns a download link.",
      "The code is public as one Apache-2.0 repo with setup docs, a database diagram, Docker Compose for PostgreSQL and Redis, and CI.",
    ],
    decisions: [
      {
        title: "Build a real browser app instead of server-rendered pages.",
        body: "The timeline, video preview and streaming chat all need to react immediately in the browser.",
      },
      {
        title: "Keep the AI key on the server.",
        body: "The browser talks to one endpoint that filters common prompt-injection phrases, limits how often it can be called, and forwards it to the model.",
      },
      {
        title: "Let chat add edits, not rewrite them.",
        body: "The assistant is limited to new zoom, speed, cut and text effects. Anything already on the timeline is changed by hand, which stops the model from silently undoing your work.",
      },
      {
        title: "Save both a snapshot and the individual edits.",
        body: "The snapshot loads the editor quickly. The individual rows keep the timeline searchable. The tradeoff is that every save replaces the rows for that project.",
      },
    ],
    takeaway:
      "A prototype of chat-driven video editing where autosave, upload limits, tenant isolation and a deferred render job are treated as part of the product.",
  },

  playthroughprocessor: {
    oneLine: "The GPU worker built to turn a timeline of edits into a finished video on rented hardware.",
    numbers: [
      "4 effects rendered",
      "4 output sizes",
      "2 parts at a time",
      "2-hour job limit",
    ],
    problem:
      "Rendering video needs a graphics card. Renting one all day for a few minutes of work is wasteful, and a long job can run out of disk or memory halfway through.",
    built: [
      "A RunPod worker that accepts a video, an edit list and a target size, downloads the source, renders it and hands back a link.",
      "Splits the video at every edit boundary and skips re-encoding for stretches with no changes.",
      "Runs two parts at once, with a 10-minute cap on each part and a 2-hour cap on the whole job.",
      "Uses the graphics card to decode, scale and encode. Text and watermarks take a trip through the normal processor for that step.",
      "If the source is over 500 MB and free disk is under 6 GB, it recompresses first. Under 3 GB free, it lowers quality again.",
      "Uploads the result through a temporary write link to file storage, or falls back to GoFile.",
    ],
    decisions: [
      {
        title: "Rent a GPU for the job, not for the day.",
        body: "No cost when nothing is rendering.",
      },
      {
        title: "Two parts at a time instead of as many as possible.",
        body: "Running too many at once exhausted graphics memory and caused failures. A hard limit is more reliable than hoping it does not happen.",
      },
      {
        title: "Copy untouched video instead of re-encoding it.",
        body: "If a clip already looks the way it should, re-encoding wastes time and slightly degrades the picture.",
      },
      {
        title: "Join without a final re-encode.",
        body: "This keeps assembly fast and avoids another quality loss, but every part has to use the same codec, size and timing.",
      },
    ],
    takeaway:
      "What it takes to turn a timeline into video on a rented GPU: split the work, leave clean footage alone, watch disk and memory, and hand the result to storage.",
  },

  hiringradar: {
    oneLine: "A job-hunting tool that finds companies that are hiring and turns them into a clean list.",
    numbers: [
      "4 discovery sources",
      "4 SQLite tables",
      "Markdown, CSV and PDF exports",
      "CLI plus a desktop GUI",
    ],
    problem:
      "Job hunting means checking the same boards and career pages over and over. The information is scattered, duplicated and often out of date.",
    built: [
      "A command-line tool that searches Hacker News, GitHub, search engines and job boards for companies that are hiring.",
      "It finds likely career pages, checks them, and stores each company in a local database.",
      "It writes one Markdown file per company and exports the list as CSV or PDF.",
      "It asks Gemini to write a short description for each company and saves the result so it does not pay for the same description twice.",
      "It checks robots.txt, changes its browser identity and slows down between requests.",
    ],
    decisions: [
      {
        title: "A single database file instead of a hosted database.",
        body: "The whole tool fits on a small server and the data is easy to copy or back up.",
      },
      {
        title: "Several sources instead of one job board.",
        body: "Each source finds companies the others miss, which makes the list more useful.",
      },
      {
        title: "Keep the data portable.",
        body: "The same records can leave as Markdown, CSV or a PDF report without locking anyone into the tool.",
      },
    ],
    takeaway:
      "A small data pipeline that finds information, cleans it up, stores it and gives it back in a form someone can use.",
  },

  vulti: {
    oneLine: "A small command-line tool that remembers your terminal commands and helps you rebuild a Linux machine.",
    numbers: [
      "12 Linux versions supported",
      "3 package managers handled",
      "9 commands",
      "no dependencies at all",
    ],
    problem:
      "Reinstalling Linux means re-remembering dozens of install commands and package lists that you set up over months and never wrote down.",
    built: [
      "One script you can drop anywhere. It saves commands under a name, then runs them by that name later.",
      "It works out which Linux version you're on and uses the right package manager automatically.",
      "It can save your installed packages and your personal settings into one file, then restore them on a new machine.",
      "Restore has a preview mode, so you can see what it would do before it does it.",
    ],
    decisions: [
      {
        title: "Plain shell script instead of a compiled program.",
        body: "Nothing to install, nothing to break, runs on any Linux machine as-is.",
      },
      {
        title: "A simple text file instead of a database.",
        body: "You can open it and read it, or search it with grep, or edit it by hand.",
      },
      {
        title: "A local file you keep yourself instead of a cloud sync.",
        body: "No account, no service that can disappear, works offline.",
      },
    ],
    takeaway:
      "A small tool that solves a real annoyance with no dependencies and nothing to maintain.",
  },
};
