import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const db = new PrismaClient({ adapter });

const TOPICS = [
  { name: "Company Registration", slug: "company-registration", description: "Incorporation, entity types, and legal registration steps." },
  { name: "Funding", slug: "funding", description: "Bootstrapping, angel investment, venture capital, and funding rounds." },
  { name: "Legal & Compliance", slug: "legal-compliance", description: "Contracts, IP protection, licenses, and regulatory compliance." },
  { name: "Hiring", slug: "hiring", description: "Recruiting, employment contracts, and building early teams." },
  { name: "Branding", slug: "branding", description: "Naming, positioning, visual identity, and brand strategy." },
  { name: "Marketing", slug: "marketing", description: "Growth channels, content, SEO, and customer acquisition." },
  { name: "Taxation", slug: "taxation", description: "Business taxes, GST/VAT, and startup tax exemptions." },
  { name: "Fundraising", slug: "fundraising", description: "Pitch decks, term sheets, and investor outreach." },
  { name: "AI Tools", slug: "ai-tools", description: "Practical AI tools for early-stage startup operations." },
  { name: "Business Growth", slug: "business-growth", description: "Scaling operations, retention, and expansion strategy." },
];

const ARTICLES: Record<string, { title: string; content: string; tags: string[] }[]> = {
  "company-registration": [
    {
      title: "How to Register a Private Limited Company",
      content:
        "A private limited company is the most common structure for startups seeking outside investment. Steps: 1) Obtain Digital Signature Certificate (DSC) for proposed directors. 2) Apply for Director Identification Number (DIN). 3) Reserve a company name via the registrar. 4) File incorporation documents (MOA, AOA) with the registrar of companies. 5) Receive Certificate of Incorporation. Typical timeline is 7-15 working days. A private limited company offers limited liability, easier fundraising, and higher credibility with investors compared to a sole proprietorship or partnership.",
      tags: ["registration", "incorporation", "legal-structure"],
    },
    {
      title: "Choosing the Right Legal Structure for Your Startup",
      content:
        "Common structures: Sole Proprietorship (simplest, no liability protection), Partnership (shared ownership, shared liability), LLP (limited liability, flexible management), Private Limited Company (best for raising VC funding, limited liability, more compliance). Most VC-backed startups choose a private limited company because investors require share issuance, which sole proprietorships and partnerships cannot offer.",
      tags: ["legal-structure", "incorporation"],
    },
  ],
  funding: [
    {
      title: "Startup Funding Stages Explained",
      content:
        "Pre-seed: friends, family, and personal savings, typically under $150K. Seed: angel investors and seed funds, $150K-$2M, used to reach product-market fit. Series A: institutional VCs, $2M-$15M, focused on scaling a proven model. Series B and beyond: larger rounds for expansion. Each stage typically corresponds to a valuation step-up and increased investor expectations around traction metrics.",
      tags: ["funding", "venture-capital", "seed"],
    },
    {
      title: "Bootstrapping vs Raising Venture Capital",
      content:
        "Bootstrapping means growing using revenue and personal funds, retaining full ownership and control but growing slower. Venture capital provides large capital injections for fast growth but dilutes ownership and introduces investor expectations around growth rate and eventual exit. The right choice depends on market timing, capital intensity of the business, and founder risk tolerance.",
      tags: ["funding", "bootstrapping"],
    },
  ],
  "legal-compliance": [
    {
      title: "Essential Legal Documents Every Startup Needs",
      content:
        "Founders' agreement (equity split, roles, vesting), Employment contracts, NDA templates, Terms of Service and Privacy Policy for the product, IP assignment agreements ensuring the company owns work product. Missing these documents is one of the most common causes of early-stage disputes and due diligence failures during fundraising.",
      tags: ["legal", "compliance", "contracts"],
    },
  ],
  hiring: [
    {
      title: "Building Your First Startup Team",
      content:
        "Early hires should be generalists comfortable with ambiguity. Prioritize hiring for the biggest bottleneck first, whether that's engineering, sales, or operations. Use equity + salary combinations competitively when cash is limited. Always issue a formal offer letter and employment contract, even for the first hire, to avoid disputes later.",
      tags: ["hiring", "team-building"],
    },
  ],
  branding: [
    {
      title: "Building a Startup Brand That Stands Out",
      content:
        "A strong brand includes a clear name, consistent visual identity (logo, color palette, typography), and a distinct positioning statement answering: who is this for, and why does it matter. Avoid generic naming conventions. Test your name and logo with target users before committing, and trademark-check availability early to avoid costly rebrands.",
      tags: ["branding", "positioning"],
    },
  ],
  marketing: [
    {
      title: "Customer Acquisition Channels for Early-Stage Startups",
      content:
        "Common channels: content marketing/SEO (slow but compounding), paid ads (fast but costly), community-led growth (Reddit, Discord, niche forums), referral programs, and cold outreach. Early-stage startups should pick 1-2 channels and go deep rather than spreading thin across many channels with no clear owner.",
      tags: ["marketing", "growth", "acquisition"],
    },
  ],
  taxation: [
    {
      title: "Startup Tax Basics You Should Know",
      content:
        "Startups typically need to register for GST/VAT once revenue crosses a threshold, file annual corporate tax returns, and may qualify for startup tax exemptions in their first few years depending on jurisdiction. Keep clean books from day one — retroactively reconstructing financials for investor due diligence is a common and painful mistake.",
      tags: ["taxation", "compliance"],
    },
  ],
  fundraising: [
    {
      title: "How to Build an Investor-Ready Pitch Deck",
      content:
        "A strong pitch deck covers: problem, solution, market size, product demo, business model, traction/metrics, team, competitive landscape, and the ask (how much you're raising and for what). Keep it to 10-15 slides. Investors spend an average of a few minutes per deck on first pass, so clarity matters more than density.",
      tags: ["fundraising", "pitch-deck"],
    },
  ],
  "ai-tools": [
    {
      title: "Practical AI Tools for Early-Stage Startups",
      content:
        "Common categories: AI coding assistants (Cursor, Claude Code, GitHub Copilot) for faster development, AI writing tools for marketing content, AI customer support chatbots for early-stage support scaling, and AI analytics tools for faster data insights without a dedicated data team. Startups should adopt AI tools where they remove a real bottleneck, not just because a tool is trending.",
      tags: ["ai-tools", "productivity"],
    },
  ],
  "business-growth": [
    {
      title: "Scaling Operations Without Breaking Your Startup",
      content:
        "Growth often breaks informal processes. Signs you need to formalize operations: missed customer follow-ups, inconsistent onboarding, and founder bottlenecks in every decision. Introduce lightweight documentation, clear ownership per function, and basic metrics tracking before scaling headcount, not after.",
      tags: ["growth", "scaling", "operations"],
    },
  ],
};

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await db.user.upsert({
    where: { email: "admin@startupnavigator.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@startupnavigator.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  for (const topic of TOPICS) {
    const createdTopic = await db.topic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: topic,
    });

    const articles = ARTICLES[topic.slug] ?? [];
    for (const article of articles) {
      const articleSlug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      await db.article.upsert({
        where: { slug: articleSlug },
        update: {},
        create: {
          title: article.title,
          slug: articleSlug,
          content: article.content,
          tags: article.tags,
          topicId: createdTopic.id,
          authorId: admin.id,
        },
      });
    }
  }

  await db.resource.createMany({
    data: [
      {
        title: "Startup India Portal",
        url: "https://www.startupindia.gov.in",
        type: "Government Portal",
        description: "Official registration and recognition portal for Indian startups.",
        authorId: admin.id,
      },
      {
        title: "Y Combinator Startup Library",
        url: "https://www.ycombinator.com/library",
        type: "Guide",
        description: "Free essays and guides on fundraising, growth, and product.",
        authorId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete. Admin login: admin@startupnavigator.com / Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });