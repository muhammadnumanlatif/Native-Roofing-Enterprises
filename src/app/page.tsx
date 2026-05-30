import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FinancingCard from '@/components/FinancingCard';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Sticky Header Navigation */}
      <Header />

      {/* Main Sections */}
      <main>
        {/* Hero Section (Contains copy and 5-step Quote Wizard Form) */}
        <Hero />

        {/* Core Services Section */}
        <Services />

        {/* Before / After Interactive Slider */}
        <BeforeAfterSlider />

        {/* Enhancify Financing Panel */}
        <FinancingCard />

        {/* AEO FAQ Section */}
        <FAQ />
      </main>

      {/* Structured Footer */}
      <Footer />
    </>
  );
}
