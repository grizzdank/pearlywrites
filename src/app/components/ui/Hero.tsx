import Image from 'next/image'
import { Container } from './Container'
import { Button } from './Button'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function Hero({
  title = "Crafting Content That Connects",
  subtitle = "Expert content strategy, SEO optimization, and educational publishing services to help your brand stand out and engage your audience.",
  ctaText = "Get Started",
  ctaHref = "/contact",
  className = '',
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-brand-900 dark:to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-brand/[0.03] -z-10" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-brand-50/20 dark:bg-brand-900/20 -z-10" />
      
      <Container className={`relative py-24 sm:py-32 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button href={ctaHref} size="lg">
                {ctaText}
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Portfolio
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
            <Image
              src="/pearlywriteshero.jpeg"
              alt="Creative workspace with colorful umbrellas and hanging lights"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent" />
          </div>
        </div>
      </Container>
    </div>
  )
} 