"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = "max-w-2xl",
  showCloseButton = true 
}: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`bg-white rounded-[24px] border border-[#ebebea] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] w-full ${maxWidth} max-h-[calc(100vh-64px)] flex flex-col overflow-hidden pointer-events-auto relative`}
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute right-5 top-5 p-2 rounded-xl text-[#888780] hover:bg-[#F1EFE8] hover:text-[#1a1a18] transition-all z-10"
                >
                  <X size={18} />
                </button>
              )}
              
              <div className="overflow-y-auto no-scrollbar p-0">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
