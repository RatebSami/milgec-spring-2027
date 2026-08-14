import { motion } from 'framer-motion'

export default function Lanterns() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, ease: 'easeOut' },
        y: { 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        },
      }}
    >
      <img
        src="/lanterns-bg.jpg"
        alt="Chinese lanterns – Spring Intake 2027"
        className="w-full h-full object-cover object-center select-none"
        draggable={false}
      />
      
      {/* Soft gradient overlay for better blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}
