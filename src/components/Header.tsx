'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky-top bg-gradient-glass shadow-sm py-2">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <div className="container-fluid px-0 d-flex justify-content-between align-items-center">
          
          {/* Logo */}
          <a href="#" className="navbar-brand d-flex align-items-center">
            <img 
              src="https://nativeroofing.com/wp-content/uploads/2025/02/NRE-Logo-2021-web-1.png" 
              alt="Native Roofing Enterprises" 
              style={{ maxHeight: '45px', objectFit: 'contain' }}
              className="d-inline-block align-top"
            />
          </a>

          {/* Toggle Button for Mobile Navigation */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'} fs-3 text-primary`}></i>
          </button>

          {/* Collapsible Menu */}
          <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show d-block mt-3 mt-lg-0' : ''}`}>
            <ul className="navbar-nav align-items-lg-center me-3 mb-3 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link px-3 fw-semibold text-secondary" href="#" onClick={() => setIsOpen(false)}>
                  {t('home')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 fw-semibold text-secondary" href="#services" onClick={() => setIsOpen(false)}>
                  {t('services')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 fw-semibold text-secondary" href="#financing" onClick={() => setIsOpen(false)}>
                  {t('financing')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 fw-semibold text-secondary" href="#faq" onClick={() => setIsOpen(false)}>
                  {t('faq')}
                </a>
              </li>
              
              {/* Language Switcher */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <div className="d-flex align-items-center bg-light border rounded p-1">
                  <span 
                    className={`lang-badge ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    🇺🇸 EN
                  </span>
                  <span 
                    className={`lang-badge ms-1 ${language === 'es' ? 'active' : ''}`}
                    onClick={() => setLanguage('es')}
                  >
                    🇪🇸 ES
                  </span>
                </div>
              </li>
            </ul>

            {/* Click-to-Call Primary CTA Button */}
            <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
              <a href="tel:5614697930" className="btn btn-outline-primary fw-bold d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-telephone-fill"></i>
                (561) 469-7930
              </a>
              <a href="#contact" className="btn btn-primary fw-bold text-white shadow-sm px-4">
                {t('getQuote')}
              </a>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
