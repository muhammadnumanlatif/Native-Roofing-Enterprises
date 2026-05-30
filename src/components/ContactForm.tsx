'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  serviceType: string;
  material: string;
  urgency: string;
  propertyType: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    material: '',
    urgency: '',
    propertyType: '',
    fullName: '',
    phone: '',
    email: '',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectOption = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Auto-advance for simple choice steps
    if (step < 5) {
      setTimeout(() => {
        setStep((s) => s + 1);
      }, 250);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep5 = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.phone.trim().length >= 7 &&
      formData.email.trim().includes('@') &&
      formData.location.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep5()) {
      setErrorMessage(t('validationFields'));
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mkoeelng', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          service_needed: formData.serviceType,
          material_preference: formData.material,
          urgency_level: formData.urgency,
          property_type: formData.propertyType,
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          location: formData.location
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-gradient-glass border border-white rounded-4 shadow-lg p-4 position-relative overflow-hidden h-100 d-flex flex-column justify-content-between">
      
      {/* Header & Progress Indicator */}
      {!isSuccess && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-secondary mb-0 fs-5">{t('formTitle')}</h4>
            <span className="badge bg-primary text-white rounded-pill px-2 py-1 fs-7">
              {t('formStep')} {step} / 5
            </span>
          </div>

          {/* Progress Bar Dots */}
          <div className="d-flex align-items-center justify-content-between px-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <React.Fragment key={i}>
                <div 
                  className={`form-step-dot ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`}
                >
                  {step > i ? <i className="bi bi-check-lg"></i> : i}
                </div>
                {i < 5 && (
                  <div 
                    className={`form-step-connector ${step > i ? 'completed' : ''}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4"
            >
              <div className="display-3 text-success mb-3 animate-float">
                <i className="bi bi-patch-check-fill"></i>
              </div>
              <h3 className="fw-bold text-secondary">{t('formSuccessTitle')}</h3>
              <p className="text-muted">{t('formSuccessMsg')}</p>
            </motion.div>
          ) : (
            <motion.form 
              key={step}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={step === 5 ? handleSubmit : (e) => e.preventDefault()}
              className="d-flex flex-column justify-content-center h-100"
            >
              
              {/* Step 1: Service Type */}
              {step === 1 && (
                <div>
                  <label className="form-label fw-bold text-secondary mb-3 fs-6">{t('qServiceType')}</label>
                  <div className="d-flex flex-column gap-2">
                    {[
                      { val: 'repair', label: t('optRepair'), icon: 'bi-patch-exclamation-fill' },
                      { val: 'replace', label: t('optReplace'), icon: 'bi-house-gear-fill' },
                      { val: 'inspect', label: t('optInspect'), icon: 'bi-clipboard2-check-fill' },
                      { val: 'maintenance', label: t('optMaintenance'), icon: 'bi-buildings-fill' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => selectOption('serviceType', opt.val)}
                        className={`btn text-start p-3 border rounded-3 hover-card d-flex align-items-center gap-3 ${formData.serviceType === opt.val ? 'border-primary bg-primary bg-opacity-10 text-primary' : 'bg-white text-secondary'}`}
                      >
                        <i className={`bi ${opt.icon} fs-4`}></i>
                        <span className="fw-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Roof Material */}
              {step === 2 && (
                <div>
                  <label className="form-label fw-bold text-secondary mb-3 fs-6">{t('qMaterial')}</label>
                  <div className="d-flex flex-column gap-2">
                    {[
                      { val: 'shingle', label: t('optShingle'), icon: 'bi-grid-3x3-gap-fill' },
                      { val: 'tile', label: t('optTile'), icon: 'bi-square-fill' },
                      { val: 'metal', label: 'Standing Seam Metal', icon: 'bi-border-style' },
                      { val: 'flat', label: t('optFlat'), icon: 'bi-dash-lg' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => selectOption('material', opt.val)}
                        className={`btn text-start p-3 border rounded-3 hover-card d-flex align-items-center gap-3 ${formData.material === opt.val ? 'border-primary bg-primary bg-opacity-10 text-primary' : 'bg-white text-secondary'}`}
                      >
                        <i className={`bi ${opt.icon} fs-4`}></i>
                        <span className="fw-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Project Urgency */}
              {step === 3 && (
                <div>
                  <label className="form-label fw-bold text-secondary mb-3 fs-6">{t('qUrgency')}</label>
                  <div className="d-flex flex-column gap-2">
                    {[
                      { val: 'emergency', label: t('optActiveLeak'), icon: 'bi-lightning-charge-fill' },
                      { val: 'soon', label: t('optSoon'), icon: 'bi-calendar-event-fill' },
                      { val: 'research', label: t('optResearch'), icon: 'bi-info-circle-fill' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => selectOption('urgency', opt.val)}
                        className={`btn text-start p-3 border rounded-3 hover-card d-flex align-items-center gap-3 ${formData.urgency === opt.val ? 'border-primary bg-primary bg-opacity-10 text-primary' : 'bg-white text-secondary'}`}
                      >
                        <i className={`bi ${opt.icon} fs-4`}></i>
                        <span className="fw-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Property Type */}
              {step === 4 && (
                <div>
                  <label className="form-label fw-bold text-secondary mb-3 fs-6">{t('qProperty')}</label>
                  <div className="d-flex flex-column gap-2">
                    {[
                      { val: 'residential', label: t('optResidential'), icon: 'bi-house-heart-fill' },
                      { val: 'commercial', label: t('optCommercial'), icon: 'bi-building-fill-check' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => selectOption('propertyType', opt.val)}
                        className={`btn text-start p-3 border rounded-3 hover-card d-flex align-items-center gap-3 ${formData.propertyType === opt.val ? 'border-primary bg-primary bg-opacity-10 text-primary' : 'bg-white text-secondary'}`}
                      >
                        <i className={`bi ${opt.icon} fs-4`}></i>
                        <span className="fw-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Contact Details */}
              {step === 5 && (
                <div>
                  <label className="form-label fw-bold text-secondary mb-2 fs-6">{t('qContact')}</label>
                  <div className="d-flex flex-column gap-2 mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-person-fill"></i></span>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        placeholder={t('phName')}
                        className="form-control border-start-0 py-2" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-telephone-fill"></i></span>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder={t('phPhone')}
                        className="form-control border-start-0 py-2" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-envelope-fill"></i></span>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder={t('phEmail')}
                        className="form-control border-start-0 py-2" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-geo-alt-fill"></i></span>
                      <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        placeholder={t('phAddress')}
                        className="form-control border-start-0 py-2" 
                        required 
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="alert alert-danger py-2 px-3 fs-7 mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-warning text-white w-100 py-3 fw-bold fs-6 shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {t('formSubmitting')}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill"></i>
                        {t('getQuote')}
                      </>
                    )}
                  </button>
                </div>
              )}

            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons inside Form */}
      {!isSuccess && (
        <div className="d-flex justify-content-between mt-3 pt-3 border-top border-white border-opacity-20">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="btn btn-outline-secondary px-3 d-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-left"></i>
            {t('formPrev')}
          </button>
          
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (step === 1 && !formData.serviceType) ||
                (step === 2 && !formData.material) ||
                (step === 3 && !formData.urgency) ||
                (step === 4 && !formData.propertyType)
              }
              className="btn btn-secondary px-3 d-flex align-items-center gap-1"
            >
              {t('formNext')}
              <i className="bi bi-arrow-right"></i>
            </button>
          ) : null}
        </div>
      )}

    </div>
  );
}
