export const variants = {
  iconButtonVariants: {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
    },
    pressed: {
      scale: 0.9,
    },
  },
  buttonVariants: {
    rest: {
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.9,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: 'spring',
        bounce: 0.9,
      },
    },
    pressed: {
      scale: 1.2,
    },
  },
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
    left: {
      left: '14px',
      right: 'auto',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    center: {
      left: 'auto',
      right: 'auto',
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.3,
        stiffness: 100,
      },
    },
    right: {
      right: '14px',
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
  // staggered pop up animation for avatars
  popUpVariants: {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.5,
        stiffness: 70,
        delay: i * 0.02,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    onHover: {
      scale: 1.1,
      transition: {
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 40,
      },
    },
  },
};
