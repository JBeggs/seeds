import Link from 'next/link'
import { serverEcommerceApi, serverNewsApi } from '@/lib/api-server'
import AboutPageClient, { AnimatedSection, AnimatedCard } from '@/components/about/AboutPageClient'
import { Clock, Sparkles, Heart, Leaf, TrendingUp, Zap, Package } from 'lucide-react'
import { getCompany } from '@/lib/company'
import { unwrapEcommerceProductList } from '@/lib/ecommerce-list'
import PageHero from '@/components/hero/PageHero'

export const dynamic = 'force-dynamic'

async function getAboutContent() {
  try {
    const articlesData = await serverNewsApi.articles.getBySlug('about')
    const articles = Array.isArray(articlesData) ? articlesData : (articlesData as any)?.results || []
    return articles[0] || null
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

async function getSampleProducts() {
  try {
    const featured = await serverEcommerceApi.products.list({ is_active: true, featured: true, page_size: 8 })
    const featuredRaw = unwrapEcommerceProductList(featured)
    return featuredRaw.filter((p: any) => p.status !== 'archived').slice(0, 4)
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const [aboutArticle, sampleProducts, company] = await Promise.all([
    getAboutContent(),
    getSampleProducts(),
    getCompany(),
  ])
  const companyName = company.name

  const sections = [
    { id: 'story', label: 'Our Story' },
    { id: 'growers', label: 'For Growers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'believe', label: 'What We Believe' },
    ...(sampleProducts.length > 0 ? [{ id: 'examples', label: 'Catalogue preview' }] : []),
  ]

  return (
    <div className="min-h-screen bg-vintage-background">
      <PageHero pageSlug="about" fallback={null} />

      <section className="py-16 md:py-20 brand-gradient-band">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-on-dark">
              Our Story
            </h1>
            <p className="text-xl text-on-dark-muted">
              Honest varieties, clear pack sizes, and growing notes you can trust — season by season.
            </p>
          </div>
        </div>
      </section>

      <AboutPageClient sections={sections}>
        <AnimatedSection id="story" className="py-16">
          <div className="container-narrow">
            {aboutArticle ? (
              <div className="article-content" dangerouslySetInnerHTML={{ __html: aboutArticle.content }} />
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-text-light leading-relaxed mb-6">
                  {companyName} brings together vegetables, herbs, flowers, and regional favourites for home
                  gardeners, market plots, and seed savers. Listings stay tied to live catalog data so pack
                  sizes, tags (heirloom, open-pollinated, hybrid), and compliance notes come from the
                  retailer — not hardcoded theme copy.
                </p>
                <p className="text-lg text-text-light leading-relaxed">
                  When sowing windows or import notices apply, they should appear from product attributes or
                  site settings for your region, so you always see what the business intends to publish.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection id="growers" className="py-16 bg-white">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-vintage-primary" />
              For home & market gardeners
            </h2>
            <div className="space-y-6 text-text-light leading-relaxed">
              <p className="text-lg">
                We focus on small packets for balconies and backyards, bulk lines for rows and cover crops,
                and heritage varieties for people who save seed. Assortments and shelves are configured per
                store — not locked to a single taxonomy in this template.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="card-vintage p-6 border-l-4 border-vintage-primary">
                  <h3 className="font-semibold text-text mb-2">Catalogue clarity</h3>
                  <p className="text-text-muted text-sm">
                    Germination or testing dates show when the API provides them; otherwise those fields stay
                    hidden so we don&apos;t promise data we don&apos;t have.
                  </p>
                </div>
                <div className="card p-6 border-l-4 border-modern-primary">
                  <h3 className="font-semibold text-text mb-2">Regional copy</h3>
                  <p className="text-text-muted text-sm">
                    Phyto, import, or DAFF-facing notes belong in django-crm <code className="text-xs">SiteSetting</code>{' '}
                    keys — never as literals baked into JSX.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="how-it-works" className="py-16 bg-vintage-background">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-vintage-primary" />
              How the storefront works
            </h2>
            <div className="space-y-6 text-text-light leading-relaxed">
              <p className="text-lg">
                The business owner maintains products, images, shelves, and policies through admin tools tied
                to django-crm. Shoppers always see merged company +{' '}
                <code className="text-sm bg-black/5 px-1 rounded">SiteSetting</code> data — one codebase serves
                any seed tenant slug.
              </p>
              <p className="text-text-light">
                Articles and page heroes hydrate from the news API; shipping and checkout honour the same
                courier rules as sibling templates (<code className="text-sm">isCourierGuyCartItem</code>) so
                first-party carts still get live quotes.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="believe" className="py-16 bg-white" stagger>
          <div className="container-narrow">
            <h2 className="text-2xl font-bold font-playfair text-text mt-12 mb-6">What We Believe</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <AnimatedCard className="card-vintage p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-vintage-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-vintage-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">Right plant, right moment</h3>
                <p className="text-text-muted text-sm">
                  Sow windows should follow product or settings data — not guessed hemispheres inside the UI.
                </p>
              </AnimatedCard>
              <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-modern-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-modern-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">Open data over buzzwords</h3>
                <p className="text-text-muted text-sm">
                  Heirloom, OP, F1 badges come from catalog tags — we don&apos;t theme-wash hybrids as
                  &quot;artisan&quot; by accident.
                </p>
              </AnimatedCard>
              <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-vintage-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-vintage-accent" />
                </div>
                <h3 className="font-semibold text-text mb-2">Pollinator-positive where possible</h3>
                <p className="text-text-muted text-sm">
                  Indigenous mixes and pollinator blends surface through normal merchandising — no bespoke
                  hardcoded routes required.
                </p>
              </AnimatedCard>
              <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-text mb-2">Low-waste operations</h3>
                <p className="text-text-muted text-sm">
                  Digital fulfilment, consolidated shipments, and accurate weights keep courier quotes honest.
                </p>
              </AnimatedCard>
            </div>
            <h2 className="text-2xl font-bold font-playfair text-text mt-12 mb-6">Our Promise</h2>
            <p className="text-text-light leading-relaxed mb-6">
              When you shop with {companyName}, you&apos;re buying from a catalog the owner actively maintains:
              updated photos, honest descriptions, and policies you can read in plain language.
            </p>
            <p className="text-text-light leading-relaxed">
              Support questions go straight to the contact channels published in admin — no mystery inboxes.
            </p>
          </div>
        </AnimatedSection>

        {sampleProducts.length > 0 && (
          <AnimatedSection id="examples" className="py-16 bg-vintage-background">
            <div className="container-wide">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-2 flex items-center gap-3">
                <Package className="w-8 h-8 text-vintage-primary" />
                From the catalogue
              </h2>
              <p className="text-text-muted mb-8 max-w-2xl">
                Featured listings today — inventory and pricing always come from the live API.
              </p>
              <div className="product-grid">
                {sampleProducts.map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Package className="w-12 h-12 text-vintage-primary/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-text group-hover:text-vintage-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-text-muted mt-1 line-clamp-2 flex-1">{product.description}</p>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="price">R{Number(product.price || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/products" className="btn btn-primary">
                  View All Products
                </Link>
              </div>
            </div>
          </AnimatedSection>
        )}

        <section className="py-16 bg-modern-primary text-white">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold font-playfair mb-4">Ready to sow?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse packs, staples, and seasonal varieties — fulfilment follows the courier settings your
              store has enabled.
            </p>
            <Link href="/products" className="btn btn-gold text-lg px-8 py-3">
              Shop Seeds
            </Link>
          </div>
        </section>
      </AboutPageClient>
    </div>
  )
}
