import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Общий focus trap для оверлеев (мобильное меню и десктопная панель
 * "Меню" в Navbar). Escape закрывает, Tab/Shift+Tab циклируются внутри
 * containerRef, фокус при открытии уходит на первый фокусируемый элемент,
 * при закрытии — возвращается туда, откуда был вызван оверлей.
 */
export function useFocusTrap(active, containerRef, onClose) {
  useEffect(() => {
    if (!active) return undefined;

    const previouslyFocused = document.activeElement;
    const container = containerRef.current;
    container?.querySelector(FOCUSABLE_SELECTOR)?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !container) return;

      const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef, onClose]);
}
