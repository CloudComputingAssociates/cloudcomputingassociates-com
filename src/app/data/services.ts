// Single source of truth for the six services.
//
// Each ServicePage drives BOTH the services-grid tile (title, tileTagline,
// summary, icon, slug) AND its /services/:slug landing page (headline,
// metaDescription, ordered `blocks`, cta). The old `servicesData` array in
// data.ts is superseded by this file and will be removed when the services
// grid is rewired to read from here.
//
// Pages do not share one template. Each `blocks` array is rendered in order,
// using each block's own heading, so the varying section names in the source
// copy ("Under the hood", "For the technical team", "The technology
// underneath", "The technical work") are just whatever string the page puts
// in its block — nothing is forced into a fixed layout.

/** Fields common to every content block. */
interface BlockBase {
  /**
   * When true, the block renders inside a visually distinct "technical" panel
   * that business readers can skip. Set on the ProseBlock technical sections
   * ("Under the hood", "For the technical team", "The technology underneath",
   * "The technical work"), and on any list/prose block that belongs inside the
   * same panel (e.g. the layer list in AI Platform Architecture).
   */
  technical?: boolean;
}

/** Intro paragraphs and the technical narrative sections. */
export interface ProseBlock extends BlockBase {
  kind: 'prose';
  heading?: string;   // section header, e.g. "For the technical team"
  lead?: string;      // bold lead-in sentence
  body: string[];     // one entry per paragraph
}

/** An ordered, numbered list (the agent "1..7" example). */
export interface StepsBlock extends BlockBase {
  kind: 'steps';
  heading?: string;
  intro?: string;
  steps: string[];
}

/** Label-and-description lists ("What we build", "What we look at", ...). */
export interface LabelListBlock extends BlockBase {
  kind: 'labelList';
  heading?: string;
  intro?: string;
  items: { label: string; desc: string }[];
}

/** Plain bullet lists ("Typical starting points", "Common applications", ...). */
export interface BulletListBlock extends BlockBase {
  kind: 'bulletList';
  heading?: string;
  intro?: string;
  items: string[];
}

/** A quoted customer/employee question, with an optional answer. */
export interface QuoteBlock extends BlockBase {
  kind: 'quote';
  heading?: string;
  intro?: string;      // e.g. "An employee asks:"
  quote: string;
  response?: string;   // the agent/answer paragraph (omitted where the source has none)
}

/** The closing result statement. */
export interface ResultBlock extends BlockBase {
  kind: 'result';
  heading: string;     // "The result"
  body: string[];
}

export type ContentBlock =
  | ProseBlock
  | StepsBlock
  | LabelListBlock
  | BulletListBlock
  | QuoteBlock
  | ResultBlock;

export interface ServicePage {
  slug: string;
  number: number;           // 1–6, the source numbering
  title: string;            // "AI Business Process Analysis"
  tileTagline: string;      // bold line from the Services summary
  headline: string;         // landing-page heading
  summary: string;          // one-paragraph Services blurb (reused on the tile)
  metaDescription: string;  // plain sentence, < 155 chars, for the page <meta>
  icon: string;             // uil icon class (placeholder — easy to swap)
  blocks: ContentBlock[];
  cta: string;              // conversational CTA → /contactus?service=<slug>
}

