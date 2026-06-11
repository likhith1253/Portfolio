import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Circle,
  ChevronDown,
  Github,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { pathway } from "@/data/pathway";
import type { PathwayNode, PathwayStatus } from "@/data/pathway";

// ─── Status badge ───────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  PathwayStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  completed: {
    label: "Completed",
    className: "text-primary border-primary/40 bg-primary/10",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  "in-progress": {
    label: "In Progress",
    className: "text-amber-400/90 border-amber-400/30 bg-amber-400/8",
    icon: <Loader2 className="w-3 h-3 animate-spin" style={{ animationDuration: "2.5s" }} />,
  },
  planned: {
    label: "Planned",
    className: "text-muted-foreground border-border/60 bg-secondary/40",
    icon: <Circle className="w-3 h-3" />,
  },
  active: {
    label: "Active",
    className: "text-primary border-primary/40 bg-primary/10",
    icon: <Loader2 className="w-3 h-3 animate-spin" style={{ animationDuration: "2s" }} />,
  },
};

function StatusBadge({ status }: { status: PathwayStatus }) {
  const { label, className, icon } = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-xs whitespace-nowrap ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

// ─── Node dot ──────────────────────────────────────────────────────────────────
function NodeDot({ status, isExpanded }: { status: PathwayStatus; isExpanded: boolean }) {
  const borderClass =
    status === "completed"
      ? "border-primary"
      : status === "in-progress" || status === "active"
      ? "border-primary/50"
      : "border-border";

  const innerClass =
    status === "completed"
      ? "bg-primary"
      : status === "in-progress" || status === "active"
      ? "bg-primary/50 animate-pulse"
      : "bg-border";

  return (
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-300 z-10 relative ${borderClass} ${isExpanded ? "scale-110" : ""}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${innerClass}`} />
    </div>
  );
}

// ─── Smart scroll util ─────────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function MissionPathway() {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <div className="relative" data-testid="mission-pathway">
      {/* Vertical connecting line */}
      <div className="absolute left-[11px] top-6 bottom-6 w-px bg-border/50 z-0" />

      <div className="space-y-3">
        {pathway.map((node: PathwayNode) => {
          const isExpanded = expanded === node.id;

          return (
            <div key={node.id} className="relative pl-12" data-testid={`pathway-node-${node.id}`}>
              {/* Dot on line */}
              <div className="absolute left-0 top-[18px]">
                <NodeDot status={node.status} isExpanded={isExpanded} />
              </div>

              {/* Card */}
              <div
                className={`bg-card rounded-sm overflow-hidden cursor-pointer border transition-all duration-300 ${
                  isExpanded
                    ? "border-primary/40 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
                    : "border-card-border hover:border-primary/25"
                }`}
                onClick={() => toggle(node.id)}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="font-mono text-xs text-primary/50 shrink-0 pt-0.5 tabular-nums">
                      {node.stage}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-base leading-snug">{node.title}</div>
                      {node.subtitle && (
                        <div className="text-sm text-muted-foreground mt-0.5 leading-snug">
                          {node.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <StatusBadge status={node.status} />
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-muted-foreground flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </div>
                </div>

                {/* Expandable details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-card-border px-5 pb-5 pt-4 space-y-4">
                        {/* Summary */}
                        {node.details.summary && (
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {node.details.summary}
                          </p>
                        )}

                        {/* Key items grid */}
                        {node.details.items && node.details.items.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {node.details.items.map(({ label, value }) => (
                              <div
                                key={label}
                                className="bg-secondary/60 px-3 py-2.5 rounded-sm border border-border/30"
                              >
                                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                  {label}
                                </div>
                                <div className="text-sm font-medium leading-snug">{value}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* External links */}
                        {node.details.links && node.details.links.length > 0 && (
                          <div className="flex flex-wrap gap-5">
                            {node.details.links.map(({ label, href, type }) => (
                              <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-primary hover:underline transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {type === "github" ? (
                                  <SiGithub className="w-3.5 h-3.5" />
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5" />
                                )}
                                {label}
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Smart nav action */}
                        {node.details.action && (
                          <button
                            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToSection(node.details.action!.sectionId);
                            }}
                          >
                            {node.details.action.label}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
