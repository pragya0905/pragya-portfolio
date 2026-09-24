import { useState } from "react";
import { AccordionRow } from "./AccordionRow";

export function AccordionList({ items }) {
  const [openKeys, setOpenKeys] = useState(() =>
    items.length === 1 ? new Set([`${items[0].company}-${items[0].role}`]) : new Set(),
  );

  const toggle = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-line bg-surface px-6 md:px-8">
      {items.map((item) => {
        const key = `${item.company}-${item.role}`;
        return (
          <AccordionRow
            key={key}
            isOpen={openKeys.has(key)}
            onToggle={() => toggle(key)}
            {...item}
          />
        );
      })}
    </div>
  );
}
