import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { SERVICES } from "@/lib/content/services";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import { SERVICE_AREAS } from "@/lib/content/serviceAreas";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import { BLOG_POSTS } from "@/lib/content/blog";
import HomeHero from "@/components/sections/HomeHero";
import EmergencyBand from "@/components/sections/EmergencyBand";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadge from "@/components/ui/TrustBadge";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Button from "@/components/ui/Button";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function HomePage({ locale, dict }: Props) {
  const paths = PATHS[locale];

  return (
    <>
      <HomeHero dict={dict} locale={locale} />

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title={dict.trust.heading} align="center" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, idx) => (
            <TrustBadge key={item.title} index={idx} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="bg-ink-50/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={dict.servicesSection.eyebrow}
            title={dict.servicesSection.title}
            subtitle={dict.servicesSection.subtitle}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, idx) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={service[locale].shortTitle}
                description={service[locale].cardDescription}
                href={paths[service.key]}
                cta={dict.buttons.viewService}
                featured={idx === 0}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href={paths.services} variant="ghost" size="lg">
              {dict.buttons.viewAllServices}
            </Button>
          </div>
        </div>
      </section>

      <EmergencyBand dict={dict} />

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow={dict.areasSection.eyebrow}
          title={dict.areasSection.title}
          subtitle={dict.areasSection.subtitle}
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SERVICE_AREAS.slice(0, 12).map((area) => (
            <div
              key={area.city}
              className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-medium text-ink-700 shadow-sm"
            >
              <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
              {area.city}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={paths.serviceAreas}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {dict.buttons.viewAllServices}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-ink-50/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={dict.testimonialsSection.eyebrow}
            title={dict.testimonialsSection.title}
            subtitle={dict.testimonialsSection.subtitle}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, 6).map((t) => (
              <TestimonialCard key={t.name} testimonial={t} locale={locale} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href={paths.reviews} variant="ghost" size="lg">
              {dict.buttons.readMore}
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow={dict.faqSection.eyebrow}
          title={dict.faqSection.title}
          subtitle={dict.faqSection.subtitle}
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion
            items={GENERAL_FAQS.slice(0, 5).map((f) => ({
              question: f.question[locale],
              answer: f.answer[locale],
            }))}
          />
        </div>
        <div className="mt-8 text-center">
          <Button href={paths.faq} variant="ghost" size="lg">
            {dict.buttons.readMore}
          </Button>
        </div>
      </section>

      <section className="bg-ink-50/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={dict.blogSection.eyebrow}
            title={dict.blogSection.title}
            subtitle={dict.blogSection.subtitle}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.id}
                  href={`${paths.blog}/${post.slug[locale]}`}
                  className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {post.category[locale]}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-brand-700">
                    {post[locale].title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 line-clamp-3">
                    {post[locale].excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    {dict.buttons.readMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button href={paths.blog} variant="ghost" size="lg">
              {dict.buttons.allPosts}
            </Button>
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
