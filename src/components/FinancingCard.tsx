'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function FinancingCard() {
  const { t } = useLanguage();
  const [cost, setCost] = useState(15000); // Default estimate $15k
  const [term, setTerm] = useState(7); // Default 7 years

  // Standard amortization formula at 6.99% fixed APR
  const annualRate = 0.0699;
  const monthlyRate = annualRate / 12;
  const totalPayments = term * 12;
  
  const monthlyEst = Math.round(
    (cost * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );

  return (
    <section id="financing" className="py-5 bg-gradient-slate text-white position-relative overflow-hidden">
      {/* Background glow overlay */}
      <div 
        className="position-absolute top-50 start-0 translate-middle-y w-100 h-100 opacity-10" 
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(37, 95, 113, 0.8) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container py-lg-4 position-relative z-1">
        <div className="row align-items-center g-5">
          
          {/* Column 1: Copy details */}
          <div className="col-lg-6">
            <span className="badge bg-primary text-white rounded-pill px-3 py-2 fw-bold text-uppercase fs-7 mb-3">
              Enhancify Financing
            </span>
            <h2 className="display-5 fw-bold mb-3">{t('finTitle')}</h2>
            <p className="lead text-light opacity-90 mb-4 fs-6" style={{ lineHeight: '1.7' }}>
              {t('finSubtitle')}
            </p>
            
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-20 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-wallet2 fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">No Home Equity Required</h6>
                  <small className="text-white-50">Loans based on personal credit profiles, keeping your home collateral-free.</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-20 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-clock-history fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Fast Funding & Approvals</h6>
                  <small className="text-white-50">Get approvals in under 60 seconds with funds deposited in 1-3 business days.</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-20 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-shield-shaded fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Soft Credit Inquiries</h6>
                  <small className="text-white-50">Check your pre-qualification options without impacting your credit score.</small>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Calculator Widget */}
          <div className="col-lg-6">
            <div className="card border-0 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-4 p-4 p-lg-5 shadow-lg backdrop-blur">
              <h4 className="fw-bold mb-4 text-center text-white border-bottom border-white border-opacity-10 pb-3">
                {t('finCardHeader')}
              </h4>

              {/* Slider 1: Estimated Roof Cost */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="roofCostRange" className="fw-semibold text-light fs-7">{t('finRoofCostLabel')}</label>
                  <span className="fs-5 fw-bold text-warning">${cost.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  id="roofCostRange"
                  min="5000" 
                  max="50000" 
                  step="1000" 
                  value={cost} 
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="form-range custom-slider"
                />
                <div className="d-flex justify-content-between text-white-50 fs-8 mt-1">
                  <span>$5,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              {/* Select Options: Loan Term */}
              <div className="mb-5">
                <label className="fw-semibold text-light fs-7 mb-2 d-block">{t('finTermLabel')}</label>
                <div className="btn-group w-100" role="group" aria-label="Loan Term Options">
                  {[5, 7, 10].map((tVal) => (
                    <button
                      key={tVal}
                      type="button"
                      onClick={() => setTerm(tVal)}
                      className={`btn py-2 border border-white border-opacity-10 fw-bold ${term === tVal ? 'btn-primary text-white' : 'btn-outline-light text-white'}`}
                    >
                      {tVal} {t('finYears')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result display */}
              <div className="text-center p-3 bg-white bg-opacity-5 rounded-3 mb-4">
                <span className="fs-8 fw-semibold text-white-50 uppercase tracking-wide">{t('finEstPayment')}</span>
                <div className="display-4 fw-extrabold text-warning my-1">
                  ${monthlyEst}<span className="fs-6 text-white-50">/mo</span>
                </div>
                <small className="text-white-50 fs-8">{t('finInterestText')}</small>
              </div>

              {/* Action Button */}
              <a 
                href="https://www.enhancify.com/banner?name=Contractor_Text_930x180&page=9914176&hideLink=0"
                target="_blank" 
                rel="nofollow" 
                className="btn btn-warning text-white w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 hover-card"
              >
                <i className="bi bi-patch-check-fill"></i>
                {t('finCTA')}
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
