import clsx from "clsx";
import { useInView } from "../../hooks/useInView";

export function Reveal({ as: As = "div", index = 0, step = 90, className, children, ...props }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <As
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
      style={{ transitionDelay: inView ? `${index * step}ms` : "0ms" }}
      {...props}
    >
      {children}
    </As>
  );
}
