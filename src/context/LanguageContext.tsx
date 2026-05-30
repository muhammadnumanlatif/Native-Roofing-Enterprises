'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface TranslationDictionary {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: TranslationDictionary = {
  // Navigation
  home: { en: 'Home', es: 'Inicio' },
  services: { en: 'Services', es: 'Servicios' },
  financing: { en: 'Financing', es: 'Financiamiento' },
  faq: { en: 'FAQ', es: 'Preguntas Frecuentes' },
  contact: { en: 'Contact', es: 'Contacto' },
  getQuote: { en: 'Get a Free Quote', es: 'Obtener Cotización Gratis' },
  
  // Hero Section
  heroSubtitle: { en: 'Serving Palm Beach & Broward Counties', es: 'Sirviendo a los Condados de Palm Beach y Broward' },
  heroTitle1: { en: 'Wellington’s Trusted', es: 'El Contratista de Techos' },
  heroTitle2: { en: 'Hometown Roofing Contractor', es: 'De Confianza de Wellington' },
  heroDesc: { 
    en: 'At Native Roofing, your roof is our priority. With over 40 years of combined local experience, we deliver exceptional craftsmanship and premium materials to protect South Florida homes against storm damage and extreme weather. Peace of mind begins with a roof that stands strong.',
    es: 'En Native Roofing, su techo es nuestra prioridad. Con más de 40 años de experiencia local combinada, brindamos una mano de obra excepcional y materiales de primera calidad para proteger los hogares del sur de Florida contra daños por tormentas y clima extremo.'
  },
  heroRatingText: { en: 'Rated 5.0/5.0 by hundreds of South Florida homeowners', es: 'Calificado 5.0/5.0 por cientos de propietarios en el sur de Florida' },
  heroNextdoor: { en: 'Nextdoor Neighborhood Favorite', es: 'Favorito del Vecindario en Nextdoor' },
  heroGAF: { en: 'GAF Certified Contractor', es: 'Contratista Certificado por GAF' },
  heroExperience: { en: '35+ Years Local Experience', es: 'Más de 35 Años de Experiencia Local' },

  // 5-Step Quote Form
  formTitle: { en: 'Get Your Free Inspection', es: 'Obtenga una Inspección Gratis' },
  formStep: { en: 'Step', es: 'Paso' },
  formNext: { en: 'Next Step', es: 'Siguiente Paso' },
  formPrev: { en: 'Back', es: 'Atrás' },
  formSubmitting: { en: 'Submitting...', es: 'Enviando...' },
  formSuccessTitle: { en: 'Thank You!', es: '¡Gracias!' },
  formSuccessMsg: { en: 'Your request has been received. Our roofing specialist will call you shortly to schedule your free inspection.', es: 'Hemos recibido su solicitud. Nuestro especialista se comunicará con usted en breve para programar su inspección gratuita.' },
  
  // Form Questions
  qServiceType: { en: 'What type of roofing service do you need?', es: '¿Qué tipo de servicio de techado necesita?' },
  optRepair: { en: 'Roof Repair / Leak Fix', es: 'Reparación de Techo / Goteras' },
  optReplace: { en: 'Full Roof Replacement', es: 'Reemplazo Completo de Techo' },
  optInspect: { en: 'Free Inspection / Quote', es: 'Inspección / Cotización Gratis' },
  optMaintenance: { en: 'Commercial Maintenance', es: 'Mantenimiento Comercial' },

  qMaterial: { en: 'What is your preferred roofing material?', es: '¿Cuál es su material de techado preferido?' },
  optShingle: { en: 'Asphalt Shingle', es: 'Teja de Asfalto (Shingle)' },
  optTile: { en: 'Concrete / Clay Tile', es: 'Teja de Arcilla o Concreto' },
  optMetal: { en: 'Standing Seam Metal', es: 'Techo de Metal' },
  optFlat: { en: 'Flat Roof System', es: 'Sistema de Techo Plano' },

  qUrgency: { en: 'How urgent is this project?', es: '¿Qué tan urgente es este proyecto?' },
  optActiveLeak: { en: 'Emergency (Active Leak or Storm Damage)', es: 'Emergencia (Gotera Activa o Daño por Tormenta)' },
  optSoon: { en: 'Planning within the next month', es: 'Planeado para el próximo mes' },
  optResearch: { en: 'Just gathering information', es: 'Solo buscando información' },

  qProperty: { en: 'What is the property type?', es: '¿Cuál es el tipo de propiedad?' },
  optResidential: { en: 'Residential Home', es: 'Casa Residencial' },
  optCommercial: { en: 'Commercial / HOA Multi-Family', es: 'Comercial / Multifamiliar HOA' },

  qContact: { en: 'Enter your contact details to schedule', es: 'Ingrese sus datos para programar' },
  phName: { en: 'Full Name', es: 'Nombre Completo' },
  phPhone: { en: 'Phone Number', es: 'Número de Teléfono' },
  phEmail: { en: 'Email Address', es: 'Correo Electrónico' },
  phAddress: { en: 'Property City / Zip Code', es: 'Ciudad / Código Postal de la Propiedad' },
  validationFields: { en: 'Please fill out all fields correctly.', es: 'Por favor complete todos los campos correctamente.' },

  // Before / After Slider Section
  sliderTitle: { en: 'Before & After: Real Protection', es: 'Antes y Después: Protección Real' },
  sliderSubtitle: { en: 'Drag the slider to see how we restore damaged roofs to storm-resistant structural perfection.', es: 'Arrastre el control deslizante para ver cómo restauramos techos dañados en Wellington.' },
  sliderBeforeLabel: { en: 'BEFORE: Hail & Tornado Damage', es: 'ANTES: Daño por Granizo y Tornado' },
  sliderAfterLabel: { en: 'AFTER: Certified Native Roof', es: 'DESPUÉS: Techo Native Certificado' },

  // Services Section
  servicesTitle: { en: 'Our Specialized Roofing Solutions', es: 'Nuestras Soluciones de Techado Especializadas' },
  servicesSubtitle: { en: 'Providing comprehensive residential and commercial services tailored to South Florida building codes.', es: 'Ofrecemos servicios residenciales y comerciales adaptados a los códigos de construcción de Florida.' },
  servRepairTitle: { en: 'Emergency Repairs & Leaks', es: 'Reparaciones de Emergencia' },
  servRepairDesc: { en: 'Rapid response leak identification and emergency tarping to secure your property after high winds or heavy rain.', es: 'Identificación rápida de filtraciones y entoldado de emergencia para asegurar su propiedad tras tormentas.' },
  servReplaceTitle: { en: 'Premium Roof Replacements', es: 'Reemplazos Completos de Techo' },
  servReplaceDesc: { en: 'Complete tear-off and replacement utilizing premium shingles, hurricane-resistant metal, or luxury clay tile systems.', es: 'Desmonte y reemplazo completo utilizando tejas premium, metal resistente a huracanes o sistemas de teja de arcilla.' },
  servMaintTitle: { en: 'Commercial & HOA Management', es: 'Gestión Comercial y de HOA' },
  servMaintDesc: { en: 'Certified inspection, maintenance plans, and cost analyses for property managers and multi-family communities.', es: 'Inspección certificada, planes de mantenimiento y análisis de costos para administradores y comunidades de HOA.' },
  servMetalTitle: { en: 'Storm-Resistant Metal Systems', es: 'Sistemas de Techos Metálicos' },
  servMetalDesc: { en: 'Unmatched durability and energy efficiency designed to withstand wind gusts up to 150+ MPH.', es: 'Durabilidad y eficiencia energética inigualables, diseñadas para soportar ráfagas de viento de más de 150 MPH.' },
  
  // Financing Section
  finTitle: { en: 'Flexible Roofing Financing Plans', es: 'Planes de Financiamiento Flexibles' },
  finSubtitle: { en: 'Get the protection your home needs now. Pay comfortably over time with low monthly payment options.', es: 'Obtenga la protección que su hogar necesita hoy. Pague cómodamente a plazos con bajas cuotas mensuales.' },
  finCardHeader: { en: 'Estimate Your Monthly Payments', es: 'Estime sus Pagos Mensuales' },
  finRoofCostLabel: { en: 'Estimated Roof Cost', es: 'Costo Estimado del Techo' },
  finTermLabel: { en: 'Loan Term', es: 'Plazo del Préstamo' },
  finYears: { en: 'Years', es: 'Años' },
  finEstPayment: { en: 'Estimated Monthly Payment', es: 'Pago Mensual Estimado' },
  finInterestText: { en: '*Based on approved credit, interest rates starting at 5.99%', es: '*Sujeto a aprobación de crédito, tasas de interés desde 5.99%' },
  finCTA: { en: 'Pre-Qualify Now via Enhancify', es: 'Precalifique hoy con Enhancify' },

  // FAQ Section
  faqTitle: { en: 'Frequently Asked Questions (FAQ)', es: 'Preguntas Frecuentes' },
  faqSubtitle: { en: 'Direct answers about licensing, insurance, and the roofing process in Wellington.', es: 'Respuestas directas sobre licencias, seguros y el proceso de techado en Wellington.' },
  
  // FAQs list
  faqQ1: { en: 'Is Native Roofing licensed and insured in Florida?', es: '¿Native Roofing tiene licencia y seguro en Florida?' },
  faqA1: { 
    en: 'Yes, we are fully licensed, bonded, and insured. We operate under Florida Certified Roofing Contractor License State License CCC1329730. We carry comprehensive liability and workers’ compensation insurance to protect our clients.',
    es: 'Sí, contamos con licencia, fianza y seguro en su totalidad. Operamos bajo la Licencia Estatal CCC1329730 del Sur de Florida. Contamos con seguro de responsabilidad civil y compensación de trabajadores.'
  },
  faqQ2: { en: 'How long does a full roof replacement take?', es: '¿Cuánto tiempo toma un reemplazo completo de techo?' },
  faqA2: { 
    en: 'Typically, a residential roof replacement takes between 2 to 4 days, depending on the size of the home and the material chosen (metal, shingle, or tile). This does not include municipal inspections, which are scheduled in accordance with county building departments.',
    es: 'Por lo general, un reemplazo de techo residencial toma de 2 a 4 días, dependiendo del tamaño de la casa y del material elegido (metal, teja o tejas de asfalto). Esto no incluye los tiempos de inspección municipal.'
  },
  faqQ3: { en: 'Do you help with roofing insurance claims?', es: '¿Ayudan con las reclamaciones de seguros de techado?' },
  faqA3: { 
    en: 'Yes, our team has extensive experience working with insurance companies. We document storm, hail, and wind damage with thermal and visual inspections to provide the precise documentation required by adjuster agencies.',
    es: 'Sí, nuestro equipo tiene amplia experiencia trabajando con aseguradoras. Documentamos los daños por viento y granizo mediante inspecciones para proporcionar la documentación que exigen los ajustadores.'
  },
  faqQ4: { en: 'What areas in South Florida do you service?', es: '¿Qué áreas del sur de Florida atienden?' },
  faqA4: { 
    en: 'We proudly serve Wellington, West Palm Beach, Boynton Beach, Delray Beach, Boca Raton, Fort Lauderdale, and surrounding communities throughout Palm Beach and Broward Counties.',
    es: 'Atendemos con orgullo a Wellington, West Palm Beach, Boynton Beach, Delray Beach, Boca Raton, Fort Lauderdale y comunidades aledañas en los condados de Palm Beach y Broward.'
  },

  // Footer
  footerDesc: { en: 'Native Roofing Enterprises, Inc. - The Proof Is In The Roof! Delivering high-performance roofing systems designed for South Florida’s elements.', es: 'Native Roofing Enterprises, Inc. - ¡La Prueba Está En El Techo! Ofreciendo sistemas de techado de alto rendimiento diseñados para las tormentas de Florida.' },
  footerContact: { en: 'Contact Details', es: 'Datos de Contacto' },
  footerOffice: { en: 'Office Location', es: 'Dirección de la Oficina' },
  footerHours: { en: 'Business Hours', es: 'Horas de Operación' },
  footerHoursVal: { en: 'Mon - Sat: 7:00 AM - 7:00 PM | Sun: Closed', es: 'Lun - Sáb: 7:00 AM - 7:00 PM | Dom: Cerrado' },
  footerRights: { en: 'All Rights Reserved. State License CCC1329730.', es: 'Todos los derechos reservados. Licencia Estatal CCC1329730.' }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
