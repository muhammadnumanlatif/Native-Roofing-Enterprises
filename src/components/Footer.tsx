'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const serviceLocations = [
    'Wellington', 'West Palm Beach', 'Boynton Beach', 'Delray Beach',
    'Boca Raton', 'Fort Lauderdale', 'Jupiter', 'Palm Beach Gardens',
    'Lake Worth', 'Coral Springs', 'Deerfield Beach', 'Pompano Beach'
  ];

  return (
    <footer className="bg-gradient-slate text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-5">
          
          {/* Column 1: Brand & Logo & License */}
          <div className="col-lg-4 col-md-6">
            <img 
              src="https://nativeroofing.com/wp-content/uploads/2025/02/NRE-Logo-2021-web-1.png" 
              alt="Native Roofing Enterprises" 
              style={{ maxHeight: '45px', objectFit: 'contain' }}
              className="mb-3 bg-white p-2 rounded-2"
            />
            <p className="text-white-50 fs-6 mb-3" style={{ lineHeight: '1.6' }}>
              {t('footerDesc')}
            </p>
            <div className="p-2 border border-white border-opacity-10 bg-white bg-opacity-5 rounded d-inline-block">
              <span className="fw-bold text-warning text-uppercase fs-8 tracking-wider">
                FL LICENSE: CCC1329730
              </span>
            </div>
          </div>

          {/* Column 2: Localized Geo targets */}
          <div className="col-lg-3 col-md-6 offset-lg-1">
            <h5 className="fw-bold text-white mb-3 position-relative pb-2 border-bottom border-white border-opacity-15">
              Service Areas
            </h5>
            <div className="row row-cols-2 g-1 fs-7 text-white-50">
              {serviceLocations.map((loc) => (
                <div key={loc} className="col d-flex align-items-center gap-1">
                  <i className="bi bi-geo-fill text-warning"></i>
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold text-white mb-3 position-relative pb-2 border-bottom border-white border-opacity-15">
              {t('footerContact')}
            </h5>
            
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 fs-6 mb-0">
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt-fill text-warning mt-1"></i>
                <div>
                  <strong className="text-white d-block">{t('footerOffice')}</strong>
                  3031 Fortune Way, Ste A-18<br />
                  Wellington, FL 33414
                </div>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-warning"></i>
                <a href="tel:5614697930" className="text-white-50 text-decoration-none hover-warning">
                  (561) 469-7930
                </a>
                <span className="text-white-50">/</span>
                <a href="tel:9542369986" className="text-white-50 text-decoration-none hover-warning">
                  (954) 236-9986
                </a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-warning"></i>
                <a href="mailto:solutions@nativeroofing.com" className="text-white-50 text-decoration-none hover-warning">
                  solutions@nativeroofing.com
                </a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-clock-fill text-warning mt-1"></i>
                <div>
                  <strong className="text-white d-block">{t('footerHours')}</strong>
                  {t('footerHoursVal')}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright & Socials */}
        <div className="border-top border-white border-opacity-10 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="fs-7 text-white-50 mb-0">
            &copy; {new Date().getFullYear()} Native Roofing Enterprises. {t('footerRights')}
          </p>

          <div className="d-flex gap-3">
            <a 
              href="https://www.facebook.com/nativeroofing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover-warning bg-white bg-opacity-5 p-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a 
              href="https://www.linkedin.com/company/native-roofing-enterprisesinc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover-warning bg-white bg-opacity-5 p-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="bi bi-linkedin fs-5"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
