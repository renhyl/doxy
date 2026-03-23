import { forwardRef, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Settings, Layout, Volume2, Maximize, Info } from "lucide-react";
import "./optionsMenu.css";

interface OptionsMenuProps {
  onClose: () => void;
}

const menuItems = [
  { icon: Settings, label: "Settings" },
  { icon: Layout, label: "Change layout" },
  { icon: Volume2, label: "Audio settings" },
  { icon: Maximize, label: "Full screen" },
  { icon: Info, label: "Call info" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

export const OptionsMenu = forwardRef<HTMLDivElement, OptionsMenuProps>(
  function OptionsMenu({ onClose }, ref) {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
      itemRefs.current[0]?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let next = index;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = (index + 1) % menuItems.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = (index - 1 + menuItems.length) % menuItems.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = menuItems.length - 1;
      } else if (e.key === "Tab") {
        onClose();
        return;
      }
      itemRefs.current[next]?.focus();
    };

    return (
      <motion.div
        ref={ref}
        className="options-menu"
        role="menu"
        aria-label="More options"
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
      >
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="options-menu__item"
            role="menuitem"
            tabIndex={i === 0 ? 0 : -1}
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, i)}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: i * 0.04,
            }}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.97 }}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </motion.div>
    );
  }
);
