import Image from "next/image";
import { ArrowDown, ArrowDownLeft, ArrowDownRight } from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";
import { getPublicBlogsData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { resolveBlogImage } from "@/lib/blog-image";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { BlogItem } from "@/types";

type Props = {
  searchParams?: Promise<{ search?: string; tag?: string }>;
};

export async function generateMetadata() {
  return buildPageMetadata("blog", {
    pathname: "/blog",
    ogImage: "/uploads/blog-designing-public-programs.jpeg"
  });
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = (await searchParams) || {};
  const { search, tag } = resolvedSearchParams;
  const blogs = (await getPublicBlogsData(search, tag)) as BlogItem[];
  const featured = blogs[0];
  const topTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags))).slice(0, 8);
  const workingFlowSteps = [
    {
      id: 1,
      text: "Request Form is Received by us"
    },
    {
      id: 2,
      text: "It is checked and introductory email and a detail seeking google form is sent"
    },
    {
      id: 3,
      text: "Once response to introductory email and filled google form received, the team vidhisatya.com sets in motion and task force is formed to do needful as desired by the client; and fee and expenses commensurate work are approximated and shared with client"
    },
    {
      id: 4,
      text: "Advances towards fee and expenses are requested and on receipt of the same, the desired work is begun within time frame intimated."
    },
    {
      id: 5,
      text: "Day to Day working is defined and progress is shared in confidence with clients or their representative online (our intranet or email and whatsapp). Record of all working is fairly kept, subject to force majeure."
    },
    {
      id: 6,
      text: "Clients are time to time updated on information and documentation and protocol requirements. Online and Offline needful meeting are held."
    },
    {
      id: 7,
      text: "In case there is amendment in scope of work or any exigency, our team learns, adapts and changes course of action as per revised instructions of the clients, to the extent possible."
    },
    {
      id: 8,
      text: "Work is usually completed in time frame set or revised per force majeure. Once work is done, the record of working are kept or disposed off ethically as per our process."
    }
  ];
  const desktopAlignment = ["justify-center", "justify-end", "justify-center", "justify-start", "justify-center", "justify-end", "justify-center", "justify-start"];
  const desktopArrowIcons = [ArrowDownRight, ArrowDownLeft, ArrowDownLeft, ArrowDownRight, ArrowDownRight, ArrowDownLeft, ArrowDownLeft];
  const desktopArrowAlignment = ["justify-end", "justify-center", "justify-start", "justify-start", "justify-end", "justify-center", "justify-start"];
  const blogCollectionSchema = buildWebPageJsonLd({
    pathname: "/blog",
    type: "CollectionPage",
    title: "Insights",
    description: "Practical perspectives on governance, strategy, and execution.",
    imageUrl: featured ? resolveBlogImage(featured) : "/uploads/blog-designing-public-programs.jpeg"
  });
  const blogListSchema = buildItemListJsonLd({
    pathname: "/blog",
    name: "Blog Articles",
    itemPaths: blogs.map((blog) => `/blog/${blog.slug}`)
  });

  return (
    <>
      <StructuredData data={[blogCollectionSchema, blogListSchema]} />
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            title="Insights"
            description="Practical perspectives on governance, strategy, and execution."
            className="max-w-3xl"
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Founder</p>
                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-outline-variant/20">
                    <Image
                      src="/uploads/rajesh-narang.jpg"
                      alt="Rajesh Narang, founder and mentor at Vidhi Satya"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Rajesh Narang</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      Founder and mentor with 35+ years of advisory experience across individual, corporate, and government matters.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      He has guided decision-makers on governance, compliance, strategic positioning, risk management, and execution
                      planning for complex mandates. His advisory approach combines practical legal-business judgment, structured
                      implementation support, and confidential stakeholder alignment for high-impact outcomes.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      Over the years, he has supported founders, leadership teams, and institutions in setting clear priorities, resolving
                      operational bottlenecks, and executing time-sensitive decisions with accountability. His work emphasizes actionable
                      roadmaps, disciplined follow-through, and measurable progress from planning to implementation.
                    </p>
                    <a
                      href="https://www.linkedin.com/in/rajesh-narang-b405bb32/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                    >
                      View LinkedIn Profile
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Co-Founder</p>
                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-outline-variant/20">
                    <Image
                      src="/uploads/avika-narang.jpg"
                      alt="Avika Narang, co-founder at Vidhi Satya"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Avika Narang</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      Co-founder supporting the strategic direction of Vidhi Satya across research, insight publishing, and audience
                      communication.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      She contributes to topic development, editorial planning, and quality review to ensure every insight translates
                      complex governance and business issues into practical, decision-ready clarity.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      Her work focuses on consistent knowledge delivery, structured content operations, and strengthening the bridge
                      between advisory thinking and implementation-focused communication.
                    </p>
                    <a
                      href="https://www.linkedin.com/in/avika-narang-746637240/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                    >
                      View LinkedIn Profile
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Insight Desk</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">What You Get</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Focused analysis with practical implications, sequencing guidance, and execution checkpoints.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Coverage</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Topics</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topTags.length ? (
                    topTags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">New topic tags will appear here.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">How To Use</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Read Fast</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start with featured notes for current context, then move to topic-specific posts for deeper decision support.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-10">
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Mode of Working</p>
              <p className="mt-1 font-[family-name:var(--font-newsreader)] text-2xl font-semibold">Working Flow Chart</p>
              <div className="mt-4 lg:hidden">
                <div className="space-y-2">
                  {workingFlowSteps.map((step, idx) => (
                    <div key={step.id}>
                      <div className="rounded-[0.85rem] border border-outline-variant/35 bg-surface p-3 text-foreground shadow-sm">
                        <p className="text-sm font-semibold text-accent">Step {step.id}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.text}</p>
                      </div>
                      {idx < workingFlowSteps.length - 1 ? (
                        <div className="my-1 flex justify-center text-accent">
                          <ArrowDown className="h-4 w-4" aria-hidden="true" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 hidden lg:block">
                <div className="space-y-1">
                  {workingFlowSteps.map((step, idx) => {
                    const ArrowIcon = idx < workingFlowSteps.length - 1 ? desktopArrowIcons[idx] : null;

                    return (
                      <div key={step.id}>
                        <div className={`flex ${desktopAlignment[idx]}`}>
                          <div className="w-[20rem] rounded-[0.85rem] border border-outline-variant/35 bg-surface p-3 text-foreground shadow-sm">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Step {step.id}</p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.text}</p>
                          </div>
                        </div>
                        {ArrowIcon ? (
                          <div className={`my-0.5 flex ${desktopArrowAlignment[idx]} px-8 text-accent`}>
                            <ArrowIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <CTASection title="Need Context for a Critical Decision?" description="Speak with our advisors for a focused strategy conversation." />
    </>
  );
}
