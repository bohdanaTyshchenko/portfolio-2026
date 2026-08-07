import { CardCornerArrow } from "./CardCornerArrow";
import { ProfessionalCardCornerArrow } from "./ProfessionalCardCornerArrow";

export function PanelCornerArrow({
  professional,
}: {
  professional: boolean;
}) {
  return (
    <>
      <ProfessionalCardCornerArrow visible={professional} />
      {!professional ? <CardCornerArrow /> : null}
    </>
  );
}
