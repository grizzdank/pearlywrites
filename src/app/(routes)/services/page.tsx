import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Container } from '../../components/ui'

const tiers = [
  {
    name: 'SEO & Content Strategy',
    id: 'seo-content',
    href: '/contact',
    description: 'Comprehensive SEO and content strategy services to boost your online presence.',
    features: [
      'Keyword research and analysis',
      'Content gap analysis',
      'SEO audit and recommendations',
      'Content calendar planning',
      'Monthly performance reports',
      'Competitor analysis',
    ],
    featured: true,
  },
  {
    name: 'Content Development',
    id: 'content-dev',
    href: '/contact',
    description: 'Professional content writing services tailored to your brand voice.',
    features: [
      'Blog posts and articles',
      'Website copy',
      'Social media content',
      'Email newsletters',
      'Case studies',
      'White papers',
    ],
  },
  {
    name: 'Educational Publishing',
    id: 'edu-publishing',
    href: '/contact',
    description: 'Expert educational content development for publishers and institutions.',
    features: [
      'Curriculum development',
      'Textbook writing',
      'Educational materials',
      'Assessment creation',
      'Teacher resources',
      'Student workbooks',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-brand-500 dark:text-brand-400">Services</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Choose the right service for your needs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From SEO strategy to educational content development, we offer comprehensive writing and content services
            to help you achieve your goals.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ${
                tier.featured 
                  ? 'bg-brand-900 ring-brand-900 dark:bg-brand-800 dark:ring-brand-800' 
                  : 'bg-white dark:bg-gray-800 ring-gray-200 dark:ring-gray-700'
              } xl:p-10`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  className={`text-lg font-semibold leading-8 ${
                    tier.featured ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {tier.name}
                </h3>
              </div>
              <p className={`mt-4 text-sm leading-6 ${tier.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 ${tier.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${tier.featured ? 'text-white' : 'text-brand-500 dark:text-brand-400'}`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-white text-brand-900 hover:bg-gray-100 focus-visible:outline-white dark:hover:bg-gray-100'
                    : 'bg-brand-500 text-white hover:bg-brand-600 focus-visible:outline-brand-500 dark:bg-brand-400 dark:hover:bg-brand-500'
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-32 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Custom Solutions Available
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Need a customized solution? Contact us to discuss your specific requirements and how we can help you achieve
            your content goals.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-brand-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-brand-400 dark:hover:bg-brand-500"
            >
              Contact us
            </Link>
            <Link href="/portfolio" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400">
              View our work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
} 