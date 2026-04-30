import { buildPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { buildWebPageJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  return buildPageMetadata("privacy-policy", {
    pathname: "/privacy-policy",
    ogImage: "/brand/vidhi-satya-logo.png"
  });
}

export default function PrivacyPolicyPage() {
  const privacyPolicySchema = buildWebPageJsonLd({
    pathname: "/privacy-policy",
    type: "WebPage",
    title: "Privacy Policy",
    description: "Privacy policy for client engagement and information handling at vidhisatya.com."
  });

  return (
    <>
      <StructuredData data={privacyPolicySchema} />
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            title="Privacy Policy"
            description="Please review this privacy statement regarding client information."
            className="max-w-3xl"
          />
          <Card className="mt-8">
            <CardContent className="p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>The Vidhisatya.com working is client attorney conversation ever, so the same is supposed to be protected as privy between the client and only need based information ever shared ahead.</li>
                <li>Still client are advised to be considerate to share and give information which is essential for their work and not pass any irrelevant information to us.</li>
                <li>Clients are advised to provide us certified information, the original be seldom shared for limited purpose and time and be taken back soonest as we retain only information and certified copies.</li>
                <li>So what is private to client remain private however subject to force majeure submitting any detail to Govt. Authority/ Court of Law expected of us.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
