'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    { qKey: 'faqQ1', aKey: 'faqA1' },
    { qKey: 'faqQ2', aKey: 'faqA2' },
    { qKey: 'faqQ3', aKey: 'faqA3' },
    { qKey: 'faqQ4', aKey: 'faqA4' }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-5 bg-white">
      <div className="container py-lg-4">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-secondary">{t('faqTitle')}</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            {t('faqSubtitle')}
          </p>
        </div>

        {/* FAQs List */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              
              {faqItems.map((item, idx) => {
                const isOpen = activeIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border rounded-4 overflow-hidden bg-light shadow-sm transition-all"
                    style={{ borderColor: isOpen ? '#255f71' : '#e2e8f0' }}
                  >
                    
                    {/* Question Button */}
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="btn w-100 text-start p-4 fw-bold text-secondary d-flex align-items-center justify-content-between border-0 bg-transparent fs-6"
                      aria-expanded={isOpen}
                    >
                      <span>{t(item.qKey)}</span>
                      <i className={`bi ${isOpen ? 'bi-dash-lg text-primary' : 'bi-plus-lg text-muted'} fs-5`}></i>
                    </button>

                    {/* Answer Block */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-4 pb-4 pt-0 text-muted fs-6" style={{ lineHeight: '1.7' }}>
                            <hr className="mt-0 mb-3 border-opacity-10" />
                            {t(item.aKey)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
