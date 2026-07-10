export interface Dictionary {
  meta: {
    siteName: string;
    tagline: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    serviceAreas: string;
    reviews: string;
    faq: string;
    blog: string;
    contact: string;
    emergency: string;
    menu: string;
    close: string;
  };
  buttons: {
    callNow: string;
    requestQuote: string;
    whatsappDirect: string;
    whatsappChat: string;
    emergencyService: string;
    readMore: string;
    viewAllServices: string;
    sendMessage: string;
    sendRequest: string;
    viewService: string;
    backToOverview: string;
    allPosts: string;
    ourServices: string;
    contactUs: string;
    getInTouch: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  trust: {
    heading: string;
    items: { title: string; description: string }[];
  };
  emergencyBand: {
    title: string;
    description: string;
    cta: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  areasSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  faqSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  ctaSection: {
    title: string;
    subtitle: string;
  };
  blogSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    privacyNotice: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
  };
  quoteForm: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    serviceTypePlaceholder: string;
    address: string;
    message: string;
    urgency: string;
    urgencyOptions: { normal: string; urgent: string; emergency: string };
    submit: string;
    success: string;
    error: string;
    privacyNotice: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    ourServices: string;
    contact: string;
    followUs: string;
    openingHours: string;
    weekdays: string;
    emergencyLine: string;
    rights: string;
    privacyPolicy: string;
    terms: string;
    cookiePolicy: string;
    sitemap: string;
    kvk: string;
    vat: string;
  };
  cookie: {
    title: string;
    description: string;
    acceptAll: string;
    onlyNecessary: string;
    settings: string;
    privacyPolicy: string;
  };
  breadcrumbs: {
    home: string;
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
  };
  common: {
    phoneLabel: string;
    whatsappLabel: string;
    availability: string;
    since: string;
    yearsExperience: string;
    minutes: string;
    guarantee: string;
  };
}
