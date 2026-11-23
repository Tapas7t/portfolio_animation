import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { resumeData } from '../data/resume';
import {
  Download,
  ExternalLink,
  FileText,
  Briefcase,
  GraduationCap,
  Layers,
  Code2,
  Database,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Globe,
  Heart,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structured' | 'pdf'>('structured');

  return (
    <section id="resume" className="relative py-24 sm:py-32 bg-bg overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#89AACC]/8 to-[#4E85BF]/8 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Section Heading */}
        <SectionHeading
          badge="CURRICULUM VITAE"
          title="Resume &"
          serifWord="Qualifications"
          description="Verified technical background, full-stack engineering capabilities, project experience, and official academic credentials."
        />

        {/* Top Action & Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 rounded-3xl p-6 sm:p-8 md:p-10 bg-surface/60 border border-stroke/80 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        >
          {/* Subtle gradient border accent top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stroke/60">
            {/* Candidate Identity & Role */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-serif italic text-3xl sm:text-4xl text-text font-normal">
                  {resumeData.name}
                </h3>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
                  Full-Stack Developer
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted font-sans font-light">
                {resumeData.title}
              </p>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted font-sans">
                <span className="flex items-center gap-1.5 hover:text-text transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#89AACC]" />
                  {resumeData.location}
                </span>
                <span className="text-stroke">•</span>
                <a
                  href={`tel:${resumeData.phone}`}
                  className="flex items-center gap-1.5 hover:text-[#89AACC] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#89AACC]" />
                  {resumeData.phone}
                </a>
                <span className="text-stroke">•</span>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1.5 hover:text-[#89AACC] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#89AACC]" />
                  {resumeData.email}
                </a>
              </div>
            </div>

            {/* Action Buttons: Download PDF & Open */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Primary Download Button */}
              <a
                href={resumeData.pdfUrl}
                download={resumeData.pdfFilename}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-medium text-xs sm:text-sm tracking-wide flex items-center gap-2 hover:shadow-[0_0_20px_rgba(137,170,204,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              {/* Open in New Tab */}
              <a
                href={resumeData.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-stroke hover:border-[#89AACC]/40 bg-surface/50 hover:bg-surface text-text text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5 text-muted" />
                <span>Open PDF</span>
              </a>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="pt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#121212] border border-stroke/60">
              <button
                type="button"
                onClick={() => setActiveTab('structured')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'structured'
                    ? 'bg-surface text-text shadow-sm border border-stroke/80'
                    : 'text-muted hover:text-text'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#89AACC]" />
                <span>Structured CV View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'pdf'
                    ? 'bg-surface text-text shadow-sm border border-stroke/80'
                    : 'text-muted hover:text-text'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#4E85BF]" />
                <span>Original PDF Document</span>
              </button>
            </div>

            <span className="text-xs text-muted font-mono tracking-wider">
              Updated: 2026 · Vasai College of Science & Technology
            </span>
          </div>
        </motion.div>

        {/* TAB 1: Structured Resume Layout */}
        {activeTab === 'structured' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (7 cols): Objective, Project & Experience */}
            <div className="lg:col-span-7 space-y-8">
              {/* Career Objective Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="h-8 w-8 rounded-full bg-[#89AACC]/10 flex items-center justify-center text-[#89AACC]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
                    Career Objective
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed font-light">
                  {resumeData.careerObjective}
                </p>
              </motion.div>

              {/* Projects: MedConsults */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300 space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-stroke/50">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#89AACC]/10 flex items-center justify-center text-[#89AACC]">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
                        Featured Engineering Project
                      </h4>
                      <h5 className="font-serif italic text-xl sm:text-2xl text-text font-normal mt-0.5">
                        {resumeData.projects[0].title}
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs text-[#89AACC] font-mono tracking-wider">
                    {resumeData.projects[0].role}
                  </span>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.projects[0].tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-stroke/50 text-[#E4E4E7] border border-stroke/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 text-xs sm:text-sm text-[#D4D4D8] font-sans font-light">
                  {resumeData.projects[0].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#89AACC] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Experience: Diglok Trainer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300 space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-stroke/50">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#89AACC]/10 flex items-center justify-center text-[#89AACC]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
                        Professional Experience
                      </h4>
                      <h5 className="font-serif italic text-xl sm:text-2xl text-text font-normal mt-0.5">
                        {resumeData.experience[0].role} · {resumeData.experience[0].company}
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted tracking-wider">
                    {resumeData.experience[0].period}
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#D4D4D8] font-sans font-light">
                  {resumeData.experience[0].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#89AACC] shrink-0 mt-2" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column (5 cols): Skills Matrix, Education & Languages */}
            <div className="lg:col-span-5 space-y-8">
              {/* Technical Skills Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300 space-y-5"
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-stroke/50">
                  <div className="h-8 w-8 rounded-full bg-[#89AACC]/10 flex items-center justify-center text-[#89AACC]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
                    Technical Skills Matrix
                  </h4>
                </div>

                {/* Frontend */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#89AACC]" />
                    Frontend
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.frontend.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-sans bg-surface/80 border border-stroke/60 text-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#89AACC]" />
                    Backend & API
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.backend.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-sans bg-surface/80 border border-stroke/60 text-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#89AACC]" />
                    Database
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.database.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-sans bg-surface/80 border border-stroke/60 text-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Authentication & Security */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#89AACC]" />
                    Authentication
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.authentication.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-sans bg-surface/80 border border-stroke/60 text-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Core Concepts */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#89AACC]" />
                    Tools & Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[...resumeData.skills.tools, ...resumeData.skills.coreConcepts].map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-sans bg-surface/80 border border-stroke/60 text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300 space-y-4"
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-stroke/50">
                  <div className="h-8 w-8 rounded-full bg-[#89AACC]/10 flex items-center justify-center text-[#89AACC]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
                    Education & Degree
                  </h4>
                </div>

                <div className="space-y-1.5">
                  <h5 className="font-serif italic text-lg sm:text-xl text-text font-normal">
                    {resumeData.education.degree}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted font-sans">
                    {resumeData.education.institution}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted tracking-wider">
                    Duration: {resumeData.education.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
                    CGPA: {resumeData.education.cgpa}
                  </span>
                </div>
              </motion.div>

              {/* Languages & Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl p-6 sm:p-8 bg-surface/40 border border-stroke/80 hover:border-[#89AACC]/30 transition-all duration-300 space-y-5"
              >
                {/* Languages */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#89AACC]" />
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 rounded-full text-xs font-sans bg-surface/80 border border-stroke/60 text-text"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2 pt-2 border-t border-stroke/50">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#89AACC]" />
                    Interests
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted font-sans font-light">
                    {resumeData.interests.map((it, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#89AACC]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* TAB 2: Embedded PDF Document Preview */}
        {activeTab === 'pdf' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-3xl p-4 sm:p-6 bg-surface/50 border border-stroke/80 backdrop-blur-md overflow-hidden shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 px-2">
              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                <FileText className="w-4 h-4 text-[#89AACC]" />
                <span>Tapas_Karmakar_Resume.pdf (2 Pages)</span>
              </div>
              <a
                href={resumeData.pdfUrl}
                download={resumeData.pdfFilename}
                className="text-xs font-sans text-[#89AACC] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to Computer</span>
              </a>
            </div>

            {/* Iframe Document Viewer */}
            <div className="relative w-full h-[650px] sm:h-[800px] rounded-2xl overflow-hidden bg-[#18181B] border border-stroke/60">
              <iframe
                src={`${resumeData.pdfUrl}#toolbar=0&navpanes=0`}
                title="Tapas Karmakar Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};
