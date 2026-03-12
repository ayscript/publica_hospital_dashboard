import { useEffect } from "react";

export function useScrollLock(isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Get the original styles so we can revert them later
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(
      document.body,
    ).paddingRight;

    // 2. Calculate the scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 3. Apply the lock and the padding
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // (Optional) Disable pointer events on the background
    // document.body.style.pointerEvents = "none";

    // 4. Cleanup function to restore everything when the modal closes
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      // document.body.style.pointerEvents = "auto";
    };
  }, [isOpen]); // Re-run whenever the modal opens or closes
}
