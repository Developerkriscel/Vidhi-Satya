import { buildPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { buildWebPageJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  return buildPageMetadata("refund-policy", {
    pathname: "/refund-policy",
    ogImage: "/brand/vidhi-satya-logo.png"
  });
}

export default function RefundPolicyPage() {
  const refundPolicySchema = buildWebPageJsonLd({
    pathname: "/refund-policy",
    type: "WebPage",
    title: "Refund Policy",
    description: "Refund policy for advisory engagement at vidhisatya.com."
  });

  return (
    <>
      <StructuredData data={refundPolicySchema} />
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            title="Refund Policy"
            description="Please review this policy carefully before assigning work."
            className="max-w-3xl"
          />
          <Card className="mt-8">
            <CardContent className="p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>Vidhisatya.com follows ethics in all its working ever. Only genuine work is undertaken subject to solicitation and not otherwise.</li>
                <li>The fee and expenses are kept adequate &amp; commensurate bespoke and customized work undertaken.</li>
                <li>There is no work result based fee charged, unless for specific purpose. The refund of fee is thus infructuous and not possible at our end.</li>
                <li>We advise the client to wisely make choice and assign work with full details and upon clear understanding of the time and costing involved and not get carried away with any assumptions.</li>
                <li>However, we do pro bono work too to support society causes, so in said case no refund exist.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
