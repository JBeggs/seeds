import { ChevronDown, ChevronUp } from 'lucide-react'
import { getCompany } from '@/lib/company'

function buildFaqs(companyName: string) {
  return [
    {
      question: 'How do pack sizes and seed counts work?',
      answer:
        'Each listing shows the quantity you receive (packets, grams, or approximate seed counts) from the product data in our catalog. If something is unclear, contact us before you order.',
    },
    {
      question: 'Do you ship seeds across South Africa?',
      answer:
        'We ship within South Africa. Delivery times depend on courier selection and region. Tracking is provided when available. Regional import or phytosanitary notices, when required, appear on product or policy pages from your retailer’s settings — not hardcoded here.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept major credit and debit cards through our secure payment gateway (e.g. Yoco where configured). Transactions are encrypted.',
    },
    {
      question: 'Can I return unopened packets?',
      answer:
        'Return windows and conditions depend on each store’s policies, published on the Returns page and in your order confirmation. Reach out via the contact details on that page if you need help.',
    },
    {
      question: 'How should I store seeds?',
      answer:
        'Keep packets cool, dry, and out of direct sunlight until sowing. For long-term storage, airtight containers with silica gel can help; follow any variety-specific guidance in the listing description.',
    },
    {
      question: 'Are heirlooms, hybrids, and open-pollinated varieties labelled correctly?',
      answer:
        'Variety types should match tags and descriptions from the catalog. When in doubt, ask the retailer before planting — classifications are theirs to maintain.',
    },
    {
      question: `Can I wholesale or buy in bulk from ${companyName}?`,
      answer:
        'Bulk and trade enquiries depend on inventory and policy. Contact us with what you need (species, quantities, timing) and we will confirm availability.',
    },
  ]
}

export default async function FAQPage() {
  const company = await getCompany()
  const faqs = buildFaqs(company.name)
  return (
    <div className="min-h-screen bg-vintage-background">
      {/* Header */}
      <section className="py-12 bg-vintage-primary text-white">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-green-100">
            Find answers to common questions about shopping with us
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container-narrow">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card group">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                  <h3 className="font-semibold text-text pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0 group-open:hidden" />
                  <ChevronUp className="w-5 h-5 text-text-muted flex-shrink-0 hidden group-open:block" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-text-light">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold font-playfair text-text mb-2">
              Still have questions?
            </h2>
            <p className="text-text-muted mb-4">
              We&apos;re here to help! Reach out to our friendly team.
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
