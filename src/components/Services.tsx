'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const servicesData = [
    {
      icon: 'bi-lightning-charge-fill',
      titleKey: 'servRepairTitle',
      descKey: 'servRepairDesc',
      badge: '24/7 Response',
      color: 'warning'
    },
    {
      icon: 'bi-house-heart-fill',
      titleKey: 'servReplaceTitle',
      descKey: 'servReplaceDesc',
      badge: 'GAF Certified',
      color: 'primary'
    },
    {
      icon: 'bi-buildings-fill',
      titleKey: 'servMaintTitle',
      descKey: 'servMaintDesc',
      badge: 'HOA & Commercial',
      color: 'success'
    },
    {
      icon: 'bi-shield-check-fill',
      titleKey: 'servMetalTitle',
      descKey: 'servMetalDesc',
      badge: '150+ MPH Wind Rated',
      color: 'info'
    }
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="services" className="py-5 bg-light">
      <div className="container py-lg-4">
        
        {/* Section Title */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-secondary">{t('servicesTitle')}</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="row g-4 justify-content-center"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {servicesData.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="col-md-6 col-lg-3"
              variants={itemVariants}
            >
              <div className="card h-100 border-0 shadow-sm p-4 hover-card rounded-4 bg-white position-relative overflow-hidden">
                {/* Floating highlight block */}
                <div 
                  className={`position-absolute top-0 start-0 w-100 h-2 bg-${item.color}`}
                  style={{ height: '4px' }}
                />

                {/* Card Top Icon & Badge */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-3 p-3 d-inline-flex align-items-center justify-content-center fs-3`}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <span className={`badge bg-${item.color} bg-opacity-10 text-${item.color} rounded-pill border-0 px-3 py-1 fs-8 fw-bold`}>
                    {item.badge}
                  </span>
                </div>

                {/* Service Copy */}
                <h4 className="fw-bold text-secondary mb-3 fs-5">
                  {t(item.titleKey)}
                </h4>
                <p className="text-muted fs-6 mb-0" style={{ lineHeight: '1.6' }}>
                  {t(item.descKey)}
                </p>
                
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
