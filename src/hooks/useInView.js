import { useEffect, useRef, useState } from "react";

// threshold is a fraction of the *target's* own height, which for a tall
// section (e.g. the whole Experience timeline) means scrolling deep into it
// before anything appears — a near-full-viewport blank gap. rootMargin
// shrinks the effective viewport from the bottom instead, so the trigger
// point is relative to the viewport (roughly 20% scrolled in), regardless
// of how tall the observed element is.
export function useInView({ threshold = 0, rootMargin = "0px 0px -20% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
