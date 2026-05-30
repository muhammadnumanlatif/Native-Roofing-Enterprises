'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from './ContactForm';

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
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
    <section 
      className="position-relative py-5 d-flex align-items-center bg-dark text-white" 
      style={{ 
        minHeight: '85vh',
        backgroundImage: 'linear-gradient(to right, rgba(9, 13, 22, 0.9) 0%, rgba(9, 13, 22, 0.7) 100%), url("/images/hero_roof_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Soft overlay pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(37, 95, 113, 0.4) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative z-1 my-lg-5">
        <div className="row align-items-center g-5">
          
          {/* Column 1: Copy, Trust Signals, and Ratings */}
          <motion.div 
            className="col-lg-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Service Location Badge */}
            <motion.span 
              className="badge bg-warning text-white rounded-pill px-3 py-2 fw-bold text-uppercase fs-7 mb-3 d-inline-flex align-items-center gap-2"
              variants={itemVariants}
            >
              <i className="bi bi-geo-alt-fill"></i>
              {t('heroSubtitle')}
            </motion.span>

            {/* Title */}
            <motion.h1 
              className="display-4 fw-extrabold lh-sm text-white mb-3" 
              style={{ fontWeight: 800 }}
              variants={itemVariants}
            >
              {t('heroTitle1')} <br />
              <span className="text-warning">{t('heroTitle2')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="lead text-light mb-4 fs-6 opacity-90"
              style={{ maxWidth: '600px', lineHeight: '1.7' }}
              variants={itemVariants}
            >
              {t('heroDesc')}
            </motion.p>

            {/* Trust Ratings Badge */}
            <motion.div 
              className="d-flex align-items-center gap-3 mb-4 p-3 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-3"
              style={{ maxWidth: '500px' }}
              variants={itemVariants}
            >
              <div className="d-flex text-warning fs-5">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="fs-7 fw-semibold text-light opacity-95">
                {t('heroRatingText')}
              </div>
            </motion.div>

            {/* Trust Logos / Badges Grid */}
            <motion.div 
              className="row g-3 row-cols-3 text-center mb-4"
              variants={itemVariants}
            >
              {/* Nextdoor */}
              <div className="col">
                <div className="p-2 bg-gradient-glass-dark rounded-3 border border-white border-opacity-10 d-flex flex-column align-items-center justify-content-center h-100">
                  <img 
                    src="https://nativeroofing.com/wp-content/uploads/2025/03/Nextdoor-Favorite-72dpi-150x150.png" 
                    alt="Nextdoor Favorite"
                    style={{ height: '40px', objectFit: 'contain' }}
                    className="mb-1"
                  />
                  <span className="fs-8 fw-semibold text-white-50">{t('heroNextdoor')}</span>
                </div>
              </div>
              {/* GAF */}
              <div className="col">
                <div className="p-2 bg-gradient-glass-dark rounded-3 border border-white border-opacity-10 d-flex flex-column align-items-center justify-content-center h-100">
                  <img 
                    src="https://nativeroofing.com/wp-content/uploads/2025/03/awards_0001_GAF-150x150.jpg" 
                    alt="GAF Certified"
                    style={{ height: '40px', objectFit: 'contain', borderRadius: '4px' }}
                    className="mb-1"
                  />
                  <span className="fs-8 fw-semibold text-white-50">{t('heroGAF')}</span>
                </div>
              </div>
              {/* 35+ Years */}
              <div className="col">
                <div className="p-2 bg-gradient-glass-dark rounded-3 border border-white border-opacity-10 d-flex flex-column align-items-center justify-content-center h-100">
                  <div className="text-warning fw-bold fs-4 lh-1">35+</div>
                  <span className="fs-8 fw-semibold text-white-50 mt-1">{t('heroExperience')}</span>
                </div>
              </div>
            </motion.div>

            {/* Direct Scroll CTAs */}
            <motion.div className="d-flex flex-wrap gap-3" variants={itemVariants}>
              <a href="#contact" className="btn btn-warning text-white fw-bold px-4 py-3 shadow-sm">
                <i className="bi bi-calendar-check-fill me-2"></i>
                {t('getQuote')}
              </a>
              <a href="#services" className="btn btn-outline-light px-4 py-3 fw-bold">
                {t('services')}
              </a>
            </motion.div>

          </motion.div>

          {/* Column 2: 5-step Form Wizard Container */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-100"
            >
              <ContactForm />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
