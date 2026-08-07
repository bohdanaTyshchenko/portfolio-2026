import { ProfessionalArrowCircle } from "./ProfessionalArrowCircle";

export function ProfessionalCardCornerArrow({
  visible = true,
}: {
  visible?: boolean;
}) {
  return (
    <ProfessionalArrowCircle
      className={`absolute right-7 top-6 z-10 sm:right-9 sm:top-7 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
