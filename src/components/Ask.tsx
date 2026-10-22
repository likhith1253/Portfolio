import { useMemo, useState } from "react";
import { buildPassages, makeIndex } from "@/lib/search";

// Retrieval over this site's own content, running entirely in the browser.
// The "answer" is the best passage, quoted, with its source as the citation.
const SUGGESTIONS = [
  "What has he built with RAG?",
  "Tell me about the TG Transco internship",
  "Which projects use FastAPI?",
  "How accurate is DocRag?",
  "How do I contact him?",
];

export default function Ask() {
  const passages = useMemo(() => buildPassages(), []);
  const search = useMemo(() => makeIndex(passages), [passages]);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState("");
  const results = useMemo(() => (asked ? search(asked, 3) : []), [asked, search]);
  const top = results[0]?.s || 1;

  const run = (q: string) => { setQuery(q); setAsked(q); };

  return (
    <div className="ask" data-reveal>
      <div className="ask-top">
        <span className="mono" style={{ color: "var(--muted)" }}>bm25 · {passages.length} passages · runs in your browser</span>
        <span className="mono acid">no llm · nothing leaves this page</span>
      </div>
      <form className="ask-form" onSubmit={(e) => { e.preventDefault(); setAsked(query.trim()); }} role="search">
        <label htmlFor="ask-input" className="sr-only">Ask a question about Likhith</label>
        <input id="ask-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ask anything: skills, projects, internships…" autoComplete="off" />
        <button className="btn primary" type="submit">Retrieve <span className="arrow" aria-hidden="true">→</span></button>
      </form>
      <div className="suggest">
        {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => run(s)}>{s}</button>)}
      </div>
      <div className="ask-out" aria-live="polite">
        {!asked && <p className="mono" style={{ color: "var(--dim)", margin: 0 }}>Try a question above. Results are passages from this page, scored with BM25, cited by section.</p>}
        {asked && results.length === 0 && <p className="answer">Nothing on this page matches that. Try a project name, a skill, or “internship”.</p>}
        {results.length > 0 && (
          <>
            <p className="answer">
              {results[0].p.text}
              <sup><a href={results[0].p.anchor}>[{results[0].p.source}]</a></sup>
            </p>
            <div className="hits">
              {results.map((r, i) => (
                <a className="hit" key={r.p.id} href={r.p.anchor}>
                  <span>
                    <span className="score">#{i + 1} · {r.s.toFixed(2)}</span>
                    <span className="bar"><i style={{ width: `${Math.round((r.s / top) * 100)}%` }} /></span>
                  </span>
                  <span>
                    <span className="src">{r.p.source}</span>
                    {r.p.text.length > 170 ? r.p.text.slice(0, 170) + "…" : r.p.text}
                  </span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
