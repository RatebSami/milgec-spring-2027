import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
  onCta: () => void
}

export default function AboutModal({ onClose, onCta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 mb-3">
            New Campaign
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Spring Intake 2027</h2>
        </div>

        <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
          <p>
            <strong className="text-gray-900">MILGEC 中邦</strong> is launching its Spring 2027 Intake
            campaign. We help international students apply to top universities across China with dedicated
            guidance, scholarship support, and end-to-end application assistance.
          </p>
          <p>
            This early-access program gives you priority notifications for application windows, exclusive
            scholarship opportunities, and personalized major & city recommendations.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm">
            <li>Priority access to application deadlines</li>
            <li>Scholarship matching & guidance</li>
            <li>University & major recommendations</li>
            <li>Support for multiple Chinese cities</li>
          </ul>
          <p className="pt-2 text-sm text-gray-500">
            Follow us on Instagram{' '}
            <a
              href="https://instagram.com/milgec.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              @milgec.cn
            </a>{' '}
            for the latest updates.
          </p>
        </div>

        <button
          onClick={onCta}
          className="mt-8 w-full py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Get Early Access
        </button>
      </motion.div>
    </motion.div>
  )
}
