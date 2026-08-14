import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase, isSupabaseReady } from '../lib/supabase'

interface Props {
  onClose: () => void
}

export default function ApplicationForm({ onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      age: parseInt(formData.get('age') as string, 10),
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      major: formData.get('major') as string,
      highest_degree: formData.get('highest_degree') as string,
      gpa: formData.get('gpa') as string,
      preferred_city: formData.get('preferred_city') as string,
      preferred_university: (formData.get('preferred_university') as string) || null,
      optimal_option: (formData.get('optimal_option') as string) || null,
    }

    try {
      // Demo mode when Supabase is not configured
      if (!isSupabaseReady || !supabase) {
        console.log('Demo mode – form data:', payload)
        setMessage({
          type: 'success',
          text: '✅ Thank you! Your interest has been recorded. (Demo mode — connect Supabase to save real data)',
        })
        form.reset()
        setTimeout(() => onClose(), 2500)
        return
      }

      const { error } = await supabase.from('applications').insert([payload])
      if (error) throw error

      setMessage({
        type: 'success',
        text: '✅ Thank you! We received your interest and will contact you soon.',
      })
      form.reset()
      setTimeout(() => onClose(), 2200)
    } catch (err) {
      console.error(err)
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again or contact us on Instagram.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Get Early Access</h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill the form below. We'll contact you first when applications open.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  name="age"
                  required
                  min={16}
                  max={60}
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  placeholder="22"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  placeholder="+86 138..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Which major do you want to apply? *
              </label>
              <input
                type="text"
                name="major"
                required
                className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                placeholder="Computer Science, Business, Medicine..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highest Degree *</label>
                <select
                  name="highest_degree"
                  required
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white"
                >
                  <option value="">Select...</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overall GPA *</label>
                <input
                  type="text"
                  name="gpa"
                  required
                  className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  placeholder="3.5 / 4.0 or 85%"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred China City *</label>
              <input
                type="text"
                name="preferred_city"
                required
                className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                placeholder="Beijing, Shanghai, Guangzhou, Shenzhen..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred University (optional)
              </label>
              <input
                type="text"
                name="preferred_university"
                className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                placeholder="Tsinghua, Peking University, Fudan..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Optimal Option / Notes</label>
              <textarea
                name="optimal_option"
                rows={3}
                className="form-input w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm resize-none"
                placeholder="Any preferences, questions, or additional information..."
              />
            </div>

            {message && (
              <div
                className={`text-sm rounded-lg px-4 py-3 ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application Interest'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
