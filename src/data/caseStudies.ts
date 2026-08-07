import type { CaseStudy } from "@/lib/types";

/**
 * Local case study content for the Work page.
 * Edit this file directly to add, remove, or reorder case studies.
 * Image fields accept paths under /public or full URLs; leave null for placeholders.
 */

const TIMESTAMP = "2026-01-01T00:00:00.000Z";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "crosstab-tables",
    slug: "crosstab-tables",
    title: "Crosstab Tables",
    company: "Dig Insights",
    summary:
      "A self-serve crosstab builder that lets researchers cross-tabulate their data directly on the platform — no exporting required.",
    cover_image_url: "/images/casestudies/crosstab-tables-cover.png",
    role: "Product Design Manager\nDesign Co-Lead",
    team: [
      "Braden Schulenberg",
      "Anna Vremenko",
      "Olha Stavilova",
      "Rula Alnasiri",
    ],
    tools: ["Figma", "Jira", "Notion"],
    timeline: "2025 (Q2–Q3)",
    description:
      "A self-serve crosstab builder that lets researchers cross-tabulate their data directly on the platform — no exporting required.",
    context:
      "Researchers were exporting survey data out of the platform into Q to build cross-tabulations, then rebuilding those tables again in PowerPoint for delivery. It was slow, fragmented, and drove significant drop-off from our platform at exactly the moment researchers needed to dig into their results. I co-led design on Crosstab Tables — a native builder that lets researchers construct, customize, and export cross-tabs without ever leaving the platform.",
    challenge:
      "How might we let researchers build flexible, accurate cross-tabulations directly on the platform, replacing a manual export-to-Q workflow?",
    constraints: [
      "Dig One supports a wide range of question types — select, grid, rank, emoji, scales, idea screens, idea splits, open ends — each with a different underlying data structure. Any variable from any question type needed to be combinable in rows or columns without producing a broken or nonsensical table.",
      "There was no existing system for this. We had to define, from scratch, what a valid table looked like for every question type: what rows and columns defaulted to, what values could be displayed, how base size was calculated, and which combinations should be restricted. As co-lead across two PMs and three designers, my job was keeping that system coherent as new question types and edge cases surfaced.",
    ],
    research: {
      sections: [
        {
          title: "Interviews with researchers",
          body: "We ran a series of interviews with researchers who build crosstabs in Q every day, walking through their actual process end to end — how they set up a table, what cuts they run first, where they hit friction, and what they do when the tool won't let them build what they need. Those sessions surfaced the caveats and edge cases we'd have to support if we wanted researchers to genuinely switch: the specific combinations they rely on, the manual workarounds they'd built up over years, and the conventions they expect any crosstab tool to follow.",
        },
        {
          title: "Defining the rules",
          body: "That research fed directly into the table logic. For every question type in the platform, we mapped its default rows, columns, and display values, its additional calculations (Idea Score, Scale Average), and where a crosstab simply didn't apply (open ends, heatmaps, video interviews). This became the foundation everything else was designed against.",
        },
      ],
      key_user_stories_label: "Key user needs",
      key_user_stories: [
        "As a researcher, I want to build a crosstab from any combination of my study's variables, so I don't have to leave the platform to get the cut I need.",
        "As a researcher, I want to nest variables in layers, so I can compare subgroups like Age within Gender.",
        "As a researcher, I want the system to stop me from building an invalid table, without blocking my ability to explore the data.",
      ],
    },
    features: [
      {
        section: "The builder",
        title: "A sidebar that mirrors the table",
        body: "The left panel is the control surface for the entire table — Rows and Columns as parallel sections, with a swap button on the divider between them. Every variable added appears as a data box in its section, and every action available in the sidebar is mirrored in the table itself, so a rename or merge in one view updates the other live.",
        image_url: null,
        images: [
          "/images/casestudies/crosstab-sidebar-01.png",
          "/images/casestudies/crosstab-sidebar-02.png",
          "/images/casestudies/crosstab-sidebar-03.png",
        ],
        caption: "Sidebar control surface with Rows and Columns.",
      },
      {
        section: "The builder",
        title: "Adding and nesting variables",
        body: "Researchers pull variables from study questions, idea screens, idea splits, screening questions, or demographics. Any variable can be nested as a layer inside another — Country within Gender, Age within Gender — producing a hierarchical column banner. The nesting system defines what a 1st-level title, 2nd-level title, and layered item look like at every depth.",
        image_url: null,
        images: [
          "/images/casestudies/crosstab-nesting-01.png",
          "/images/casestudies/crosstab-nesting-02.png",
          "/images/casestudies/crosstab-nesting-03.png",
        ],
        imagesLayout: "aside-stack",
        caption: "Nested variables producing a hierarchical column banner.",
      },
      {
        section: "The builder",
        title: "Sidebar interactions",
        body: "Variables can be reordered and re-parented by dragging within the sidebar, governed by four defined placement rules that determine what can nest inside what, and where a dragged item is allowed to land. Invalid combinations are blocked with an inline explanation rather than silently failing.",
        image_url: "/images/casestudies/crosstab-drag-drop.png",
        caption: "Sidebar drag-and-drop with placement rules and inline validation.",
      },
      {
        section: "The table",
        title: "Table interactions",
        body: "The table isn't just an output — it's editable. Right-click opens a context menu on any cell. Cells can be selected individually or in adjacent blocks (adjacent selections draw a single continuous border, non-adjacent ones outline separately). Options can be combined into a merged cell, which drops straight into rename mode, and splitting a merged cell restores the original labels.",
        image_url: "/images/casestudies/crosstab-table-interactions.png",
        caption: "Editable grid with selection, merge, and context menus.",
      },
      {
        section: "The table",
        title: "Renaming",
        body: "Question titles, option labels, and column headers can all be renamed — from the sidebar or inline in the table — with the original values retained in the backend so changes can be undone.",
        image_url: "/images/casestudies/crosstab-renaming.png",
        caption: "Inline and sidebar renaming with undo support.",
      },
      {
        section: "The table",
        title: "Stat Testing and Conditional Formatting",
        body: "Stat Testing and Conditional Formatting live under the sidebar's Formatting tab — reading from the same table engine without changing how the underlying table works.",
        image_url: null,
        images: [
          "/images/casestudies/crosstab-stat-testing.png",
          "/images/casestudies/crosstab-conditional-formatting.png",
        ],
        imagesLayout: "stack",
        imageCaptions: ["Stat Testing", "Conditional Formatting"],
      },
    ],
    takeaway: [
      "Leading this alongside another PM and three designers meant the hardest part wasn't the UI — it was agreeing on a shared system that could hold up across every question type in the platform, including ones that didn't exist yet. The handoff file ended up as 17 distinct spec sections — nesting rules, table interactions, custom rows and columns, saving flows, renaming, sorting, duplication, loading states — each with its own redlines and rule documentation.",
      "Getting that foundation right early meant Stat Testing and Conditional Formatting could ship later as clean extensions rather than reworks. The bigger win was moving researchers' analysis back onto the platform — cutting the export-to-Q-and-back workflow that was driving a large share of our drop-off, and giving researchers a faster path from data to insight.",
    ],
    gallery: ["/images/casestudies/crosstab-tables-gallery.png"],
    tags: ["Product design", "Design systems", "B2B"],
    status: "published",
    sort_order: 1,
    created_at: TIMESTAMP,
    updated_at: TIMESTAMP,
    problem:
      "Researchers were exporting survey data into Q to build cross-tabulations, then rebuilding those tables in PowerPoint — a fragmented workflow that drove platform drop-off.",
    process:
      "I co-led design on a native crosstab builder, defining table logic across every question type and shipping a sidebar-and-grid system with nesting, drag-and-drop rules, and direct manipulation.",
    outcome:
      "Researchers could build, customize, and export cross-tabs without leaving the platform, and later features like Stat Testing extended the same foundation.",
  },
  {
    id: "navigation-system",
    slug: "navigation-system",
    title: "Navigation System",
    company: "Dig Insights",
    summary:
      "A rebuilt navigation system for Dig One, designed to hold a product suite that keeps growing.",
    cover_image_url: "/images/casestudies/navigation-system-cover.png",
    role: "Product Designer",
    team: ["Anna Vremenko, Product Designer (Account Switcher)"],
    tools: ["Figma"],
    timeline: "2025",
    description:
      "A rebuilt navigation system for Dig One, designed to hold a product suite that keeps growing.",
    context:
      "Dig One had outgrown its navigation. What started as a single survey product had expanded into a suite — Upsiide, OneCliq, Storyteller, Agents, and Dig Labs applications — through a mix of new features and acquisitions, and the existing structure had no room left for any of it. I redesigned the navigation end to end: a new top bar and sidebar, an account and space switcher to handle multi-brand access, and a spec'd component library so the system could absorb whatever came next without another rebuild.",
    challenge:
      "How might we restructure the app's navigation so it can accommodate a growing product suite — including products we haven't built yet?",
    approach:
      "The brief wasn't to solve a usability problem — it was to build a structure with room in it. That meant designing for products that didn't exist yet, which shifted the work from screen design toward system design: define the containers, define the rules for what goes in them, and document it tightly enough that any future product could slot in without a redesign.",
    constraints: [],
    research: {
      sections: [],
      key_user_stories: [],
    },
    features: [
      {
        title: "A new top bar and sidebar",
        body: "The core layout splits into a persistent top navigation bar and a collapsible left sidebar. The sidebar carries the main product areas and supports both expanded and collapsed states, with dedicated hover and active treatments for each — so the chrome can shrink out of the way without losing wayfinding.",
        image_url: "/images/casestudies/navigation-topbar-sidebar.png",
      },
      {
        title: "Account and space switcher",
        body: "Researchers work across multiple client accounts and spaces, so the switcher had to handle that at scale: a searchable dropdown with a scrollable section that hugs its content when short and caps at a fixed max height when long, plus defined behavior for search results, empty states, and long account names that would otherwise break the layout. I collaborated with Anna Vremenko on this component.",
        image_url: "/images/casestudies/navigation-account-switcher.png",
      },
      {
        title: "Product-area tabs",
        body: "Horizontal tabs sit inside the content area for navigating within a product, with add and dropdown icons that each have their own hover states — the mechanism for letting a product area grow more sections over time without expanding the global nav.",
        image_url: "/images/casestudies/navigation-product-tabs.png",
      },
      {
        title: "A documented system, not just screens",
        body: "Every component is spec'd with its full anatomy — fixed, fill, and hug behavior, paddings, and design tokens instead of hex values — and drawn across its complete state range, from collapsed hover to active expanded. Layout rules cover modal sizing in percentages rather than pixels, long-title handling, and scrollable section bounds. Over 70 inline handoff notes sit directly on the affected elements, so engineers could build from the file itself.",
        image_url: "/images/casestudies/navigation-documented-system.png",
      },
    ],
    takeaway: [
      "This was primarily a UI and systems problem rather than a research one, and the interesting constraint was designing for products that didn't exist yet. The temptation with navigation is to optimize it for what's currently in the app; the actual job was defining containers and rules general enough to absorb the next acquisition or feature area without another rebuild.",
      "The part I'd carry forward is how much of the value lived in the documentation rather than the screens. Spec'ing every component in tokens and fill/fixed/hug rules — instead of static pixel values — is what makes the system extensible by someone who wasn't in the room when it was designed.",
    ],
    gallery: [
      "/images/casestudies/navigation-gallery-01.png",
      "/images/casestudies/navigation-gallery-02.png",
      "/images/casestudies/navigation-gallery-03.png",
    ],
    galleryLayout: "hero-split",
    tags: ["Product design", "Design systems", "Navigation"],
    status: "published",
    sort_order: 3,
    process:
      "I redesigned the navigation end to end — top bar, sidebar, account switcher, and a documented component system built for products that didn't exist yet.",
    outcome:
      "A navigation system with room to absorb future products without another rebuild.",
  },
  {
    id: "storyteller",
    slug: "storyteller",
    title: "Storyteller",
    company: "Dig Insights",
    summary:
      "An AI-powered reporting tool that turns study results into shareable, structured narratives — replacing the export-to-PowerPoint workflow entirely.",
    cover_image_url: "/images/casestudies/storyteller-cover.png",
    role: "Product Design Manager\nDesign Co-Lead",
    team: [
      "Braden Schulenberg",
      "Anna Vremenko",
      "Olha Stavilova",
      "Rula Alnasiri",
    ],
    tools: ["Figma", "Jira", "Notion"],
    timeline: "2024–2025",
    description:
      "An AI-powered reporting tool that turns study results into shareable, structured narratives — replacing the export-to-PowerPoint workflow entirely.",
    context:
      "Researchers were spending up to 65% of their time not on research, but on reporting: exporting data, cutting tables, and rebuilding findings slide by slide in PowerPoint. Storyteller was built to remove that entire step — analyzing study data, surfacing the insights that matter, and assembling them into a polished, editable story inside the platform. I co-led design on the product from vision through launch.",
    challenge:
      "How might we get researchers from raw study data to a client-ready report without ever leaving the platform?",
    constraints: [
      "The reporting problem wasn't just about tooling — it was about trust and habit. Researchers had spent years doing analysis manually, and their credibility rests on the judgment they apply to data. Any system that generated conclusions for them had to earn that trust rather than assume it.",
      "There were hard product limits too. We couldn't match PowerPoint's full customization. We couldn't support client-mandated templates. And some analytical capabilities researchers relied on didn't exist in our platform at all. The design had to be honest about those boundaries rather than pretend to be a PowerPoint replacement.",
    ],
    research: {
      sections: [
        {
          title: "Understanding how reporting actually works",
          body: "We ran extensive research with researchers to map the reporting process end to end — where the data comes from, how it moves between tools, what gets rebuilt manually and why, and where the real time sinks live. We built user journey maps from those sessions, which made the shape of the problem clear: the bottleneck wasn't any single step, it was the constant switching between the platform, the analysis tool, and the deck.",
        },
        {
          title: "Three distinct audiences",
          body: "The research also separated users who'd initially been treated as one group. Researchers wanted to reduce reporting time without leaving the platform. Clients receiving reports wanted to explore findings quickly and share them internally. And clients in view-only mode were frustrated that a static deck gave them no way to interact with the data at all — a need PowerPoint structurally couldn't serve.",
        },
      ],
      key_user_stories: [],
    },
    vision: {
      intro:
        "The vision took a long time to settle, and the path there is the most important part of this project.",
      sections: [
        {
          title: "The first direction was a manual story builder",
          body: "A componentized presentation tool inside the platform. Templates by study type, a grid-based modular layout, drag-and-drop text, image, table, chart, and video blocks, themes, and PPTX export. Essentially: rebuild PowerPoint, but connected to live study data so nothing had to be re-entered by hand.\n\nWe spec'd that vision in depth. But testing the thinking against the journey maps exposed the flaw: it removed the copy-paste step while leaving the actual work untouched. A researcher still had to decide what mattered, find it, and lay it out. We'd have saved them the worst hour of the process and left the other five intact.",
        },
        {
          title: "So we shifted to an AI-driven approach",
          body: "Where the system does the first pass of analysis and assembles a structured narrative — and the researcher's job becomes reviewing, steering, and refining rather than building from an empty page. That reframed the entire design problem: not \"how do we make a good builder,\" but \"how do we give researchers meaningful control over something a machine drafted.\"",
        },
      ],
    },
    features: [
      {
        title: "Automatic story generation",
        body: "As soon as an audience completes, Storyteller generates stories for each group in the study, pulling insights from every section. There's no limit on how many a study can produce — the default state is a report already waiting, not a blank canvas.",
        image_url: "/images/casestudies/storyteller-generation.png",
      },
      {
        title: "Cobuilder",
        body: "For researchers who want to steer the output, Cobuilder is a guided flow that sets the story's direction before generation: choose the audience groups and demographic filters, select which idea sections to analyze, and define the research objective in plain language. AI can suggest an objective or improve a written one. This became the core answer to the trust problem — researchers direct the analysis, they don't just receive it.",
        image_url: "/images/casestudies/storyteller-cobuilder.png",
      },
      {
        title: "Insights as the atomic unit",
        body: "Rather than generating whole decks as monoliths, the system produces individual insights — single visualized data points explained in context. Stories are curated collections of them, and researchers can browse the full insight library to add more. That structure is what makes an AI-generated report editable rather than take-it-or-leave-it.",
        image_url: "/images/casestudies/storyteller-insights.png",
      },
      {
        title: "Full editorial control after generation",
        body: "Every generated story can be reshaped: edit or remove slide text, rearrange content within a slide, reorder slides by drag and drop, re-sort visual data, and switch chart types. Nothing the AI produces is locked.",
        image_url: null,
        images: [
          "/images/casestudies/storyteller-editorial-02.png",
          "/images/casestudies/storyteller-editorial-01.png",
        ],
        imagesLayout: "aside-stack",
      },
      {
        title: "Crosstabs, Stat Testing, and Conditional Formatting",
        body: "A self-serve crosstab builder lets researchers construct their own cross-tabulations and drop them straight into a story, with statistical testing surfacing significant differences and conditional formatting highlighting patterns in the data. (Covered in depth in a separate case study.)",
        image_url: null,
        images: [
          "/images/casestudies/crosstab-stat-testing.png",
          "/images/casestudies/crosstab-conditional-formatting.png",
        ],
        imagesLayout: "stack",
        imageCaptions: ["Stat Testing", "Conditional Formatting"],
      },
      {
        title: "Sharing and export",
        body: "Stories can be shared by public link or private invitation with editor, viewer, and player access levels, and exported to PPTX for teams that still need a deck — meeting researchers where their clients are rather than forcing a workflow change on everyone at once.",
        image_url: null,
        images: [
          "/images/casestudies/storyteller-share-01.png",
          "/images/casestudies/storyteller-share-02.png",
          "/images/casestudies/storyteller-share-03.png",
        ],
      },
    ],
    takeaway: [
      "The most valuable thing that happened on this project was abandoning a vision we'd already spec'd in detail. The manual builder was well-specified, well-argued, and would have shipped something real — but the journey maps showed it addressed the symptom rather than the cause. Recognizing that late enough to have invested in it, but early enough to change course, was the actual work.",
      "What I'd carry forward is how much the AI shift changed the design questions rather than simplifying them. Generating a report is the easy part. The hard part is designing for a researcher whose professional judgment is the product — giving them enough control up front (Cobuilder), enough granularity to disagree with any single piece (insights as atoms), and enough editorial freedom afterward that the output is genuinely theirs.",
    ],
    gallery: ["/images/casestudies/storyteller-gallery.png"],
    tags: ["Product design", "AI", "B2B"],
    status: "published",
    sort_order: 2,
    created_at: TIMESTAMP,
    updated_at: TIMESTAMP,
    problem:
      "Researchers spent up to 65% of their time on reporting — exporting data and rebuilding findings in PowerPoint.",
    process:
      "I co-led design from a manual story-builder vision through an AI-driven approach grounded in journey-map research.",
    outcome:
      "Storyteller generates editable, shareable narratives inside the platform, replacing the export-to-PowerPoint workflow.",
  },
  {
    id: "design-tokens-migration",
    slug: "design-tokens-migration",
    title: "Design Tokens Migration",
    company: "Dig Insights",
    summary:
      "Migrating the design system from static styles to design tokens, so the product could support theming, white-labelling, and future acquisitions.",
    cover_image_url: "/images/casestudies/design-tokens-migration-cover.png",
    role: "Product Design Manager\nDesign Lead",
    team: ["Olha Stavilova", "Anna Vremenko"],
    tools: ["Figma"],
    timeline: "2025",
    description:
      "Migrating the design system from static styles to design tokens, so the product could support theming, white-labelling, and future acquisitions.",
    context:
      "Our design system had run on Figma styles since it was built — a fixed palette, fixed type ramp, hard-coded values. That worked when Dig One was one product with one brand. It stopped working as we started integrating acquisitions like OneCliq, building Storyteller with its own theming requirements, and looking ahead at more products joining the suite. Every one of those needs the same underlying components rendered differently, and styles can't do that. I led the migration to a full token system and made the case internally to get it resourced.",
    challenge:
      "How might we restructure the design system so a single component library can support multiple brands, themes, and products — without rebuilding it each time?",
    makingTheCase:
      "The hardest part of this project wasn't the design work. It was getting the time to do it.\n\nToken migrations are a difficult sell: there's no new feature at the end, no visible change for users, and the payoff is entirely in work that hasn't happened yet. The debate over whether it was worth the effort ran for a long time, and I spent significant time in conversation with both engineering leadership and product leadership building the argument — reframing it from a design-system cleanup into a business capability. Every future acquisition, every theme, every white-label request would either be cheap or expensive depending on what we did now.\n\nGetting that buy-in, and the resourcing that came with it, was the precondition for everything else.",
    approachSections: [
      {
        title: "Closing the designer–developer gap",
        body: "Engineering had already built their own tokens on their side. Rather than designing a system in isolation and handing it over, we worked directly with the developers who'd created them — aligning naming, structure, and semantics so a token in Figma and a token in code meant the same thing. That collaboration turned what could have been a translation layer between two teams into a genuinely shared vocabulary.",
      },
      {
        title: "Full coverage, not partial",
        body: "Rather than tokenizing color and calling it done, we migrated the full foundation: color, spacing, typography, border radius, and border width. Partial adoption is the common failure mode — it leaves components half-tokenized and half-hardcoded, which is harder to maintain than either extreme.",
      },
    ],
    constraints: [],
    research: {
      sections: [],
      key_user_stories: [],
    },
    features: [
      {
        title: "Color tokens",
        body: "The full palette restructured into semantic tokens — background, content, border, and interactive states — so a component references its role rather than a hex value. This is what makes theming and rebranding possible: swap the token values, and every component that references them updates at once.",
        image_url: "/images/casestudies/design-tokens-color.png",
      },
      {
        title: "Spacing, radius, and border width",
        body: "Layout primitives moved from ad-hoc pixel values to a defined token scale, so spacing decisions become consistent by default rather than by discipline.",
        image_url: "/images/casestudies/design-tokens-spacing.png",
      },
      {
        title: "Typography",
        body: "Type styles tokenized across family, size, weight, line height, and letter spacing, letting a theme carry its own typographic voice without a component rebuild.",
        image_url: "/images/casestudies/design-tokens-typography.png",
      },
    ],
    takeaway: [
      "This was the project where I learned the most about advocating for infrastructure work. The design problem — what the token structure should be — was tractable. Convincing an organization to spend engineering time on something with no visible output was the real challenge, and it came down to reframing the ask: not \"our design system needs modernizing,\" but \"here's what the next acquisition costs us if we don't.\"",
      "The collaboration with engineering is the part I'd repeat on any systems project. Tokens are only valuable if both sides of the handoff use the same ones, and building that alignment during the work — rather than specifying it afterward — is what turned this from a Figma reorganization into a shared foundation.",
    ],
    gallery: ["/images/casestudies/design-tokens-gallery.png"],
    tags: ["Design systems", "Tokens", "Product design"],
    status: "published",
    sort_order: 4,
    created_at: TIMESTAMP,
    updated_at: TIMESTAMP,
    problem:
      "Static Figma styles couldn't support theming, white-labelling, or acquired products joining the suite.",
    process:
      "I led the case for resourcing a full token migration and aligned Figma tokens with engineering's existing system across color, spacing, type, radius, and borders.",
    outcome:
      "A shared token foundation that lets one component library support multiple brands and themes.",
  }
];
