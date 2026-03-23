import { useState, useRef, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ControlButton } from "../controlButton";
import { HangUpButton } from "../hangUpButton";
import { OptionsMenu } from "../optionsMenu";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  BotMessageSquare,
  EllipsisVertical,
} from "lucide-react";
import "./callControlBar.css";

export const CallControlBar = (): JSX.Element => {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchorRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeAndRestoreFocus = () => {
    setMenuOpen(false);
    menuAnchorRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuAnchorRef.current &&
        !menuAnchorRef.current.contains(e.target as Node)
      ) {
        closeAndRestoreFocus();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndRestoreFocus();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <motion.div
      className="control-bar"
      role="toolbar"
      aria-label="Call controls"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 1 }}
    >
      <ControlButton
        isOn={cameraOn}
        onToggle={() => setCameraOn((v) => !v)}
        iconOn={<Video size={20} />}
        iconOff={<VideoOff size={20} />}
        label={cameraOn ? "Turn camera off" : "Turn camera on"}
        showChevron
      />

      <ControlButton
        isOn={micOn}
        onToggle={() => setMicOn((v) => !v)}
        iconOn={<Mic size={20} />}
        iconOff={<MicOff size={20} />}
        label={micOn ? "Mute microphone" : "Unmute microphone"}
        showChevron
      />

      <ControlButton
        isOn={false}
        onToggle={() => {}}
        iconOn={<MonitorUp size={20} />}
        iconOff={<MonitorUp size={20} />}
        label="Share screen"
        alwaysDefaultStyle
      />

      <ControlButton
        isOn={false}
        onToggle={() => {}}
        iconOn={<BotMessageSquare size={20} />}
        iconOff={<BotMessageSquare size={20} />}
        label="AI assistant"
        alwaysDefaultStyle
      />

      <div className="control-bar__menu-wrapper">
        <ControlButton
          ref={menuAnchorRef}
          isOn={false}
          onToggle={() => setMenuOpen((v) => !v)}
          iconOn={<EllipsisVertical size={20} />}
          iconOff={<EllipsisVertical size={20} />}
          label="More options"
          alwaysDefaultStyle
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        />
        <AnimatePresence>
          {menuOpen && <OptionsMenu ref={menuRef} onClose={closeAndRestoreFocus} />}
        </AnimatePresence>
      </div>

      <div className="control-bar__separator" role="separator" />

      <HangUpButton />

      <div className="sr-only" aria-live="polite">
        {cameraOn ? "Camera on" : "Camera off"},{" "}
        {micOn ? "Microphone on" : "Microphone muted"}
      </div>
    </motion.div>
  );
};
