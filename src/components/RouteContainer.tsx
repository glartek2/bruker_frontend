import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

function RouteContainer({
  children,
  duration,
}: PropsWithChildren<RouteContainerProps>) {
  return (
    <motion.div
      className='min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration ?? 0.3 }}
    >
      {children}
    </motion.div>
  );
}

interface RouteContainerProps {
  duration?: number;
}

export default RouteContainer;
