import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

type GridCardProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  className?: string;
};

export const GridCard = forwardRef<HTMLElement, GridCardProps>(function GridCard(
  { children, className = "", ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={`group relative overflow-hidden ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
});
