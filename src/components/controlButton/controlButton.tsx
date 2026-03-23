import {
  forwardRef,
  useState,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import "./controlButton.css";

interface ControlButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  isOn: boolean;
  onToggle: () => void;
  iconOn: ReactNode;
  iconOff: ReactNode;
  label: string;
  showChevron?: boolean;
  alwaysDefaultStyle?: boolean;
}

export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(
  function ControlButton(
    {
      isOn,
      onToggle,
      iconOn,
      iconOff,
      label,
      showChevron,
      alwaysDefaultStyle,
      ...rest
    },
    ref
  ) {
    const isOff = !isOn && !alwaysDefaultStyle;
    const [rippleKey, setRippleKey] = useState(0);

    const handleClick = () => {
      setRippleKey((k) => k + 1);
      onToggle();
    };

    return (
      <div className="control-button-group">
        <motion.button
          ref={ref}
          className={`control-button ${isOff ? "control-button--off" : ""} ${showChevron ? "control-button--has-chevron" : ""}`}
          onClick={handleClick}
          title={label}
          aria-label={label}
          aria-pressed={alwaysDefaultStyle ? undefined : isOn}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          {...rest}
        >
          <span className="control-button__icon-wrapper">
            <AnimatePresence initial={false}>
              <motion.span
                key={isOn ? "on" : "off"}
                className="control-button__icon"
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotate: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                {isOn || alwaysDefaultStyle ? iconOn : iconOff}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Ripple burst on toggle */}
          <AnimatePresence>
            <motion.span
              key={rippleKey}
              className="control-button__ripple"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              aria-hidden="true"
            />
          </AnimatePresence>

          {showChevron && (
            <span className="control-button__chevron" aria-hidden="true">
              <ChevronUp size={14} strokeWidth={2.5} />
            </span>
          )}
        </motion.button>

        {/* Animated background pill for off state */}
        <motion.div
          className="control-button__bg"
          animate={{
            backgroundColor: isOff
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          aria-hidden="true"
        />
      </div>
    );
  }
);