export const servicePages: ServicePage[] = [
  {
    slug: 'ai-business-process-analysis',
    number: 1,
    title: 'AI Business Process Analysis',
    tileTagline: 'Find where AI can make a difference.',
    headline: 'Start with the business problem—not the AI.',
    summary:
      'We look at how your business actually works, identify the repetitive or time-consuming work that AI can improve, and build a practical roadmap for what to do first.',
    metaDescription:
      'We find where AI can realistically save time, add capacity, and cut cost in your business—and build a prioritized roadmap for what to do first.',
    icon: 'uil uil-search',
    blocks: [
      {
        kind: 'prose',
        lead: 'Know where AI is worth building before you build it.',
        body: [
          "AI can do remarkable things. That doesn't mean every process should be automated.",
          'We examine how your business operates and identify the places where AI has a realistic opportunity to save time, increase capacity, improve service, or reduce operating cost.',
        ],
      },
      {
        kind: 'prose',
        lead: "You don't need an AI strategy yet.",
        body: [
          'You may simply know that your team is spending too much time on repetitive work.',
          'Maybe employees are moving information between systems. Maybe customer requests pile up. Maybe people spend hours searching for answers that already exist somewhere in the company.',
          "That's enough to start.",
          'We map the work, identify the opportunities, and determine which ones are actually worth pursuing.',
        ],
      },
      {
        kind: 'labelList',
        heading: 'What we look at',
        items: [
          { label: 'How the work gets done', desc: 'What happens today, who does it, how often it happens, and where the bottlenecks are.' },
          { label: 'Where AI can help', desc: 'We separate straightforward automation from work that requires judgment, reasoning, or a human decision.' },
          { label: 'What the numbers look like', desc: 'Time, volume, cost, turnaround, backlog, and exceptions give us a baseline for measuring improvement later.' },
          { label: 'What it will take to build', desc: 'We look at your existing applications, data, integrations, security requirements, and preferred cloud environment.' },
          { label: 'What should happen first', desc: 'Not every opportunity deserves a six-month project. We prioritize the opportunities that have a practical path to value.' },
        ],
      },
      {
        kind: 'prose',
        technical: true,
        heading: 'Under the hood',
        body: [
          'For technical teams, our assessment goes deeper than a strategy presentation.',
          'We model candidate processes as execution flows and identify which steps are deterministic, which require AI reasoning, and which should remain human decisions.',
          'That can lead to a conventional workflow, a tool-using AI agent, a more sophisticated multi-agent workflow, or a human-in-the-loop design.',
          'We also estimate the operating cost of the proposed solution before you commit to building it.',
        ],
      },
      {
        kind: 'bulletList',
        heading: 'Typical starting points',
        items: [
          'Customer and support ticket processing',
          'Order intake and exception handling',
          'Document and contract review',
          'Data reconciliation',
          'Internal research',
          'Recurring reporting',
          'Administrative workflows',
        ],
      },
      {
        kind: 'bulletList',
        heading: 'What you leave with',
        items: [
          'A clear picture of the current process',
          'AI opportunity assessment',
          'Baseline business metrics',
          'Recommended automation approach',
          'Estimated operating cost',
          'Prioritized roadmap',
          'A defined first project',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          "You don't leave with a presentation about how exciting AI is.",
          'You leave knowing where it can help your business, what it will take, and what to do next.',
        ],
      },
    ],
    cta: "Let's find your first AI opportunity",
  },

  {
    slug: 'agentic-process-automation',
    number: 2,
    title: 'Agentic Process Automation',
    tileTagline: 'AI that does the work—not just answers questions.',
    headline: 'Scale with AI. Not headcount.',
    summary:
      'We build AI agents that can work across your business systems to process information, move work forward, handle routine decisions, and bring a person in when one is needed.',
    metaDescription:
      'We build AI agents that work across your systems—processing information, moving work forward, and escalating to a person when one is needed.',
    icon: 'uil uil-robot',
    blocks: [
      {
        kind: 'prose',
        lead: 'AI that actually does the work.',
        body: [
          "Most businesses don't need another chatbot.",
          'They need work to get done.',
          'An AI agent can receive a request, gather information, work with your existing systems, perform a series of tasks, make defined decisions, and escalate the exceptions to a person.',
          'That means your people can spend less time moving work around and more time doing the work that actually requires them.',
        ],
      },
      {
        kind: 'prose',
        lead: 'From answering questions to taking action.',
        body: [
          'Traditional chatbots are good at answering questions.',
          'AI agents can go further.',
        ],
      },
      {
        kind: 'steps',
        intro: 'For example, an agent could:',
        steps: [
          'Receive a customer request.',
          "Look up the customer's account.",
          'Check an order.',
          'Apply your business rules.',
          'Update the appropriate system.',
          'Send the customer an answer.',
          'Escalate anything outside its authority.',
        ],
      },
      {
        kind: 'prose',
        body: [
          "The goal isn't to remove people from the process.",
          'The goal is to remove unnecessary work from the people doing it.',
        ],
      },
      {
        kind: 'labelList',
        heading: 'What we build',
        items: [
          { label: 'Workflow automation', desc: 'AI systems that move work through multiple steps instead of stopping after generating an answer.' },
          { label: 'Business-system integration', desc: 'Agents can work with the applications you already use through APIs and other integration methods.' },
          { label: 'Human approval', desc: 'Important decisions can require a person before the process continues.' },
          { label: 'Exception handling', desc: "When something doesn't fit the rules, the agent can stop and hand it to the right person with the relevant information already collected." },
          { label: 'Testing and monitoring', desc: 'We test agents against real examples and monitor how they behave in production.' },
        ],
      },
      {
        kind: 'prose',
        technical: true,
        heading: 'For the technical team',
        body: [
          'Underneath the business workflow may be graph-based orchestration, tool calling, model selection, persistent state, evaluation suites, tracing, and least-privilege service identities.',
          'We use open agent frameworks and open protocols where appropriate rather than building your business around a proprietary black box.',
          "On Google Cloud, that can include Google's Agent Development Kit (ADK) and Vertex AI.",
          'On Microsoft environments, we can work with the Microsoft Agent Framework (Semantic Kernel) and Azure AI Foundry.',
          'Across either environment we integrate the frontier model APIs directly—Google Gemini, the Anthropic API (Claude), and the OpenAI API—selecting the model per task.',
          'The architecture is selected around the problem—not because a particular technology happens to be fashionable.',
        ],
      },
      {
        kind: 'bulletList',
        heading: 'Where it can help',
        items: [
          'Support ticket triage and resolution',
          'Order processing',
          'Invoice and document processing',
          'Data reconciliation',
          'Research and reporting',
          'Contract review',
          'Administrative workflows',
        ],
      },
      {
        kind: 'prose',
        heading: 'What we deliver',
        body: [
          'A working production workflow, the integrations it needs, testing and evaluation, operating documentation, and knowledge transfer to your team.',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          'More work gets done without every increase in business volume requiring an equal increase in headcount.',
        ],
      },
    ],
    cta: "Let's talk about a process your team shouldn't have to do manually",
  },

  {
    slug: 'enterprise-knowledge-retrieval',
    number: 3,
    title: 'Enterprise Knowledge & Retrieval',
    tileTagline: 'Turn the information you already have into something people can use.',
    headline: 'Unlock the knowledge your business already owns.',
    summary:
      "Your company's knowledge is probably spread across documents, email, systems, wikis, policies, and the people who know how things really work. We make that knowledge searchable, useful, and available to both people and AI.",
    metaDescription:
      'We make the knowledge your business already owns searchable for people and AI, with answers grounded in your own source material.',
    icon: 'uil uil-book-open',
    blocks: [
      {
        kind: 'prose',
        lead: "Your company's answers are already somewhere.",
        body: [
          "They're in documents.",
          "They're in SharePoint.",
          "They're in Google Drive.",
          "They're in old tickets.",
          "They're in policies and procedures.",
          'And, very often, they\'re in the heads of the people who have been doing the job for ten years.',
          "The problem isn't a lack of information.",
          "It's finding the right information when you need it.",
        ],
      },
      {
        kind: 'prose',
        lead: 'Give your people—and your AI—access to the right answers.',
        body: [
          'We build knowledge systems that let employees and AI applications search your business information and receive answers grounded in your actual source material.',
          'Instead of an AI guessing, it can find the relevant information and show where the answer came from.',
        ],
      },
      {
        kind: 'quote',
        heading: 'What this can look like',
        intro: 'An employee asks:',
        quote: "What's our policy for handling this type of customer request?",
        response:
          'The system searches your approved company information, finds the relevant policy, and provides an answer with a link back to the source. That\'s the difference between generic AI and AI that knows your business.',
      },
      {
        kind: 'labelList',
        heading: 'What we build',
        items: [
          { label: 'Connect your information', desc: 'Documents, databases, wikis, ticket systems, file stores, and other knowledge sources.' },
          { label: 'Make it searchable', desc: 'We organize and index information so relevant material can actually be found.' },
          { label: 'Respect permissions', desc: "People should only receive information they're authorized to see." },
          { label: 'Show the source', desc: 'Answers can include citations back to the information used to produce them.' },
          { label: 'Keep it current', desc: 'As your documents change, the knowledge system can update with them.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'What is RAG?',
        body: [
          'You may hear the term RAG, short for Retrieval-Augmented Generation.',
          'It sounds complicated, but the basic idea is straightforward:',
          'Find the right information first. Then ask the AI to answer using that information.',
          'The engineering challenge is making sure the system finds the right information.',
          "That's where retrieval quality, document processing, metadata, search, ranking, and evaluation become important.",
        ],
      },
      {
        kind: 'bulletList',
        heading: 'Common applications',
        items: [
          'Employee knowledge assistants',
          'Policy and procedure questions',
          'Customer support',
          'Legal and contract research',
          'Engineering documentation',
          'Sales and proposal support',
          'Employee onboarding',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          "Your organization's knowledge becomes something people can actually use—without asking the one person who happens to know where everything is.",
        ],
      },
    ],
    cta: "Let's see what your existing knowledge could do",
  },

  {
    slug: 'customer-experience-agents',
    number: 4,
    title: 'Customer Experience Agents',
    tileTagline: 'Give customers answers—and get things done.',
    headline: 'Serve customers 24/7.',
    summary:
      'AI agents can answer questions around the clock, look up orders, schedule appointments, update accounts, and handle routine requests. When a person is needed, the conversation moves to your team with the context already assembled.',
    metaDescription:
      'AI agents answer customer questions around the clock, handle routine requests, and hand off to your team with full context when a person is needed.',
    icon: 'uil uil-comments-alt',
    blocks: [
      {
        kind: 'prose',
        lead: 'Give customers an answer—and get something done.',
        body: [
          "Customers don't really want to talk to a chatbot.",
          'They want their problem solved.',
          'A useful AI customer agent can check an order, answer a policy question, schedule an appointment, update an account, or handle a routine request without making the customer wait for business hours.',
          'And when a person needs to step in, the conversation comes with them.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Beyond "How can I help you?"',
        body: ['Your customer might ask:'],
      },
      {
        kind: 'quote',
        quote: "Where's my order?",
        response: 'The agent can look it up.',
      },
      {
        kind: 'quote',
        quote: 'Can I change the delivery?',
        response: 'The agent can check the rules and make the change if authorized.',
      },
      {
        kind: 'quote',
        quote: "I need something that's outside your normal policy.",
        response: 'The agent can recognize the exception and send it to the right person.',
      },
      {
        kind: 'prose',
        body: [
          'The customer gets an answer.',
          'Your employee gets the context.',
          'Nobody has to start over.',
        ],
      },
      {
        kind: 'labelList',
        heading: 'What we build',
        items: [
          { label: 'Customer conversations', desc: 'Chat, email, messaging, and voice experiences.' },
          { label: 'Real transactions', desc: 'Agents can work with your CRM, order systems, scheduling tools, and other business applications.' },
          { label: 'Your policies', desc: 'Business rules and approval requirements are built into the workflow.' },
          { label: 'Human handoff', desc: 'When the situation requires a person, the agent transfers the conversation with the relevant context.' },
          { label: 'Continuous improvement', desc: 'We evaluate conversations and use the results to improve the system.' },
        ],
      },
      {
        kind: 'prose',
        technical: true,
        heading: 'The technology underneath',
        body: [
          'A customer experience agent may use multiple specialized agents, retrieval from your business knowledge, authenticated system access, session memory, policy controls, and integrations with your existing CRM and ticketing systems.',
          "The customer doesn't need to know any of that.",
          'They just need their problem solved.',
        ],
      },
      {
        kind: 'bulletList',
        heading: 'Common applications',
        items: [
          'Order status and changes',
          'Returns and refunds',
          'Appointment scheduling',
          'Billing questions',
          'First-level technical support',
          'After-hours sales qualification',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          'More customers get immediate service while your team spends more of its time on the situations that genuinely require a person.',
        ],
      },
    ],
    cta: "Let's design your always-on customer service",
  },

  {
    slug: 'ai-optimization',
    number: 5,
    title: 'AI Optimization',
    tileTagline: 'Make your AI faster, more predictable, and less expensive.',
    headline: 'Your AI works. Now make it work smarter.',
    summary:
      'As AI usage grows, so can the bill. We examine how your AI applications use models, data, and computing resources, then find opportunities to reduce cost without sacrificing quality.',
    metaDescription:
      'We trace how your AI uses models, data, and compute, then cut operating cost and latency without sacrificing quality.',
    icon: 'uil uil-chart-line',
    blocks: [
      {
        kind: 'prose',
        lead: 'AI can get expensive surprisingly quickly.',
        body: [
          'The first version of an AI application is usually built to prove that it works.',
          'Then usage grows.',
          'More customers.',
          'More employees.',
          'More conversations.',
          'More documents.',
        ],
      },
      {
        kind: 'quote',
        intro: 'Suddenly the question changes from:',
        quote: 'Can AI do this?',
      },
      {
        kind: 'quote',
        intro: 'to:',
        quote: 'Why does it cost this much to do it?',
      },
      {
        kind: 'prose',
        body: [
          'We help answer that question.',
        ],
      },
      {
        kind: 'prose',
        lead: 'We look at the whole picture.',
        body: [
          "AI cost isn't just the model.",
          'It can include the amount of information sent to the model, how often requests are repeated, how long agents run, how much information they retrieve, and how much computing capacity stays running.',
          'We measure those pieces and find where the money is going.',
        ],
      },
      {
        kind: 'labelList',
        heading: 'Five ways we commonly improve AI systems',
        items: [
          { label: 'Use the right model', desc: 'Not every task needs the most powerful—and most expensive—model. We work across Google Gemini, the Anthropic API, and the OpenAI API and match the model to the task.' },
          { label: 'Send less information', desc: 'Large amounts of unnecessary context increase cost and often slow responses.' },
          { label: 'Avoid doing the same work twice', desc: 'Caching can eliminate repeated model calls and repeated computation.' },
          { label: 'Keep agents under control', desc: 'Limits on steps, tool calls, tokens, and execution time prevent runaway processes.' },
          { label: 'Choose the right infrastructure', desc: 'Some workloads make sense on managed AI services. Others may benefit from self-hosted models or a hybrid approach.' },
        ],
      },
      {
        kind: 'prose',
        technical: true,
        heading: 'The technical work',
        body: [
          'We trace representative production traffic, measure tokens, latency, model selection, retrieval, runtime usage, and cost, then test changes against an evaluation set.',
          'That means we\'re not simply saying "Use a smaller model."',
          'We\'re asking "Can we use a smaller model and still get the same result?"',
          "If the answer is yes, that's an optimization worth making.",
        ],
      },
      {
        kind: 'bulletList',
        heading: 'What we measure',
        items: [
          'Cost per transaction',
          'Tokens per task',
          'Response time',
          'Model utilization',
          'Cache performance',
          'Agent execution',
          'Quality before and after optimization',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          'Lower operating cost, faster responses, and a clearer understanding of what your AI is actually costing the business.',
        ],
      },
    ],
    cta: "Let's find out what your AI is really costing you",
  },

  {
    slug: 'ai-platform-architecture',
    number: 6,
    title: 'AI Platform Architecture',
    tileTagline: 'Build AI on a foundation that can grow with you.',
    headline: 'Build AI on a foundation that can grow.',
    summary:
      "Choosing an AI platform isn't just about picking a model. We design the infrastructure, security, integrations, and operating model needed to move from an experiment to a reliable production system.",
    metaDescription:
      'We design the security, identity, integrations, and infrastructure that move AI from a working demo to a reliable production platform.',
    icon: 'uil uil-layer-group',
    blocks: [
      {
        kind: 'prose',
        body: [
          'Getting an AI demo working is relatively easy.',
          'Getting it into production is different.',
          'Production AI needs security, identity, integrations, monitoring, predictable costs, reliable infrastructure, and a plan for what happens when the system grows.',
          "That's where architecture matters.",
        ],
      },
      {
        kind: 'prose',
        lead: "You shouldn't have to choose your technology blind.",
        body: ['We help you decide how the pieces fit together:'],
      },
      {
        kind: 'bulletList',
        items: [
          'Which AI models make sense?',
          'Where should the application run?',
          'How should it access your systems?',
          'Where does your business knowledge live?',
          'How do you control access?',
          'What will it cost as usage grows?',
          'What happens if you need to change providers later?',
        ],
      },
      {
        kind: 'labelList',
        heading: 'Google Cloud, Azure, or your infrastructure.',
        intro: 'We primarily work with:',
        items: [
          { label: 'Google Cloud', desc: "Including Vertex AI, Gemini, Google's Agent Development Kit (ADK), and Google Cloud infrastructure." },
          { label: 'Microsoft Azure', desc: 'Including Azure AI Foundry, the Microsoft Agent Framework and Semantic Kernel, and Microsoft identity and infrastructure.' },
          { label: 'Model providers', desc: 'We integrate the leading model APIs directly—Google Gemini, the Anthropic API (Claude), and the OpenAI API—and match the model to each task.' },
          { label: 'Your own infrastructure', desc: 'Including containerized AI workloads and Kubernetes where self-hosting makes sense.' },
        ],
      },
      {
        kind: 'prose',
        body: [
          'The answer isn\'t always "use the cloud."',
          'And it isn\'t always "build it yourself."',
          'We make that decision based on your requirements, security, data, existing environment, cost, and long-term goals.',
        ],
      },
      {
        kind: 'prose',
        technical: true,
        heading: 'For the technical team',
        body: ['We design the layers that make a production AI system work:'],
      },
      {
        kind: 'bulletList',
        technical: true,
        items: [
          'Agent framework',
          'Model strategy',
          'Runtime',
          'Retrieval',
          'Session memory',
          'Identity and permissions',
          'Observability',
          'Security',
          'Deployment and operations',
        ],
      },
      {
        kind: 'prose',
        technical: true,
        body: [
          'We also consider portability from the beginning.',
          'Open frameworks and protocols such as MCP and A2A can help prevent your AI architecture from becoming unnecessarily tied to one vendor.',
        ],
      },
      {
        kind: 'bulletList',
        heading: 'Where we typically start',
        items: [
          'Moving an AI prototype into production',
          "Building a company's first AI platform",
          'Consolidating multiple AI experiments',
          'Establishing enterprise AI standards',
          'Supporting hybrid or multi-cloud environments',
          'Self-hosting models for specific privacy, cost, or data requirements',
        ],
      },
      {
        kind: 'result',
        heading: 'The result',
        body: [
          'A production-ready foundation that gives your AI projects somewhere reliable to live—and gives your technical team a clear path forward.',
        ],
      },
    ],
    cta: "Let's plan your AI foundation",
  },
];

/** Look up a page by its route slug. */
export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Core Positioning — rendered at the top of /services (and the source of the
// home hero headline + closing line).
// ---------------------------------------------------------------------------

export const corePositioning = {
  headline: 'AI that works for your business.',
  body: [
    "AI is moving quickly. The challenge isn't figuring out whether AI is interesting. It's figuring out where it can actually make your business better.",
    'Cloud Computing Associates helps businesses find those opportunities, build practical AI solutions, and put them into production.',
    'We work with the systems and cloud environment you already have—primarily Google Cloud, Microsoft Azure, or your own infrastructure.',
  ],
  approachLead: 'Our approach is simple:',
  approach: 'Find the opportunity. Build the solution. Prove the value. Put you in control.',
};

// ---------------------------------------------------------------------------
// Delivery Framework — the full section lives on /services (anchor
// #delivery-framework); a compact five-phase strip links to it from the home
// page.
// ---------------------------------------------------------------------------

export interface DeliveryPhase {
  name: string;
  description: string;
}

export const deliveryFramework: {
  heading: string;
  intro: string[];
  phases: DeliveryPhase[];
} = {
  heading: 'From idea to working AI.',
  intro: [
    "You don't need to know exactly what technology you need before talking to us.",
    'We start with the business problem and work from there.',
  ],
  phases: [
    { name: 'Assess', description: 'We understand the process, the people involved, the systems it touches, and what the work currently costs.' },
    { name: 'Architect', description: 'We determine what should be automated, where AI actually adds value, and what technology makes sense for your environment.' },
    { name: 'Build', description: 'We build the solution in working increments, with your team involved along the way.' },
    { name: 'Prove', description: 'We measure the result against the starting point. Faster? Less expensive? More capacity? Better customer service? We define that before we call it successful.' },
    { name: 'Transfer', description: "You don't rent our expertise forever. We document what we built, train your team, and hand over a system your organization can operate." },
  ],
};
