'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BeforeAfterSlider() {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    // Bounds check
    if (position < 0) setSliderPosition(0);
    else if (position > 100) setSliderPosition(100);
    else setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <section id="portfolio" className="py-5 bg-white">
      <div className="container py-lg-4">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-secondary">{t('sliderTitle')}</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            {t('sliderSubtitle')}
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            <div 
              ref={containerRef}
              className="before-after-container position-relative overflow-hidden shadow-lg border rounded-4"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
            >
              
              {/* BEFORE: Damaged Roof (Bottom layer) */}
              <div className="before-image w-100 h-100">
                <img 
                  src="/images/roof_before.png" 
                  alt="Damaged shingle roof" 
                  draggable="false"
                  className="w-100 h-100 object-fit-cover"
                />
                
                {/* Before Label */}
                <div 
                  className="position-absolute bg-dark bg-opacity-70 text-white px-3 py-2 rounded fw-bold fs-7"
                  style={{ 
                    left: '20px', 
                    bottom: '20px',
                    transition: 'opacity 0.2s',
                    opacity: sliderPosition < 15 ? 0 : 1,
                    pointerEvents: 'none'
                  }}
                >
                  {t('sliderBeforeLabel')}
                </div>
              </div>

              {/* AFTER: Restored Roof (Top clipped layer) */}
              <div 
                className="after-image w-100 h-100 position-absolute top-0 left-0"
                style={{ 
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              >
                <img 
                  src="/images/roof_after.png" 
                  alt="Restored tile roof" 
                  draggable="false"
                  className="w-100 h-100 object-fit-cover"
                />

                {/* After Label */}
                <div 
                  className="position-absolute bg-primary text-white px-3 py-2 rounded fw-bold fs-7"
                  style={{ 
                    right: '20px', 
                    bottom: '20px',
                    transition: 'opacity 0.2s',
                    opacity: sliderPosition > 85 ? 0 : 1,
                    pointerEvents: 'none'
                  }}
                >
                  {t('sliderAfterLabel')}
                </div>
              </div>

              {/* Slider Separator Handle Line */}
              <div 
                className="slider-handle-line"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Draggable Circle Button */}
                <div 
                  className="slider-handle-button"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <i className="bi bi-arrows-expand" style={{ transform: 'rotate(90deg)' }}></i>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
