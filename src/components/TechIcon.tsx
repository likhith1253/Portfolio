import { ICONS, iconColor } from "@/lib/icons";

/** Official mark for a technology, or nothing when no official mark exists. */
export default function TechIcon({ name, size = 28 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if (icon.kind === "svg") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: icon.svg }} />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={iconColor(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
}
