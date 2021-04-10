export const variants = {
  slideUp: {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 1,
        stiffness: 100,
        delayChildren: 1.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
        when: 'beforeChildren',
        delayChildren: 1,
        staggerChildren: 0.2,
      },
    },
  },
  slideUpItem: {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
  },
  popUp: {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    hidden: { opacity: 0, scale: 0.9 },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
  },
  container: {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 10,
        staggerChildren: 4,
      },
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
      transition: {
        delayChildren: 1.4,
        staggerChildren: 0.2,
      },
    },
  },
  modeTab: {
    standard: {
      left: '16px',
      right: 'auto',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    drinking: {
      right: '16px',
      left: 'auto',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    whileHoverDrinking: {
      right: 'auto',
      left: '40px',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    whileHoverStandard: {
      right: '40px',
      left: 'auto',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
  },
};
