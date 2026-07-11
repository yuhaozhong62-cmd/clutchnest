import type { Crosshair } from "@/lib/data/crosshairs";

const scale = 4;

export function InternalCrosshairRenderer({ crosshair }: { crosshair: Crosshair }) {
  const { crosshairSettings: settings } = crosshair;
  const outline = settings.outlines.enabled
    ? `0 0 0 ${settings.outlines.thickness * scale}px rgba(8, 8, 9, ${settings.outlines.opacity})`
    : "none";

  return (
    <div className="fixed left-0 top-0 z-[100] h-[675px] w-[1200px] overflow-hidden bg-[#858078]" data-preview-id={crosshair.id}>
      <div className="absolute inset-x-0 top-0 h-[430px] bg-[#8e8981]" />
      <div className="absolute left-0 top-[92px] h-[338px] w-[370px] border-r border-black/30 bg-[#78746e]" />
      <div className="absolute right-0 top-[46px] h-[384px] w-[310px] border-l border-black/30 bg-[#77736d]" />
      <div className="absolute left-[370px] top-[128px] h-[302px] w-[520px] border-x border-black/20 bg-[#98938a]" />
      <div className="absolute left-[430px] top-[202px] h-[228px] w-[400px] border-x-[10px] border-t-[10px] border-[#514e49] bg-[#65615b]" />
      <div className="absolute inset-x-0 bottom-0 h-[245px] bg-[#4d4b49]" />
      <div className="absolute inset-x-0 top-[429px] h-px bg-black/40" />
      <div className="absolute left-[110px] top-[150px] h-20 w-32 border border-black/25 bg-[#8e8981]" />
      <div className="absolute right-[85px] top-[132px] h-24 w-36 border border-black/25 bg-[#858078]" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-px -translate-x-1/2 -translate-y-1/2 bg-black/10" />
      <div className="absolute left-1/2 top-1/2 h-px w-[320px] -translate-x-1/2 -translate-y-1/2 bg-black/10" />

      <div className="absolute left-1/2 top-1/2" aria-label={`${crosshair.nameEn} rendered preview`}>
        {settings.innerLines.enabled ? (
          <>
            <Line direction="left" settings={settings.innerLines} color={settings.primaryColor} outline={outline} />
            <Line direction="right" settings={settings.innerLines} color={settings.primaryColor} outline={outline} />
            <Line direction="top" settings={settings.innerLines} color={settings.primaryColor} outline={outline} />
            <Line direction="bottom" settings={settings.innerLines} color={settings.primaryColor} outline={outline} />
          </>
        ) : null}
        {settings.centerDot.enabled ? (
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: settings.centerDot.thickness * scale,
              height: settings.centerDot.thickness * scale,
              backgroundColor: settings.primaryColor,
              opacity: settings.centerDot.opacity,
              boxShadow: outline
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function Line({
  direction,
  settings,
  color,
  outline
}: {
  direction: "left" | "right" | "top" | "bottom";
  settings: Crosshair["crosshairSettings"]["innerLines"];
  color: string;
  outline: string;
}) {
  const length = settings.length * scale;
  const thickness = settings.thickness * scale;
  const offset = settings.offset * scale;
  const horizontal = direction === "left" || direction === "right";
  const style: React.CSSProperties = {
    width: horizontal ? length : thickness,
    height: horizontal ? thickness : length,
    backgroundColor: color,
    opacity: settings.opacity,
    boxShadow: outline
  };

  if (direction === "left") Object.assign(style, { right: offset, top: -thickness / 2 });
  if (direction === "right") Object.assign(style, { left: offset, top: -thickness / 2 });
  if (direction === "top") Object.assign(style, { bottom: offset, left: -thickness / 2 });
  if (direction === "bottom") Object.assign(style, { top: offset, left: -thickness / 2 });

  return <span className="absolute" style={style} />;
}
