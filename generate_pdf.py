import os
from fpdf import FPDF

class ProposalPDF(FPDF):
    def header(self):
        # Top banner in deep teal
        self.set_fill_color(37, 95, 113) # Primary Deep Teal
        self.rect(0, 0, 210, 20, 'F')
        
        # Header text
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'B', 10)
        self.cell(0, -6, 'NATIVE ROOFING ENTERPRISES - PROJECT PROPOSAL', 0, 0, 'L')
        self.ln(10)

    def footer(self):
        # Go to 1.5 cm from bottom
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        # Page number
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}} | State License: CCC1329730', 0, 0, 'C')

def create_proposal_pdf():
    pdf = ProposalPDF()
    pdf.alias_nb_pages()
    pdf.set_margins(15, 25, 15)
    pdf.add_page()
    
    # Title Section
    pdf.set_y(30)
    pdf.set_text_color(37, 95, 113) # Deep Teal
    pdf.set_font('Helvetica', 'B', 22)
    pdf.cell(0, 10, 'Next.js Landing Page Modernization', 0, 1, 'L')
    
    pdf.set_text_color(15, 23, 42) # Slate Blue
    pdf.set_font('Helvetica', 'B', 14)
    pdf.cell(0, 8, 'For Native Roofing Enterprises, Inc.', 0, 1, 'L')
    
    # Divider line
    pdf.set_draw_color(37, 95, 113)
    pdf.set_line_width(0.8)
    pdf.line(15, 52, 195, 52)
    pdf.ln(12)
    
    # Introduction
    pdf.set_text_color(60, 60, 60)
    pdf.set_font('Helvetica', '', 10)
    intro_text = (
        "This proposal documents the modernization of the Native Roofing Enterprises website "
        "(https://nativeroofing.com) into a high-performance, fully responsive, and animated "
        "bilingual landing page built with Next.js, Bootstrap 5.3, and Framer Motion. The new layout is "
        "tailored for high conversions and satisfies modern SEO, AEO, and GEO international standards."
    )
    pdf.multi_cell(0, 6, intro_text)
    pdf.ln(6)
    
    # 1. Gaps Identified
    pdf.set_text_color(37, 95, 113)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.cell(0, 8, '1. Identified Gaps in Current Landing Page', 0, 1, 'L')
    
    pdf.set_text_color(60, 60, 60)
    pdf.set_font('Helvetica', '', 10)
    
    gaps = [
      ("Performance Overhead: ", "WordPress & Elementor overhead loaded dozens of legacy stylesheets/scripts (jQuery, Slick, etc.), causing poor Core Web Vitals (LCP, INP) and dragging down rankings."),
      ("Third-Party Iframes: ", "The quote form (LeadConnector) and financing banner (Enhancify) were embedded in slow, non-responsive iframes, breaking visual cohesion and mobile UX."),
      ("Bilingual Gap: ", "Wellington and South Florida counties require bilingual outreach (English/Spanish). The previous site had dummy language flags that were non-functional."),
      ("No Visual Slider: ", "Lacked an interactive Before/After slider to demonstrate visual roofing restoration proof to potential customers."),
      ("SEO/AEO/GEO Gaps: ", "Missing descriptive metadata, voice-search structured answers (AEO), and unambiguous local business coordinates/license data (GEO) for AI engine citations.")
    ]
    
    for title, desc in gaps:
        pdf.set_font('Helvetica', 'B', 10)
        pdf.write(5, " - " + title)
        pdf.set_font('Helvetica', '', 10)
        pdf.write(5, desc + "\n\n")
    
    # 2. Tech Architecture Implemented
    pdf.set_text_color(37, 95, 113)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.cell(0, 8, '2. Modernized Solution Architecture', 0, 1, 'L')
    
    pdf.set_text_color(60, 60, 60)
    
    solutions = [
      ("Next.js 14+ (App Router): ", "Rebuilt as a React-based single-page app utilizing static page pre-generation. Yields near-instant page load speed and smooth transitions."),
      ("Bootstrap 5.3 & Sass: ", "Styled with utility variables matching the teal (#255f71) and slate (#0f172a) branding, loaded cleanly via SCSS to prevent styling bloat."),
      ("Framer Motion: ", "Powers smooth, responsive entrance transitions for content blocks and multi-step form sequences, elevating page premium aesthetics."),
      ("Bilingual Language Context: ", "Built a dedicated React Context translating all page content dynamically between English and Spanish via a simple header toggle."),
      ("5-Step Form Funnel: ", "A native form wizard directly in the Hero column 2. Captures service type, materials, urgency, property type, and details, posting directly to Formspree."),
      ("Before/After Slider: ", "Custom drag-enabled component allowing users to slide and compare visual storm damage against certified new roofing installations."),
      ("Simulated Calculator: ", "Provides an interactive slider cost calculator for roofing loans, pre-qualifying users via direct Enhancify links."),
      ("SEO/AEO/GEO Structured Data: ", "Configured structured local Schema (local coordinates, office hours, and Florida Certified License CCC1329730) for AI engine discoverability.")
    ]
    
    for title, desc in solutions:
        pdf.set_font('Helvetica', 'B', 10)
        pdf.write(5, " - " + title)
        pdf.set_font('Helvetica', '', 10)
        pdf.write(5, desc + "\n\n")
        
    # 3. Project Information
    pdf.set_text_color(37, 95, 113)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.cell(0, 8, '3. Business & Licensing Information', 0, 1, 'L')
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(60, 60, 60)
    
    # Table headers
    pdf.set_fill_color(240, 244, 248)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(60, 8, 'Property / Detail', 1, 0, 'L', True)
    pdf.cell(120, 8, 'Value', 1, 1, 'L', True)
    
    # Table rows
    pdf.set_font('Helvetica', '', 10)
    details = [
        ("Florida State License", "CCC1329730 (Certified Roofing Contractor)"),
        ("Office Location", "3031 Fortune Way STE A-18, Wellington, FL 33414"),
        ("Office Phone Numbers", "(561) 469-7930 | (954) 236-9986"),
        ("Email Contact", "solutions@nativeroofing.com"),
        ("Working Hours", "Mon - Sat: 7:00 AM - 7:00 PM | Sunday: Closed"),
        ("Formspree Form Endpoint", "https://formspree.io/f/mkoeelng"),
        ("GitHub Repository", "git@github.com:muhammadnumanlatif/Native-Roofing-Enterprises.git")
    ]
    
    for prop, val in details:
        pdf.cell(60, 8, prop, 1, 0, 'L')
        pdf.cell(120, 8, val, 1, 1, 'L')
        
    pdf.ln(6)
    
    # Save PDF
    pdf.output("Native_Roofing_Modernization_Proposal.pdf")
    print("PDF successfully generated as 'Native_Roofing_Modernization_Proposal.pdf'.")

if __name__ == '__main__':
    create_proposal_pdf()
