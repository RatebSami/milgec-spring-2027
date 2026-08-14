import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lanterns from './components/Lanterns'
import AboutModal from './components/AboutModal'
import ApplicationForm from './components/ApplicationForm'

export default function App() {
  const [showAbout, setShowAbout] = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative font-sans text-gray-900">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-between px-6 sm:px-10 lg:px-16 xl:px-24 py-8 lg:py-12 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-gray-900">MILGEC</span>
            <span className="text-[10px] tracking-widest text-gray-500">中邦</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAbout(true)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100"
            >
              About
            </button>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
              Opening soon
            </span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex flex-col justify-center max-w-xl py-12 lg:py-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Spring
            <br />
            Intake <span className="year-gradient">2027</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-md"
          >
            Applications for Intake 2027 open soon. Follow us and stay in touch — we'll share every update, deadline, and scholarship opportunity first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Early Access
            </button>

            <a
              href="https://instagram.com/milgec.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              instagram.com/milgec.cn
            </a>
          </motion.div>
        </main>

        <div className="h-4 lg:h-0" />
      </div>

      {/* Right Visual Panel */}
      <div className="w-full lg:w-[48%] xl:w-[45%] h-[420px] sm:h-[500px] lg:h-auto lg:min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="lantern-container h-full shadow-2xl">
          <Lanterns />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAbout && (
          <AboutModal
            onClose={() => setShowAbout(false)}
            onCta={() => {
              setShowAbout(false)
              setShowForm(true)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && <ApplicationForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  )
}
