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
      "30 API routes",
      "8 separate Rust packages",
      "76 database queries checked at compile time",
    ],
    problem:
      "YouTube doesn't make it easy to follow one specific conversation. If you care about a comment thread, you have to keep checking it yourself to see if someone replied, or if a comment was edited or deleted.",
    built: [
      "A web app that watches a specific YouTube thread and tells you when something changes.",
      "Messages arrive live while you're on the page, without reloading.",
      "A background job checks YouTube on a schedule and pulls in new replies.",
      "Sign in with Google, plus a paid Pro plan through Paddle.",
      "Every edit and deletion is kept as a separate version, so you can see what changed.",
    ],
    decisions: [
      {
        title: "Picked Rust to learn it.",
        body: "I wanted to build something real while learning a new language, so I chose a scope I could actually finish and shipped it.",
      },
      {
        title: "Used Redis for live updates instead of keeping connections in one server.",
        body: "That way, if the app grows to several servers, people still get their messages.",
      },
      {
        title: "Only checked threads that were due.",
        body: "Instead of scanning every thread every minute, the scheduler only picks up threads whose next check time has passed.",
      },
    ],
    takeaway:
      "A working paid app that handles live messages, background data fetching, and subscriptions at the same time.",
  },

  pushtodraft: {
    oneLine: "A web app that turns a code commit into a social post.",
    numbers: [
      "4 platforms supported",
      "2 sign-in integrations",
      "7 database tables for billing",
      "5 versions of the AI prompt",
    ],
    problem:
      "Developers want to share what they ship, but writing a separate post for each platform by hand is tedious. Nobody does it consistently.",
    built: [
      "A web app where each company gets its own separate space. One company's data is never visible to another, and this is enforced at the database level, not by remembering to filter.",
      "It takes a GitHub commit and writes a post for each platform, with the wording adjusted per platform.",
      "Connected accounts for Twitter and LinkedIn, with the access keys stored encrypted; Twitter's keys also refresh automatically, so the connection doesn't silently break.",
      "Payments through Dodo, with a system that automatically reduces a customer's plan when they stop paying.",
      "BranchForge (below) runs as a module inside this same system.",
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
        title: "Automatic downgrade instead of manual.",
        body: "When a payment fails, the system reduces what the customer can access on its own, so nothing has to be chased by hand.",
      },
    ],
    takeaway:
      "Handling multiple companies in one app without them seeing each other, keeping outside logins secure, and letting billing actually change what the product does.",
  },

  branchforge: {
    oneLine: "A tool that answers \u201cwhat if?\u201d questions and refuses when it isn't sure.",
    numbers: [
      "7 steps in the chain",
      "5 database tables + 2 shared base models",
      "confidence cut-off at 0.30",
      "unique fingerprint per version",
    ],
    problem:
      "Ask an AI model \u201cwhat if this happened?\u201d and it will usually just guess confidently. It won't show which facts it used, it can't tell you how one thing led to another, and it won't say when it doesn't actually know.",
    built: [
      "A tool that takes a set of established facts and works out what follows if you change one of them.",
      "It maps out which facts affect which, then traces the effect of a change through that map.",
      "It runs in seven separate steps, and each step is saved, so you can see exactly where a conclusion came from.",
      "It stops and returns nothing when its confidence is too low, rather than guessing.",
      "Older facts count for less over time, so a stale fact can't drive a confident answer.",
      "Every version of a scenario gets its own fingerprint, so you can compare two versions and see what changed.",
    ],
    decisions: [
      {
        title: "Seven separate steps instead of one big prompt.",
        body: "Each step can be checked and re-run on its own. A single prompt gives you one answer and no way to inspect it.",
      },
      {
        title: "A cut-off instead of always answering.",
        body: "A confident wrong answer is worse than no answer, especially for anything someone might act on.",
      },
      {
        title: "Mapping cause and effect up front instead of letting the model write free-form reasoning.",
        body: "It forces the system to commit to what affects what, instead of hand-waving.",
      },
    ],
    takeaway:
      "A chain of AI steps with clear places to stop, a full record of what happened, and versioned results.",
  },

  playthrougheditor: {
    oneLine: "A web app where you describe a video edit in a chat and it happens.",
    numbers: [
      "19 database tables",
      "6 kinds of edit",
      "2 payment providers",
      "full export pipeline from upload to download",
    ],
    problem:
      "Editing gameplay footage means learning a timeline editor, which is a lot of work for something simple. Most creators just want to describe what they want and have it happen.",
    built: [
      "A web app with a video workspace, a chat panel, and a list of edits you've made.",
      "You type something like \u201ccut the slow parts, add captions, zoom in on the kills\u201d and the app turns that into a set of edits.",
      "Six kinds of edit: zoom, speed, text, shake, callout, and cut.",
      "Export sends the job off to be rendered, tracks its progress, and gives you a download link when it's done.",
      "Two payment providers behind one interface, plus an automatic plan reduction when a payment fails.",
      "The video processing itself runs on a separate service (PlaythroughProcessor).",
    ],
    decisions: [
      {
        title: "Used a well-known web framework instead of a lightweight one.",
        body: "It already had login, billing, and per-company separation built and tested, so I didn't rebuild those.",
      },
      {
        title: "Rented GPUs by the second instead of owning one.",
        body: "A GPU sitting idle still costs money. This way you only pay while a video is actually rendering.",
      },
      {
        title: "Chat turned into a list of edits instead of a manual timeline.",
        body: "You can still see and adjust every edit, but you don't have to learn the tool first.",
      },
    ],
    takeaway:
      "A product that ties together an upload, an AI reading your instructions, a render job, and a download link, all in one flow.",
  },

  playthroughprocessor: {
    oneLine: "The part of the video editor that does the actual work, on rented graphics cards.",
    numbers: [
      "4 edit types handled here",
      "4 quality presets",
      "2 jobs at a time",
      "2-hour limit per job",
    ],
    problem:
      "Processing video needs a graphics card, and renting one all day when you only need it for a few minutes is expensive. It's also easy to set up badly, so jobs fail or come out looking wrong.",
    built: [
      "A worker that receives a video job, does the editing, and sends the result back.",
      "Uses the graphics card's built-in video encoder, which is much faster than the general-purpose processor for this kind of work.",
      "Handles zoom, speed, captions, and watermarks.",
      "Picks a quality setting per job and manages how much graphics memory each job is allowed, so jobs don't crash into each other.",
      "Some effects the graphics card can't do well, so those are done on the regular processor first, then the result goes back to the graphics card.",
      "Skips re-encoding entirely when a clip doesn't need to change, which makes those jobs much faster.",
    ],
    decisions: [
      {
        title: "Rented, on-demand GPUs instead of one always-on machine.",
        body: "No cost when nothing is rendering.",
      },
      {
        title: "Limited to 2 jobs at a time instead of unlimited.",
        body: "Running too many at once exhausted the graphics memory and caused failures. A hard limit is more reliable than hoping it doesn't happen.",
      },
      {
        title: "Skip re-encoding when possible.",
        body: "If a clip comes out the same as it went in, re-encoding it wastes time and slightly degrades the picture for no reason.",
      },
    ],
    takeaway:
      "Controlling an expensive shared resource, using the hardware properly, and handling failure cleanly on a machine that only exists while it's working.",
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
