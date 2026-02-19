// ============================================================
// FRAMER CODE COMPONENT — Claude Code Internal Guide
// Paste this entire file into Framer → Assets → Code → New Component
// ============================================================

import { useState, useEffect, useRef } from "react"

// ─── TYPES ───────────────────────────────────────────────────
interface SearchItem {
    sec: string
    txt: string
    id: string
}

// ─── CSS ─────────────────────────────────────────────────────
const CSS = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
img,video,iframe{max-width:100%;height:auto}

.ccdocs-root{
  --bg:#f5f5f0;--bg-s:#eceae5;--bg-c:#e4e2dc;--bg-ch:#dbd8d2;--bg-code:#eae8e2;
  --accent:#c4603e;--accent-l:#b5522e;--accent-d:#a04525;--accent-bg:rgba(196,96,62,.07);--accent-border:rgba(196,96,62,.2);
  --blue:#2563eb;--green:#16a34a;--yellow:#ca8a04;--red:#dc2626;--purple:#7c3aed;--cyan:#0891b2;
  --t1:#1a1a1a;--t2:#555550;--t3:#8a8680;
  --border:#d5d3cd;--border-l:#c5c2bb;
  --sidebar-w:272px;--header-h:56px;
  --radius:10px;--radius-s:6px;
  --shadow:0 4px 20px rgba(0,0,0,.08);
  --hdr-bg:rgba(245,245,240,.85);
  --scrollbar-thumb:#c5c2bb;
  --code-inline-bg:#e4e2dc;--code-inline-border:#d5d3cd;
  --card-hover-bg:rgba(0,0,0,.015);--card-hover-border:rgba(0,0,0,.06);
  font-family:'Inter',system-ui,sans-serif;
  background:var(--bg);color:var(--t1);line-height:1.75;font-size:15px;
  scroll-behavior:smooth;scroll-padding-top:calc(var(--header-h) + 20px);
  min-height:100vh;
}
.ccdocs-root a{color:var(--accent-l);text-decoration:none;transition:color .15s}
.ccdocs-root a:hover{color:var(--accent)}
.ccdocs-root ::selection{background:var(--accent);color:#fff}
.ccdocs-root ::-webkit-scrollbar{width:5px}
.ccdocs-root ::-webkit-scrollbar-track{background:var(--bg)}
.ccdocs-root ::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:3px}

/* HEADER */
.hdr{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--header-h);background:var(--hdr-bg);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:16px}
.hdr-logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:15px;color:var(--t1);white-space:nowrap}
.hdr-logo .dot{width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,var(--accent),var(--accent-d));display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff}
.hdr-logo span{color:var(--t3);font-weight:400;font-size:13px;margin-left:4px}

/* SEARCH */
.search-box{position:relative;flex:0 1 320px;max-width:320px;margin-left:auto}
.search-box input{width:100%;padding:8px 14px 8px 36px;background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius-s);color:var(--t1);font-size:13.5px;font-family:inherit;outline:none;transition:border-color .15s,box-shadow .15s}
.search-box input::placeholder{color:var(--t3)}
.search-box input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(217,119,87,.1)}
.search-box .si{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--t3);font-size:13px;pointer-events:none}
.search-box kbd{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:10px;color:var(--t3);background:var(--bg);border:1px solid var(--border);padding:1px 6px;border-radius:3px;font-family:inherit}
.sr{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius);max-height:420px;overflow-y:auto;display:none;z-index:200;box-shadow:var(--shadow)}
.sr.open{display:block}
.sr-item{padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border);transition:background .1s}
.sr-item:hover,.sr-item.active{background:var(--bg-ch)}
.sr-item:last-child{border-bottom:none}
.sr-cat{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--accent)}
.sr-txt{font-size:13px;color:var(--t2);margin-top:1px}
.sr-empty{padding:20px 14px;text-align:center;color:var(--t3);font-size:13px}
.mob-btn{display:none;background:none;border:none;color:var(--t1);font-size:18px;cursor:pointer;padding:6px}

/* SIDEBAR */
.sidebar{position:fixed;top:var(--header-h);left:0;bottom:0;width:var(--sidebar-w);background:var(--bg-s);border-right:1px solid var(--border);overflow-y:auto;padding:16px 0 40px;z-index:50;transition:transform .25s ease}
.sb-group{padding:0 16px;margin-bottom:4px}
.sb-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);padding:10px 0 4px}
.sb-nav{list-style:none}
.sb-nav li a{display:flex;align-items:center;gap:8px;padding:6px 12px;font-size:13.5px;color:var(--t2);border-radius:var(--radius-s);transition:all .12s;font-weight:450;border-left:2px solid transparent;margin:1px 0}
.sb-nav li a i{width:16px;text-align:center;font-size:12px;opacity:.6}
.sb-nav li a:hover{color:var(--t1);background:var(--card-hover-border)}
.sb-nav li a.active{color:var(--accent-l);background:var(--accent-bg);border-left-color:var(--accent);font-weight:600}
.sb-nav li a.active i{opacity:1}

/* LAYOUT */
.wrap{display:flex;margin-top:var(--header-h);min-height:calc(100vh - var(--header-h))}
.main{margin-left:var(--sidebar-w);flex:1;padding:36px 44px 80px;min-width:0;overflow-x:hidden}

/* ARTICLE */
.sec{margin-bottom:56px}
.sec-head{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.sec-ico{width:38px;height:38px;border-radius:var(--radius-s);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.sec-ico.o{background:rgba(217,119,87,.1);color:var(--accent)}
.sec-ico.b{background:rgba(96,165,250,.1);color:var(--blue)}
.sec-ico.g{background:rgba(74,222,128,.1);color:var(--green)}
.sec-ico.y{background:rgba(251,191,36,.1);color:var(--yellow)}
.sec-ico.p{background:rgba(167,139,250,.1);color:var(--purple)}
.sec-ico.c{background:rgba(34,211,238,.1);color:var(--cyan)}
.ccdocs-root h2{font-size:24px;font-weight:800;letter-spacing:-.4px}
.ccdocs-root h3{font-size:18px;font-weight:700;margin:28px 0 12px;color:var(--t1)}
.ccdocs-root h4{font-size:15px;font-weight:600;margin:18px 0 8px;color:var(--t1)}
.ccdocs-root p{color:var(--t2);margin-bottom:12px}
p.sub{font-size:13px;color:var(--t3);margin:0}

/* HERO */
.hero{background:linear-gradient(135deg,rgba(217,119,87,.06),rgba(217,119,87,.01));border:1px solid var(--accent-border);border-radius:14px;padding:36px;margin-bottom:40px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-60%;right:-15%;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,87,.05) 0%,transparent 70%)}
.hero h1{font-size:30px;font-weight:900;letter-spacing:-.8px;margin-bottom:12px;line-height:1.25}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero>p{font-size:15px;max-width:600px}
.badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.badge{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:16px;font-size:12px;font-weight:500;background:var(--bg-c);border:1px solid var(--border);color:var(--t2)}
.badge i{font-size:10px}

/* CARDS */
.card{background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:14px;transition:border-color .15s}
.card:hover{border-color:var(--border-l)}
.card-t{font-size:15px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:7px}
.card-t i{color:var(--accent);font-size:13px}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin:14px 0}
.mc{background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius-s);padding:18px;transition:all .15s}
.mc:hover{border-color:var(--accent);transform:translateY(-1px)}
.mc-i{font-size:22px;margin-bottom:10px}
.mc h4{margin:0 0 4px;font-size:14px}.mc p{font-size:12.5px;margin:0}

/* CODE */
.cb{background:var(--bg-code);border:1px solid var(--border);border-radius:var(--radius-s);margin:14px 0;overflow:hidden}
.cb-h{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:var(--card-hover-bg);border-bottom:1px solid var(--border)}
.cb-l{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px}
.cb-c{background:none;border:1px solid var(--border);border-radius:5px;color:var(--t3);padding:3px 9px;font-size:11px;cursor:pointer;transition:all .15s;font-family:inherit;display:flex;align-items:center;gap:3px}
.cb-c:hover{border-color:var(--accent);color:var(--accent)}
.cb-c.ok{border-color:var(--green);color:var(--green)}
.cb pre{padding:14px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.65;color:var(--t1)}
.ccdocs-root code:not(.cb code){background:var(--code-inline-bg);border:1px solid var(--code-inline-border);padding:1px 6px;border-radius:3px;font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--accent-l)}

/* TABS */
.tabs{display:flex;gap:2px;border-bottom:1px solid var(--border);margin-bottom:0;flex-wrap:wrap}
.tab-btn{padding:8px 16px;font-size:13px;font-weight:600;color:var(--t3);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;transition:all .12s;font-family:inherit;white-space:nowrap}
.tab-btn:hover{color:var(--t2)}
.tab-btn.on{color:var(--accent);border-bottom-color:var(--accent)}
.tab-p{display:none;padding:18px 0}.tab-p.on{display:block}

/* LISTS */
.fl{list-style:none;margin:14px 0}
.fl li{padding:10px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:10px;font-size:14px}
.fl li:last-child{border-bottom:none}
.fl li i{color:var(--accent);margin-top:4px;font-size:11px;flex-shrink:0}
.fl li strong{color:var(--t1)}
.cl{list-style:none;margin:10px 0}
.cl li{padding:6px 0;display:flex;align-items:flex-start;gap:8px;color:var(--t2);font-size:13.5px}
.cl li::before{content:'✓';color:var(--green);font-weight:700;flex-shrink:0;margin-top:1px}

/* CALLOUT */
.co{border-radius:var(--radius-s);padding:14px 16px;margin:14px 0;display:flex;align-items:flex-start;gap:10px;font-size:13.5px}
.co i{margin-top:2px;flex-shrink:0}
.co.info{background:rgba(96,165,250,.06);border:1px solid rgba(96,165,250,.15)}.co.info i{color:var(--blue)}
.co.warn{background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.15)}.co.warn i{color:var(--yellow)}
.co.tip{background:rgba(74,222,128,.06);border:1px solid rgba(74,222,128,.15)}.co.tip i{color:var(--green)}
.co.danger{background:rgba(248,113,113,.06);border:1px solid rgba(248,113,113,.15)}.co.danger i{color:var(--red)}

/* STEPS */
.steps{counter-reset:step;margin:14px 0}
.stp{counter-increment:step;position:relative;padding:16px 16px 16px 56px;margin-bottom:10px;background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius-s)}
.stp::before{content:counter(step);position:absolute;left:16px;top:16px;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:13px}
.stp h4{margin-top:0}.stp p:last-child{margin-bottom:0}

/* TABLE */
.tw{overflow-x:auto;margin:14px 0;border-radius:var(--radius-s);border:1px solid var(--border)}
.ccdocs-root table{width:100%;border-collapse:collapse;font-size:13.5px}
.ccdocs-root th{background:var(--bg-c);padding:10px 14px;text-align:left;font-weight:600;color:var(--t1);border-bottom:1px solid var(--border)}
.ccdocs-root td{padding:10px 14px;border-bottom:1px solid var(--border);color:var(--t2)}
.ccdocs-root tr:last-child td{border-bottom:none}
.ccdocs-root tr:hover td{background:var(--card-hover-bg)}

/* VIDEOS */
.vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin:14px 0}
.vcard{background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:all .15s}
.vcard:hover{border-color:var(--border-l);transform:translateY(-1px)}
.vcard iframe{width:100%;aspect-ratio:16/9;border:none;display:block}
.vcard-i{padding:14px}
.vcard-i h4{margin:0 0 4px;font-size:14px}.vcard-i p{margin:0;font-size:12.5px}

/* FAQ */
.fq{background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius-s);margin-bottom:6px;overflow:hidden}
.fq-q{padding:14px 16px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:14px;color:var(--t1);transition:background .1s;user-select:none}
.fq-q:hover{background:var(--card-hover-bg)}
.fq-q i{color:var(--t3);transition:transform .2s;font-size:11px}
.fq.open .fq-q i{transform:rotate(180deg)}
.fq-a{max-height:0;overflow:hidden;transition:max-height .3s ease}
.fq.open .fq-a{max-height:600px}
.fq-a-in{padding:0 16px 14px;color:var(--t2);font-size:13.5px;line-height:1.7}

/* RESOURCE LINKS */
.rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin:14px 0}
.rlink{display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--bg-c);border:1px solid var(--border);border-radius:var(--radius-s);transition:all .15s}
.rlink:hover{border-color:var(--accent);transform:translateY(-1px)}
.rlink i{font-size:18px;color:var(--accent);flex-shrink:0}
.rlink h4{margin:0;font-size:13px;color:var(--t1)}.rlink p{margin:0;font-size:11.5px;color:var(--t3)}

/* FOOTER */
.footer{margin-left:var(--sidebar-w);padding:28px 44px;border-top:1px solid var(--border);background:var(--bg-s);font-size:12.5px;color:var(--t3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.footer a{color:var(--t2)}

/* RESPONSIVE */
@media(max-width:900px){
  .sidebar{transform:translateX(-100%)}.sidebar.open{transform:translateX(0);box-shadow:var(--shadow);width:272px}
  .main{margin-left:0;padding:24px 20px 60px}
  .footer{margin-left:0;padding:20px 16px;justify-content:center;text-align:center}
  .mob-btn{display:block}
  .search-box{max-width:220px}.search-box kbd{display:none}
  .hero{padding:24px 20px}.hero h1{font-size:24px}
  .vgrid{grid-template-columns:1fr}
  .rgrid{grid-template-columns:1fr}
  .cgrid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))!important}
  .ccdocs-root h2{font-size:21px}
}
@media(max-width:480px){
  .hdr{padding:0 12px;gap:8px;height:50px}
  .ccdocs-root{--header-h:50px}
  .hdr-logo .dot{width:24px;height:24px;font-size:11px}
  .hdr-logo span{display:none}
  .search-box{max-width:160px}
  .main{padding:16px 14px 50px}
  .hero h1{font-size:20px}
  .cgrid{grid-template-columns:1fr!important}
}
@media(max-width:360px){
  .cgrid{grid-template-columns:1fr!important}
}
`

// ─── HELPER COMPONENTS ────────────────────────────────────────

function CB({
    lang,
    code,
    showCopy = true,
}: {
    lang: string
    code: string
    showCopy?: boolean
}) {
    const [copied, setCopied] = useState(false)
    return (
        <div className="cb">
            <div className="cb-h">
                <span className="cb-l">{lang}</span>
                {showCopy && (
                    <button
                        className={`cb-c${copied ? " ok" : ""}`}
                        onClick={() => {
                            navigator.clipboard.writeText(code).then(() => {
                                setCopied(true)
                                setTimeout(() => setCopied(false), 2000)
                            })
                        }}
                    >
                        <i
                            className={`fas ${copied ? "fa-check" : "fa-copy"}`}
                        ></i>{" "}
                        {copied ? "Copied" : "Copy"}
                    </button>
                )}
            </div>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    )
}

function Tabs({
    groups,
}: {
    groups: { id: string; label: string; content: React.ReactNode }[]
}) {
    const [active, setActive] = useState(groups[0]?.id ?? "")
    return (
        <div>
            <div className="tabs">
                {groups.map((g) => (
                    <button
                        key={g.id}
                        className={`tab-btn${active === g.id ? " on" : ""}`}
                        onClick={() => setActive(g.id)}
                    >
                        {g.label}
                    </button>
                ))}
            </div>
            {groups.map((g) => (
                <div
                    key={g.id}
                    className={`tab-p${active === g.id ? " on" : ""}`}
                >
                    {g.content}
                </div>
            ))}
        </div>
    )
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`fq${open ? " open" : ""}`}>
            <div className="fq-q" onClick={() => setOpen((o) => !o)}>
                {q} <i className="fas fa-chevron-down"></i>
            </div>
            <div className="fq-a">
                <div className="fq-a-in">{a}</div>
            </div>
        </div>
    )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────

export default function ClaudeCodeDocs() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("overview")
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<SearchItem[]>([])
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchSelIdx, setSearchSelIdx] = useState(-1)
    const searchRef = useRef<HTMLInputElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const secs = mainRef.current?.querySelectorAll(".sec")
        if (!secs?.length) return
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveSection(e.target.id)
                })
            },
            { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
        )
        secs.forEach((s) => obs.observe(s))
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault()
                searchRef.current?.focus()
                searchRef.current?.select()
            }
        }
        document.addEventListener("keydown", fn)
        return () => document.removeEventListener("keydown", fn)
    }, [])

    useEffect(() => {
        const fn = (e: MouseEvent) => {
            if (!(e.target as Element)?.closest?.(".search-box"))
                setSearchOpen(false)
        }
        document.addEventListener("click", fn)
        return () => document.removeEventListener("click", fn)
    }, [])

    const IDX: SearchItem[] = [
        {
            sec: "Overview",
            txt: "Claude Code agentic coding tool Ship Faster Git Automation Auto Testing Bug Fixing Documentation",
            id: "overview",
        },
        {
            sec: "Quickstart",
            txt: "install curl npm winget Homebrew macOS Windows Linux authenticate setup",
            id: "quickstart",
        },
        {
            sec: "How Claude Code Works",
            txt: "agentic loop Gather Context Take Action Verify Results tools Read Write Grep Bash Task WebSearch",
            id: "how-it-works",
        },
        {
            sec: "Common Workflows",
            txt: "Explore Plan Code Commit fix bugs write tests refactor git PR pipe headless",
            id: "common-workflows",
        },
        {
            sec: "Best Practices",
            txt: "effective prompts context management /clear /compact version control review pitfalls security",
            id: "best-practices",
        },
        {
            sec: "CLAUDE.md",
            txt: "CLAUDE.md project memory team standards /init global local subdirectory gitignore",
            id: "claude-md",
        },
        {
            sec: "Terminal (CLI)",
            txt: "claude -p -c -r session /help /compact /clear /model /context /commit /doctor keyboard Shift+Tab Esc",
            id: "terminal",
        },
        {
            sec: "VS Code Integration",
            txt: "extension 1.98.0 Alt+K @-mention inline diffs checkpoints drag drop Plan Mode",
            id: "vscode",
        },
        {
            sec: "JetBrains IDEs",
            txt: "IntelliJ PyCharm WebStorm GoLand PHPStorm plugin marketplace interactive diffs",
            id: "jetbrains",
        },
        {
            sec: "Desktop App",
            txt: "download parallel sessions visual diffs worktrees /desktop macOS Windows",
            id: "desktop",
        },
        {
            sec: "Web",
            txt: "claude.ai/code no install cloud sandbox GitHub repos mobile /teleport long-running",
            id: "web",
        },
        {
            sec: "MCP",
            txt: "mcp add remove list http stdio Jira Slack databases Google Drive Figma Sentry Datadog plugin",
            id: "mcp",
        },
        {
            sec: "Hooks",
            txt: "afterEdit beforeCommit afterCommit onSessionStart /hooks settings.json eslint typecheck",
            id: "hooks",
        },
        {
            sec: "Skills",
            txt: "custom slash commands .claude/skills/ review-pr /skills reusable workflows",
            id: "skills",
        },
        {
            sec: "Subagents",
            txt: "specialized assistants context window .claude/agents/ security-reviewer /agents tools",
            id: "subagents",
        },
        {
            sec: "Agent Teams",
            txt: "multiple agents parallel sessions git worktrees lead agent distribute merge large refactors",
            id: "agent-teams",
        },
        {
            sec: "Settings",
            txt: "/config settings.json user project local enterprise scopes model theme permissions",
            id: "settings",
        },
        {
            sec: "Permissions",
            txt: "allow deny Bash Read Glob Grep rm force push dangerously-skip-permissions Plan Mode",
            id: "permissions",
        },
        {
            sec: "Security",
            txt: "Anthropic API code context training .gitignore HTTPS prompt injection sandboxing privacy",
            id: "security",
        },
        {
            sec: "Model Configuration",
            txt: "Sonnet Opus Haiku --model /model extended thinking Alt+T MAX_THINKING_TOKENS",
            id: "models",
        },
        {
            sec: "CLI Reference",
            txt: "claude -p -c -r --model --permission-mode --add-dir --output-format --max-turns --json-schema flags",
            id: "cli-ref",
        },
        {
            sec: "Checkpointing",
            txt: "checkpoint Esc twice /rewind hover rewind VS Code fork restore undo git",
            id: "checkpointing",
        },
        {
            sec: "GitHub Actions",
            txt: "anthropics/claude-code-action pull_request CI CD automated review PR create ANTHROPIC_API_KEY yml",
            id: "github-actions",
        },
        {
            sec: "SDK & Programmatic",
            txt: "headless -p --output-format json stream-json --json-schema batch processing pipeline",
            id: "sdk",
        },
        {
            sec: "Troubleshooting",
            txt: "command not found claude doctor authentication rate limit MCP extension loading git conflicts",
            id: "troubleshooting",
        },
        {
            sec: "Supabase Integration",
            txt: "supabase MCP server agents schema-architect realtime-optimizer migration RLS npx claude-code-templates",
            id: "supabase",
        },
        {
            sec: "Tutorials & Videos",
            txt: "Mastering Claude Code 30 minutes best practices advanced features YouTube Anthropic video",
            id: "tutorials",
        },
        {
            sec: "Documentation & Links",
            txt: "official docs community GitHub YouTube Anthropic engineering blog ultimate guide resources",
            id: "resources",
        },
        {
            sec: "FAQ",
            txt: "Pro Max Team Enterprise subscription usage limits agentic Copilot ChatGPT monorepo subagents resume",
            id: "faq",
        },
    ]

    const doSearch = (q: string) => {
        if (!q || q.length < 2) {
            setSearchOpen(false)
            return
        }
        const ql = q.toLowerCase()
        const words = ql.split(/\s+/).filter((w) => w.length > 1)
        const seen = new Set<string>()
        const results = IDX.filter((item) =>
            words.every((w) => item.txt.toLowerCase().includes(w))
        )
            .filter((m) => {
                const k = m.id
                if (seen.has(k)) return false
                seen.add(k)
                return true
            })
            .slice(0, 8)
        setSearchResults(results)
        setSearchOpen(results.length > 0)
        setSearchSelIdx(-1)
    }

    const goResult = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        setSearchOpen(false)
        setSearchQuery("")
    }

    const navTo = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        setSidebarOpen(false)
    }

    const navGroups = [
        {
            label: "Getting Started",
            links: [
                { href: "overview", icon: "fas fa-compass", text: "Overview" },
                {
                    href: "quickstart",
                    icon: "fas fa-rocket",
                    text: "Quickstart",
                },
                {
                    href: "how-it-works",
                    icon: "fas fa-cogs",
                    text: "How It Works",
                },
            ],
        },
        {
            label: "Core Concepts",
            links: [
                {
                    href: "common-workflows",
                    icon: "fas fa-code-branch",
                    text: "Common Workflows",
                },
                {
                    href: "best-practices",
                    icon: "fas fa-star",
                    text: "Best Practices",
                },
                {
                    href: "claude-md",
                    icon: "fas fa-file-alt",
                    text: "CLAUDE.md",
                },
            ],
        },
        {
            label: "Platforms",
            links: [
                {
                    href: "terminal",
                    icon: "fas fa-terminal",
                    text: "Terminal (CLI)",
                },
                { href: "vscode", icon: "fas fa-code", text: "VS Code" },
                { href: "jetbrains", icon: "fab fa-java", text: "JetBrains" },
                {
                    href: "desktop",
                    icon: "fas fa-desktop",
                    text: "Desktop App",
                },
                { href: "web", icon: "fas fa-globe", text: "Web" },
            ],
        },
        {
            label: "Extend Claude Code",
            links: [
                { href: "mcp", icon: "fas fa-plug", text: "MCP" },
                { href: "hooks", icon: "fas fa-bolt", text: "Hooks" },
                { href: "skills", icon: "fas fa-magic", text: "Skills" },
                {
                    href: "subagents",
                    icon: "fas fa-users-cog",
                    text: "Subagents",
                },
                {
                    href: "agent-teams",
                    icon: "fas fa-people-arrows",
                    text: "Agent Teams",
                },
            ],
        },
        {
            label: "Configuration",
            links: [
                {
                    href: "settings",
                    icon: "fas fa-sliders-h",
                    text: "Settings",
                },
                {
                    href: "permissions",
                    icon: "fas fa-shield-alt",
                    text: "Permissions",
                },
                { href: "security", icon: "fas fa-lock", text: "Security" },
                { href: "models", icon: "fas fa-brain", text: "Models" },
            ],
        },
        {
            label: "Reference",
            links: [
                {
                    href: "cli-ref",
                    icon: "fas fa-hashtag",
                    text: "CLI Reference",
                },
                {
                    href: "checkpointing",
                    icon: "fas fa-history",
                    text: "Checkpointing",
                },
                {
                    href: "github-actions",
                    icon: "fab fa-github",
                    text: "GitHub Actions",
                },
                {
                    href: "sdk",
                    icon: "fas fa-cube",
                    text: "SDK & Programmatic",
                },
                {
                    href: "troubleshooting",
                    icon: "fas fa-wrench",
                    text: "Troubleshooting",
                },
            ],
        },
        {
            label: "Integrations",
            links: [
                { href: "supabase", icon: "fas fa-database", text: "Supabase" },
            ],
        },
        {
            label: "Resources",
            links: [
                {
                    href: "tutorials",
                    icon: "fas fa-play-circle",
                    text: "Tutorials & Videos",
                },
                {
                    href: "resources",
                    icon: "fas fa-book",
                    text: "Docs & Links",
                },
                { href: "faq", icon: "fas fa-question-circle", text: "FAQ" },
            ],
        },
    ]

    return (
        <div className="ccdocs-root">
            <style>{CSS}</style>

            {/* ── HEADER ── */}
            <header className="hdr">
                <button
                    className="mob-btn"
                    onClick={() => setSidebarOpen((o) => !o)}
                    aria-label="Menu"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="hdr-logo">
                    <div className="dot">C</div>
                    Claude Code Guide <span>Internal Docs</span>
                </div>
                <div className="search-box">
                    <i className="fas fa-search si"></i>
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search everything..."
                        autoComplete="off"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            doSearch(e.target.value.trim())
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setSearchSelIdx((i) =>
                                    Math.min(i + 1, searchResults.length - 1)
                                )
                            } else if (e.key === "ArrowUp") {
                                e.preventDefault()
                                setSearchSelIdx((i) => Math.max(i - 1, 0))
                            } else if (e.key === "Enter" && searchSelIdx >= 0) {
                                e.preventDefault()
                                goResult(searchResults[searchSelIdx].id)
                            } else if (e.key === "Escape") {
                                setSearchOpen(false)
                                searchRef.current?.blur()
                            }
                        }}
                    />
                    <kbd>Ctrl K</kbd>
                    {searchOpen && (
                        <div className="sr open">
                            {searchResults.length === 0 ? (
                                <div className="sr-empty">
                                    No results for "{searchQuery}"
                                </div>
                            ) : (
                                searchResults.map((r, i) => (
                                    <div
                                        key={i}
                                        className={`sr-item${i === searchSelIdx ? " active" : ""}`}
                                        onClick={() => goResult(r.id)}
                                    >
                                        <div className="sr-cat">{r.sec}</div>
                                        <div className="sr-txt">
                                            {r.txt.length > 90
                                                ? r.txt.substring(0, 90) + "…"
                                                : r.txt}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* ── SIDEBAR ── */}
            <aside className={`sidebar${sidebarOpen ? " open" : ""}`} id="sb">
                {navGroups.map((grp) => (
                    <div key={grp.label} className="sb-group">
                        <div className="sb-label">{grp.label}</div>
                        <ul className="sb-nav">
                            {grp.links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={`#${link.href}`}
                                        className={
                                            activeSection === link.href
                                                ? "active"
                                                : ""
                                        }
                                        onClick={(e) => {
                                            e.preventDefault()
                                            navTo(link.href)
                                        }}
                                    >
                                        <i className={link.icon}></i>{" "}
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* ── MAIN ── */}
            <div className="wrap">
                <main className="main" ref={mainRef}>
                    {/* HERO */}
                    <div className="hero">
                        <h1>
                            Getting Started with <em>Claude Code</em>
                        </h1>
                        <p>
                            Claude Code is Anthropic's agentic coding tool. It
                            reads your codebase, edits files, runs commands, and
                            integrates with your terminal, IDE, browser, and
                            apps.
                        </p>
                        <div className="badges">
                            {[
                                ["fas fa-terminal", "Terminal"],
                                ["fas fa-code", "VS Code"],
                                ["fab fa-java", "JetBrains"],
                                ["fas fa-desktop", "Desktop"],
                                ["fas fa-globe", "Browser"],
                                ["fab fa-github", "GitHub Actions"],
                                ["fab fa-slack", "Slack"],
                            ].map(([ic, tx]) => (
                                <span key={tx} className="badge">
                                    <i className={ic}></i> {tx}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── OVERVIEW ── */}
                    <section className="sec" id="overview">
                        <div className="sec-head">
                            <div className="sec-ico o">
                                <i className="fas fa-compass"></i>
                            </div>
                            <div>
                                <h2>Overview</h2>
                                <p className="sub">
                                    What Claude Code is and why we use it
                                </p>
                            </div>
                        </div>
                        <p>
                            Claude Code is an agentic coding tool that reads
                            your codebase, edits files, and runs commands.
                            Unlike simple code completion, Claude Code operates
                            in an <strong>agentic loop</strong> — it gathers
                            context, plans, acts, and verifies its own work.
                        </p>
                        <h3>Why Our CloseFuture Team Uses Claude Code?</h3>
                        <div className="cgrid">
                            {[
                                [
                                    "⚡",
                                    "Ship Faster",
                                    "Automate boilerplate, test writing, and code gen. Ship features in hours, not days.",
                                ],
                                [
                                    "🔁",
                                    "Git Automation",
                                    "Commits, branches, PRs, code reviews — all through natural language.",
                                ],
                                [
                                    "🧪",
                                    "Auto Testing",
                                    "Generate tests, run them, fix failures, and iterate until they pass.",
                                ],
                                [
                                    "🐛",
                                    "Bug Fixing",
                                    "Analyze stack traces, find root causes, and apply targeted fixes.",
                                ],
                                [
                                    "📝",
                                    "Documentation",
                                    "Auto-generate JSDoc, README updates, and release notes.",
                                ],
                                [
                                    "🤝",
                                    "Team Standards",
                                    "CLAUDE.md shares conventions across all sessions and team members.",
                                ],
                            ].map(([i, t, d]) => (
                                <div key={t} className="mc">
                                    <div className="mc-i">{i}</div>
                                    <h4>{t}</h4>
                                    <p>{d}</p>
                                </div>
                            ))}
                        </div>
                        <h3>What You Can Do</h3>
                        <ul className="fl">
                            {[
                                [
                                    "Ask questions about your codebase",
                                    '"How does our auth middleware work?"',
                                ],
                                [
                                    "Edit code across multiple files",
                                    '"Add input validation to the signup form"',
                                ],
                                [
                                    "Run and fix tests",
                                    '"Write tests for the cart service and fix any failures"',
                                ],
                                [
                                    "Search and navigate",
                                    '"Find all API endpoints that don\'t have auth checks"',
                                ],
                                [
                                    "Git operations",
                                    '"Commit these changes, create a PR with a clear description"',
                                ],
                                [
                                    "Automate CI workflows",
                                    "Use in GitHub Actions for automated code reviews",
                                ],
                                [
                                    "Connect external tools",
                                    "Jira, Slack, Supabase databases via MCP protocol",
                                ],
                            ].map(([s, d]) => (
                                <li key={s}>
                                    <i className="fas fa-chevron-right"></i>
                                    <div>
                                        <strong>{s}</strong> — {d}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3>Platforms at a Glance</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Platform</th>
                                        <th>Best For</th>
                                        <th>Key Features</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Terminal CLI</strong>
                                        </td>
                                        <td>Full control, scripting</td>
                                        <td>
                                            All features, composable with Unix
                                            tools
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>VS Code</strong>
                                        </td>
                                        <td>IDE workflow</td>
                                        <td>
                                            Inline diffs, @-mentions, plan
                                            review
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>JetBrains</strong>
                                        </td>
                                        <td>IntelliJ/PyCharm users</td>
                                        <td>
                                            Interactive diffs, context sharing
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Desktop App</strong>
                                        </td>
                                        <td>Visual review, parallel work</td>
                                        <td>
                                            Side-by-side sessions, visual diffs
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Web</strong>
                                        </td>
                                        <td>No local setup, mobile</td>
                                        <td>
                                            Cloud sandboxed, long-running tasks
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>GitHub Actions</strong>
                                        </td>
                                        <td>CI/CD automation</td>
                                        <td>Automated PR review, code gen</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Slack</strong>
                                        </td>
                                        <td>Team workflows</td>
                                        <td>Route bugs to PRs from chat</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="co info">
                            <i className="fas fa-info-circle"></i>
                            <div>
                                <strong>Subscription required.</strong> Claude
                                Code requires a Pro ($20/mo), Max
                                ($100/$200/mo), Team, or Enterprise plan. The
                                free tier does <em>not</em> include Claude Code.
                            </div>
                        </div>
                    </section>

                    {/* ── QUICKSTART ── */}
                    <section className="sec" id="quickstart">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <div>
                                <h2>Quickstart</h2>
                                <p className="sub">
                                    From zero to running in 5 minutes
                                </p>
                            </div>
                        </div>
                        <h3>System Requirements</h3>
                        <ul className="cl">
                            <li>
                                <strong>OS:</strong> macOS 13+, Windows 10
                                1809+, Ubuntu 20.04+, Debian 10+
                            </li>
                            <li>
                                <strong>Hardware:</strong> 4 GB+ RAM
                            </li>
                            <li>
                                <strong>Network:</strong> Internet connection
                                required
                            </li>
                            <li>
                                <strong>Shell:</strong> bash, zsh, or PowerShell
                                recommended
                            </li>
                        </ul>
                        <h3>Step-by-Step Setup</h3>
                        <div className="steps">
                            <div className="stp">
                                <h4>Create your account</h4>
                                <p>
                                    Go to{" "}
                                    <a href="https://claude.ai" target="_blank">
                                        claude.ai
                                    </a>{" "}
                                    and sign up. Upgrade to <strong>Pro</strong>{" "}
                                    ($20/mo) or <strong>Max</strong> ($100 or
                                    $200/mo) under Settings → Billing.
                                </p>
                            </div>
                            <div className="stp">
                                <h4>Install Claude Code</h4>
                                <Tabs
                                    groups={[
                                        {
                                            id: "q-mac",
                                            label: "macOS / Linux",
                                            content: (
                                                <CB
                                                    lang="bash"
                                                    code={`curl -fsSL https://claude.ai/install.sh | bash`}
                                                />
                                            ),
                                        },
                                        {
                                            id: "q-win",
                                            label: "Windows",
                                            content: (
                                                <CB
                                                    lang="powershell"
                                                    code={`# PowerShell\nirm https://claude.ai/install.ps1 | iex\n\n# Or WinGet\nwinget install Anthropic.ClaudeCode`}
                                                />
                                            ),
                                        },
                                        {
                                            id: "q-brew",
                                            label: "Homebrew",
                                            content: (
                                                <CB
                                                    lang="bash"
                                                    code={`brew install --cask claude-code`}
                                                />
                                            ),
                                        },
                                        {
                                            id: "q-npm",
                                            label: "npm",
                                            content: (
                                                <CB
                                                    lang="bash"
                                                    code={`# Requires Node.js 18+\nnpm install -g @anthropic-ai/claude-code`}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                            <div className="stp">
                                <h4>Navigate to your project and start</h4>
                                <CB
                                    lang="bash"
                                    code={`cd your-project\nclaude`}
                                />
                            </div>
                            <div className="stp">
                                <h4>Authenticate</h4>
                                <p>
                                    On first run, Claude opens your browser for
                                    login. Sign in with your Anthropic account
                                    and trust the project directory.
                                </p>
                            </div>
                            <div className="stp">
                                <h4>Start coding</h4>
                                <CB
                                    lang="bash"
                                    code={`# Ask about your project\n> summarize this codebase and explain the architecture\n\n# Make changes\n> add input validation to the signup form in src/components/Signup.tsx\n\n# Run tests\n> run the test suite and fix any failures`}
                                />
                            </div>
                        </div>
                        <div className="co tip">
                            <i className="fas fa-lightbulb"></i>
                            <div>
                                Claude respects <code>.gitignore</code> and
                                never sends ignored files. It reads your project
                                structure to understand context.
                            </div>
                        </div>
                    </section>

                    {/* ── HOW IT WORKS ── */}
                    <section className="sec" id="how-it-works">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-cogs"></i>
                            </div>
                            <div>
                                <h2>How Claude Code Works</h2>
                                <p className="sub">
                                    The agentic loop and available tools
                                </p>
                            </div>
                        </div>
                        <p>
                            Claude Code operates through an intelligent{" "}
                            <strong>three-phase agentic loop</strong>. Unlike
                            traditional code assistants, Claude gathers context,
                            acts, and verifies its own work — iterating until
                            complete.
                        </p>
                        <div
                            className="cgrid"
                            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
                        >
                            <div
                                className="mc"
                                style={{ borderTop: "3px solid var(--blue)" }}
                            >
                                <div className="mc-i">🔍</div>
                                <h4>1. Gather Context</h4>
                                <p>
                                    Read/search files, analyze errors, review
                                    git state, load CLAUDE.md instructions
                                </p>
                            </div>
                            <div
                                className="mc"
                                style={{ borderTop: "3px solid var(--accent)" }}
                            >
                                <div className="mc-i">⚡</div>
                                <h4>2. Take Action</h4>
                                <p>
                                    Edit files, run commands, execute git
                                    operations, invoke external tools via MCP
                                </p>
                            </div>
                            <div
                                className="mc"
                                style={{ borderTop: "3px solid var(--green)" }}
                            >
                                <div className="mc-i">✅</div>
                                <h4>3. Verify Results</h4>
                                <p>
                                    Run tests, analyze output, course-correct,
                                    iterate until the task is complete
                                </p>
                            </div>
                        </div>
                        <h3>Available Tools</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tool</th>
                                        <th>What It Does</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Read</strong>
                                        </td>
                                        <td>
                                            Read file contents with line-level
                                            precision
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Write / Edit</strong>
                                        </td>
                                        <td>
                                            Create new files or make targeted
                                            edits
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Glob</strong>
                                        </td>
                                        <td>
                                            Find files by pattern (e.g.,{" "}
                                            <code>**/*.tsx</code>)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Grep</strong>
                                        </td>
                                        <td>Search file contents with regex</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Bash</strong>
                                        </td>
                                        <td>
                                            Execute shell commands (builds,
                                            tests, git, etc.)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Task (Subagent)</strong>
                                        </td>
                                        <td>
                                            Spawn sub-agents for parallel work
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>WebSearch</strong>
                                        </td>
                                        <td>
                                            Search the web for documentation and
                                            solutions
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>MCP Tools</strong>
                                        </td>
                                        <td>
                                            External integrations (Jira, Slack,
                                            databases, etc.)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Permission System</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mode</th>
                                        <th>Behavior</th>
                                        <th>Activate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Normal</strong> (default)
                                        </td>
                                        <td>
                                            Asks before file edits and shell
                                            commands
                                        </td>
                                        <td>Default</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Auto-Accept Edits</strong>
                                        </td>
                                        <td>
                                            Edits files silently, asks for shell
                                            commands
                                        </td>
                                        <td>
                                            <code>Shift+Tab</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Plan Mode</strong>
                                        </td>
                                        <td>
                                            Read-only analysis, creates a plan
                                            for your approval
                                        </td>
                                        <td>
                                            <code>Shift+Tab</code> ×2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── COMMON WORKFLOWS ── */}
                    <section className="sec" id="common-workflows">
                        <div className="sec-head">
                            <div className="sec-ico p">
                                <i className="fas fa-code-branch"></i>
                            </div>
                            <div>
                                <h2>Common Workflows</h2>
                                <p className="sub">
                                    How to use Claude Code for everyday tasks
                                </p>
                            </div>
                        </div>
                        <h3>Explore → Plan → Code → Commit</h3>
                        <div className="steps">
                            <div className="stp">
                                <h4>Explore (Plan Mode)</h4>
                                <p>
                                    Start with <code>Shift+Tab</code> to enter
                                    Plan Mode. Ask Claude to read and understand
                                    the relevant code.
                                </p>
                                <CB
                                    lang="prompt"
                                    code={`> read src/auth/ and explain how session handling works`}
                                    showCopy={false}
                                />
                            </div>
                            <div className="stp">
                                <h4>Plan</h4>
                                <p>
                                    Ask for a detailed implementation plan.
                                    Review it, adjust if needed.
                                </p>
                                <CB
                                    lang="prompt"
                                    code={`> create a plan to add OAuth2 support using the existing auth patterns`}
                                    showCopy={false}
                                />
                            </div>
                            <div className="stp">
                                <h4>Implement</h4>
                                <p>
                                    Switch back to Normal Mode and let Claude
                                    execute the plan.
                                </p>
                                <CB
                                    lang="prompt"
                                    code={`> implement the plan. write tests and run them after each change`}
                                    showCopy={false}
                                />
                            </div>
                            <div className="stp">
                                <h4>Commit</h4>
                                <CB
                                    lang="prompt"
                                    code={`> commit the changes with a descriptive message and create a PR`}
                                    showCopy={false}
                                />
                            </div>
                        </div>
                        <h3>Fix Bugs</h3>
                        <CB
                            lang="prompts"
                            code={`> the login form throws a TypeError when email is empty - find and fix it\n> users report a blank screen after failed login. check token refresh in src/auth/\n> fix the race condition in the checkout flow`}
                        />
                        <h3>Write and Fix Tests</h3>
                        <CB
                            lang="prompts"
                            code={`> write comprehensive tests for the CartService class, aim for >90% coverage\n> find untested functions in the notification module and add edge case tests\n> run the test suite and fix all failures`}
                        />
                        <h3>Refactor Code</h3>
                        <CB
                            lang="prompts"
                            code={`> refactor fetchUserData to use async/await instead of .then() chains\n> migrate our Express routes from JavaScript to TypeScript with proper type definitions\n> find deprecated API usage across the project and suggest modern alternatives`}
                        />
                        <h3>Git & PRs</h3>
                        <CB
                            lang="prompts"
                            code={`> commit my changes with a descriptive message\n> create a new branch called feature/oauth2\n> create a PR with a summary of what changed and why\n> help me resolve the merge conflicts in src/api/users.ts`}
                        />
                        <h3>Pipe & Script (Headless)</h3>
                        <CB
                            lang="bash"
                            code={`# One-shot query\nclaude -p "summarize this project"\n\n# Process piped content\ngit diff main...feature | claude -p "review these changes for bugs and security issues"\n\n# Structured output\nclaude -p "list all API endpoints" --output-format json > endpoints.json`}
                        />
                    </section>

                    {/* ── BEST PRACTICES ── */}
                    <section className="sec" id="best-practices">
                        <div className="sec-head">
                            <div className="sec-ico y">
                                <i className="fas fa-star"></i>
                            </div>
                            <div>
                                <h2>Best Practices</h2>
                                <p className="sub">
                                    Get the most out of Claude Code
                                </p>
                            </div>
                        </div>
                        <h3>Write Effective Prompts</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Strategy</th>
                                        <th style={{ color: "var(--red)" }}>
                                            ❌ Before
                                        </th>
                                        <th style={{ color: "var(--green)" }}>
                                            ✓ After
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Be specific</td>
                                        <td>"fix the bugs"</td>
                                        <td>
                                            "fix the null pointer in
                                            UserService.getProfile() when
                                            user.email is undefined"
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Point to sources</td>
                                        <td>"why is the API weird?"</td>
                                        <td>
                                            "look through the git history of
                                            ExecutionFactory and explain the
                                            design decisions"
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Reference patterns</td>
                                        <td>"add a calendar widget"</td>
                                        <td>
                                            "look at HotDogWidget.php as a
                                            reference and implement a
                                            CalendarWidget similarly"
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Include verification</td>
                                        <td>"write a validator"</td>
                                        <td>
                                            "write validateEmail. test:
                                            user@example.com=true,
                                            invalid=false. run tests after"
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Context Management</h3>
                        <div className="card">
                            <div className="card-t">
                                <i className="fas fa-brain"></i> Your most
                                important resource
                            </div>
                            <ul className="cl">
                                <li>
                                    Use <code>/clear</code> between unrelated
                                    tasks
                                </li>
                                <li>
                                    Use <code>/compact</code> to compress long
                                    conversations
                                </li>
                                <li>
                                    Run <code>/clear</code> after 2+ failed
                                    correction attempts — start fresh
                                </li>
                                <li>
                                    Use subagents for exploratory work (they get
                                    separate context)
                                </li>
                                <li>
                                    Put persistent rules in{" "}
                                    <code>CLAUDE.md</code>, not in conversation
                                </li>
                            </ul>
                        </div>
                        <h3>Pitfalls to Avoid</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ color: "var(--red)" }}>
                                            Pitfall
                                        </th>
                                        <th style={{ color: "var(--green)" }}>
                                            Fix
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Kitchen-sink sessions (mixing
                                            unrelated tasks)
                                        </td>
                                        <td>
                                            <code>/clear</code> between
                                            different tasks
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Correcting Claude repeatedly</td>
                                        <td>
                                            <code>/clear</code> and rewrite a
                                            better initial prompt
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Over-specified CLAUDE.md</td>
                                        <td>
                                            Keep it short — aim for under 100
                                            lines
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Trust-then-verify gap</td>
                                        <td>
                                            Always include tests or screenshots
                                            as verification
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="co warn">
                            <i className="fas fa-exclamation-triangle"></i>
                            <div>
                                <strong>Security:</strong> Be cautious about
                                prompt injection. Don't paste untrusted content
                                directly into Claude without reviewing it.
                            </div>
                        </div>
                    </section>

                    {/* ── CLAUDE.MD ── */}
                    <section className="sec" id="claude-md">
                        <div className="sec-head">
                            <div className="sec-ico o">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div>
                                <h2>CLAUDE.md</h2>
                                <p className="sub">
                                    Project memory and team standards
                                </p>
                            </div>
                        </div>
                        <p>
                            CLAUDE.md is a markdown file Claude reads at the
                            start of every session. Run <code>/init</code> to
                            create one.
                        </p>
                        <h3>Where to Put It</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Scope</th>
                                        <th>Git</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>~/.claude/CLAUDE.md</code>
                                        </td>
                                        <td>
                                            Global — all projects, all sessions
                                        </td>
                                        <td>Not in git</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>./CLAUDE.md</code>
                                        </td>
                                        <td>Project — shared with team</td>
                                        <td>Check into git</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>./CLAUDE.local.md</code>
                                        </td>
                                        <td>Personal project prefs</td>
                                        <td>Add to .gitignore</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>./src/CLAUDE.md</code>
                                        </td>
                                        <td>
                                            Subdirectory — auto-loaded for that
                                            folder
                                        </td>
                                        <td>Check into git</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>What to Include</h3>
                        <CB
                            lang="markdown"
                            code={`# CLAUDE.md\n\n## Tech Stack\n- TypeScript strict mode, React 18, Next.js 14\n- Tailwind CSS for styling\n- Vitest for testing (not Jest)\n- pnpm (not npm or yarn)\n\n## Commands\n- Build: \`pnpm build\`\n- Test: \`pnpm test\`\n- Lint: \`pnpm lint\`\n\n## Architecture\n- API routes in src/api/\n- Components in src/components/\n- All DB access through Supabase Client\n\n## Conventions\n- Branch naming: feature/*, bugfix/*, hotfix/*\n- Commit messages: conventional commits (feat:, fix:, refactor:)`}
                        />
                        <div className="co tip">
                            <i className="fas fa-lightbulb"></i>
                            <div>
                                Keep your CLAUDE.md concise. Long files waste
                                context tokens every session. Aim for under 100
                                lines.
                            </div>
                        </div>
                    </section>

                    {/* ── TERMINAL ── */}
                    <section className="sec" id="terminal">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fas fa-terminal"></i>
                            </div>
                            <div>
                                <h2>Terminal (CLI)</h2>
                                <p className="sub">
                                    The full-featured command-line interface
                                </p>
                            </div>
                        </div>
                        <h3>Starting a Session</h3>
                        <CB
                            lang="bash"
                            code={`claude                     # Interactive session\nclaude "task description"  # Start with a task\nclaude -p "query"          # One-shot (print mode)\nclaude -c                  # Continue most recent conversation\nclaude -r                  # Resume a specific session\nclaude -r auth-refactor    # Resume by session name`}
                        />
                        <h3>Interactive Commands</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Command</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        [
                                            "/help",
                                            "Show all commands and keyboard shortcuts",
                                        ],
                                        [
                                            "/compact",
                                            "Compress conversation to save context",
                                        ],
                                        [
                                            "/clear",
                                            "Reset conversation — start fresh",
                                        ],
                                        [
                                            "/model",
                                            "Switch model mid-session (Sonnet, Opus, Haiku)",
                                        ],
                                        [
                                            "/context",
                                            "Check context window usage",
                                        ],
                                        [
                                            "/commit",
                                            "Create a well-formatted git commit",
                                        ],
                                        ["/review-pr", "Review a pull request"],
                                        [
                                            "/init",
                                            "Generate a CLAUDE.md for the project",
                                        ],
                                        ["/login", "Switch accounts"],
                                        [
                                            "/doctor",
                                            "Diagnose installation issues",
                                        ],
                                        ["/config", "Open settings interface"],
                                        [
                                            "/hooks",
                                            "Configure automation hooks",
                                        ],
                                        ["/skills", "List available skills"],
                                        ["/agents", "Configure subagents"],
                                    ].map(([cmd, desc]) => (
                                        <tr key={cmd}>
                                            <td>
                                                <code>{cmd}</code>
                                            </td>
                                            <td>{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h3>Keyboard Shortcuts</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Shortcut</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>Shift+Tab</code>
                                        </td>
                                        <td>
                                            Cycle permission modes (Normal →
                                            Auto-Accept → Plan)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Esc</code>
                                        </td>
                                        <td>Interrupt current action</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Esc Esc</code>
                                        </td>
                                        <td>Rewind to last checkpoint</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Ctrl+C</code>
                                        </td>
                                        <td>Cancel / exit</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>?</code>
                                        </td>
                                        <td>Show all keyboard shortcuts</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── VS CODE ── */}
                    <section className="sec" id="vscode">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fas fa-code"></i>
                            </div>
                            <div>
                                <h2>VS Code Integration</h2>
                                <p className="sub">
                                    Full IDE integration with inline diffs
                                </p>
                            </div>
                        </div>
                        <p>
                            Search for <strong>"Claude Code"</strong> in the
                            Extensions marketplace (<code>Ctrl+Shift+X</code>)
                            and install. Requires VS Code 1.98.0+.
                        </p>
                        <h3>Key Shortcuts</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Shortcut</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>Alt+K</code>
                                        </td>
                                        <td>
                                            Insert @-mention (reference a file)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Ctrl+Esc</code>
                                        </td>
                                        <td>
                                            Toggle focus between editor and
                                            Claude
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Ctrl+Shift+Esc</code>
                                        </td>
                                        <td>Open Claude in a new editor tab</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Ctrl+N</code>
                                        </td>
                                        <td>New conversation</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Shift+Tab</code>
                                        </td>
                                        <td>Cycle permission modes</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>Alt+T</code>
                                        </td>
                                        <td>Toggle extended thinking</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Features</h3>
                        <ul className="cl">
                            <li>
                                <strong>Inline diffs</strong> — review every
                                code change before accepting
                            </li>
                            <li>
                                <strong>@-mentions</strong> —{" "}
                                <code>@filename</code> for files,{" "}
                                <code>@folder/</code> for directories
                            </li>
                            <li>
                                <strong>Checkpoints</strong> — hover over
                                messages to rewind code and conversation
                            </li>
                            <li>
                                <strong>Plan Mode</strong> — analyze safely
                                before committing to changes
                            </li>
                            <li>
                                <strong>Drag & drop</strong> — drag files into
                                chat as context
                            </li>
                        </ul>
                    </section>

                    {/* ── JETBRAINS ── */}
                    <section className="sec" id="jetbrains">
                        <div className="sec-head">
                            <div className="sec-ico p">
                                <i className="fab fa-java"></i>
                            </div>
                            <div>
                                <h2>JetBrains IDEs</h2>
                                <p className="sub">
                                    IntelliJ, PyCharm, WebStorm, and more
                                </p>
                            </div>
                        </div>
                        <p>
                            Install the <strong>Claude Code</strong> plugin from
                            the JetBrains Marketplace. Supports IntelliJ IDEA,
                            PyCharm, WebStorm, GoLand, PHPStorm, and others.
                        </p>
                        <ul className="cl">
                            <li>
                                Interactive diffs for reviewing code changes
                            </li>
                            <li>Context sharing with the IDE</li>
                            <li>
                                Same command set as the CLI (
                                <code>/compact</code>, <code>/clear</code>,
                                etc.)
                            </li>
                            <li>
                                Permission mode cycling with{" "}
                                <code>Shift+Tab</code>
                            </li>
                        </ul>
                    </section>

                    {/* ── DESKTOP ── */}
                    <section className="sec" id="desktop">
                        <div className="sec-head">
                            <div className="sec-ico o">
                                <i className="fas fa-desktop"></i>
                            </div>
                            <div>
                                <h2>Desktop App</h2>
                                <p className="sub">
                                    Visual interface with parallel sessions
                                </p>
                            </div>
                        </div>
                        <p>
                            Download from{" "}
                            <a
                                href="https://claude.ai/download"
                                target="_blank"
                            >
                                claude.ai/download
                            </a>{" "}
                            for macOS (Intel/Apple Silicon) or Windows (x64,
                            ARM64).
                        </p>
                        <ul className="cl">
                            <li>
                                Side-by-side parallel sessions with separate git
                                worktrees
                            </li>
                            <li>Visual diffs for reviewing changes</li>
                            <li>
                                All the same agentic capabilities as the
                                terminal
                            </li>
                            <li>
                                Use <code>/desktop</code> in CLI to hand off a
                                session to the desktop app
                            </li>
                        </ul>
                    </section>

                    {/* ── WEB ── */}
                    <section className="sec" id="web">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-globe"></i>
                            </div>
                            <div>
                                <h2>Claude Code on the Web</h2>
                                <p className="sub">
                                    No install required, cloud-sandboxed
                                </p>
                            </div>
                        </div>
                        <p>
                            Go to{" "}
                            <a href="https://claude.ai/code" target="_blank">
                                claude.ai/code
                            </a>{" "}
                            and sign in. No local setup needed.
                        </p>
                        <ul className="cl">
                            <li>
                                Full agentic coding in a sandboxed cloud
                                environment
                            </li>
                            <li>Connect to GitHub repos directly</li>
                            <li>
                                Long-running tasks continue even if you close
                                the browser
                            </li>
                            <li>
                                Works on mobile — check progress from anywhere
                            </li>
                            <li>
                                Use <code>/teleport</code> in CLI to pull a
                                cloud session to your terminal
                            </li>
                        </ul>
                    </section>

                    {/* ── MCP ── */}
                    <section className="sec" id="mcp">
                        <div className="sec-head">
                            <div className="sec-ico c">
                                <i className="fas fa-plug"></i>
                            </div>
                            <div>
                                <h2>Model Context Protocol (MCP)</h2>
                                <p className="sub">
                                    Connect Claude to external tools and
                                    services
                                </p>
                            </div>
                        </div>
                        <p>
                            MCP lets Claude Code communicate with external tools
                            — databases, APIs, project management tools, and
                            more.
                        </p>
                        <h3>Adding MCP Servers</h3>
                        <CB
                            lang="bash"
                            code={`# Add a server\nclaude mcp add --transport http github https://api.githubcopilot.com/mcp/\n\n# Add a stdio server\nclaude mcp add my-server -- node /path/to/server.js\n\n# List configured servers\nclaude mcp list\n\n# Remove a server\nclaude mcp remove my-server`}
                        />
                        <h3>Popular Integrations</h3>
                        <div className="cgrid">
                            {[
                                [
                                    "📋",
                                    "Jira / Linear",
                                    "Read and update tickets from within Claude",
                                ],
                                [
                                    "💬",
                                    "Slack",
                                    "Send messages and read channel context",
                                ],
                                [
                                    "🗄️",
                                    "Databases",
                                    "Query Postgres, MySQL, SQLite directly",
                                ],
                                [
                                    "📁",
                                    "Google Drive",
                                    "Read docs and spreadsheets as context",
                                ],
                                [
                                    "🎨",
                                    "Figma",
                                    "Read design files and translate to code",
                                ],
                                [
                                    "📊",
                                    "Monitoring",
                                    "Connect to Sentry, Datadog, etc.",
                                ],
                            ].map(([i, t, d]) => (
                                <div key={t} className="mc">
                                    <div className="mc-i">{i}</div>
                                    <h4>{t}</h4>
                                    <p>{d}</p>
                                </div>
                            ))}
                        </div>
                        <div className="co info">
                            <i className="fas fa-info-circle"></i>
                            <div>
                                MCP servers consume context tokens. Be mindful
                                of how many you have active simultaneously.
                            </div>
                        </div>
                    </section>

                    {/* ── HOOKS ── */}
                    <section className="sec" id="hooks">
                        <div className="sec-head">
                            <div className="sec-ico y">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div>
                                <h2>Hooks</h2>
                                <p className="sub">
                                    Automate actions before or after Claude acts
                                </p>
                            </div>
                        </div>
                        <p>
                            Hooks run deterministic commands at specific points
                            in Claude's workflow — like linting after edits or
                            blocking changes to certain directories.
                        </p>
                        <CB
                            lang="json"
                            code={`{\n  "hooks": {\n    "afterEdit": [\n      { "command": "eslint --fix $FILE", "description": "Auto-fix lint issues" }\n    ],\n    "beforeCommit": [\n      { "command": "pnpm typecheck", "description": "Type-check before committing" }\n    ]\n  }\n}`}
                        />
                        <h3>Available Hook Points</h3>
                        <ul className="cl">
                            <li>
                                <strong>afterEdit</strong> — runs after any file
                                is modified
                            </li>
                            <li>
                                <strong>beforeCommit</strong> — runs before git
                                commits
                            </li>
                            <li>
                                <strong>afterCommit</strong> — runs after git
                                commits
                            </li>
                            <li>
                                <strong>onSessionStart</strong> — runs when a
                                session begins
                            </li>
                        </ul>
                    </section>

                    {/* ── SKILLS ── */}
                    <section className="sec" id="skills">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-magic"></i>
                            </div>
                            <div>
                                <h2>Skills</h2>
                                <p className="sub">
                                    Reusable slash commands for common workflows
                                </p>
                            </div>
                        </div>
                        <p>
                            Skills are custom slash commands you create for
                            repeatable workflows. They live in{" "}
                            <code>.claude/skills/</code>.
                        </p>
                        <CB
                            lang=".claude/skills/review-pr/SKILL.md"
                            code={`---\nname: review-pr\ndescription: Review a PR with our team's checklist\n---\n\n# PR Review Workflow\n1. Read all changed files\n2. Check for security issues (SQL injection, XSS, auth bypass)\n3. Check for performance issues (N+1 queries, missing indexes)\n4. Verify tests exist for new functionality\n5. Check adherence to our code style (see CLAUDE.md)\n6. Write a structured review comment`}
                        />
                        <p>
                            Then use it with <code>/review-pr</code>. Run{" "}
                            <code>/skills</code> to see all available skills.
                        </p>
                    </section>

                    {/* ── SUBAGENTS ── */}
                    <section className="sec" id="subagents">
                        <div className="sec-head">
                            <div className="sec-ico p">
                                <i className="fas fa-users-cog"></i>
                            </div>
                            <div>
                                <h2>Subagents</h2>
                                <p className="sub">
                                    Specialized AI assistants within a session
                                </p>
                            </div>
                        </div>
                        <p>
                            Subagents are specialized assistants that run in
                            their own context window with specific tools and
                            permissions.
                        </p>
                        <ul className="cl">
                            <li>
                                <strong>Preserve context</strong> — keep
                                exploration out of your main conversation
                            </li>
                            <li>
                                <strong>Enforce constraints</strong> — limit
                                which tools a subagent can use
                            </li>
                            <li>
                                <strong>Specialize</strong> — dedicated agents
                                for testing, docs, security review
                            </li>
                            <li>
                                <strong>Control costs</strong> — route tasks to
                                faster, cheaper models like Haiku
                            </li>
                        </ul>
                        <h3>Creating a Subagent</h3>
                        <CB
                            lang=".claude/agents/security-reviewer.md"
                            code={`---\nname: security-reviewer\ndescription: Review code for security vulnerabilities\nmodel: sonnet\ntools:\n  - Read\n  - Grep\n  - Glob\n---\n\nYou are a security-focused code reviewer. Analyze code for:\n- SQL injection, XSS, CSRF vulnerabilities\n- Authentication and authorization issues\n- Hardcoded secrets or credentials`}
                        />
                    </section>

                    {/* ── AGENT TEAMS ── */}
                    <section className="sec" id="agent-teams">
                        <div className="sec-head">
                            <div className="sec-ico c">
                                <i className="fas fa-people-arrows"></i>
                            </div>
                            <div>
                                <h2>Agent Teams</h2>
                                <p className="sub">
                                    Multiple agents working in parallel
                                </p>
                            </div>
                        </div>
                        <p>
                            While subagents work within a single session,{" "}
                            <strong>agent teams</strong> coordinate across
                            separate sessions. A lead agent distributes work and
                            merges results.
                        </p>
                        <ul className="cl">
                            <li>
                                Parallel processing — multiple agents work on
                                different parts simultaneously
                            </li>
                            <li>
                                Separate git worktrees — each agent works in
                                isolation
                            </li>
                            <li>
                                Lead agent coordinates — distributes tasks,
                                reviews output, merges
                            </li>
                            <li>
                                Useful for large refactors, multi-service
                                changes, comprehensive testing
                            </li>
                        </ul>
                        <div className="co info">
                            <i className="fas fa-info-circle"></i>
                            <div>
                                Agent teams are best for tasks that are
                                naturally parallelizable. For sequential tasks,
                                use regular sessions or subagents instead.
                            </div>
                        </div>
                    </section>

                    {/* ── SETTINGS ── */}
                    <section className="sec" id="settings">
                        <div className="sec-head">
                            <div className="sec-ico o">
                                <i className="fas fa-sliders-h"></i>
                            </div>
                            <div>
                                <h2>Settings & Configuration</h2>
                                <p className="sub">
                                    Customize Claude Code behavior
                                </p>
                            </div>
                        </div>
                        <p>
                            Configure via <code>/config</code> in a session, or
                            edit <code>.claude/settings.json</code> directly.
                        </p>
                        <h3>Configuration Scopes</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Scope</th>
                                        <th>Location</th>
                                        <th>Use For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>User</strong>
                                        </td>
                                        <td>
                                            <code>~/.claude/settings.json</code>
                                        </td>
                                        <td>
                                            Personal preferences across all
                                            projects
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Project</strong>
                                        </td>
                                        <td>
                                            <code>.claude/settings.json</code>
                                        </td>
                                        <td>Team settings, check into git</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Local</strong>
                                        </td>
                                        <td>
                                            <code>
                                                .claude/settings.local.json
                                            </code>
                                        </td>
                                        <td>
                                            Personal project prefs, gitignored
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Enterprise</strong>
                                        </td>
                                        <td>Server-managed</td>
                                        <td>Organization-wide policies</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CB
                            lang="json"
                            code={`{\n  "permissions": {\n    "allow": ["Bash(npm test)", "Bash(git status)", "Bash(pnpm lint)"]\n  },\n  "model": "sonnet",\n  "theme": "dark"\n}`}
                        />
                    </section>

                    {/* ── PERMISSIONS ── */}
                    <section className="sec" id="permissions">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <h2>Permissions</h2>
                                <p className="sub">
                                    Control what Claude can and can't do
                                </p>
                            </div>
                        </div>
                        <CB
                            lang=".claude/settings.json"
                            code={`{\n  "permissions": {\n    "allow": [\n      "Bash(npm test)",\n      "Bash(npm run lint)",\n      "Bash(git status)",\n      "Bash(git diff *)",\n      "Read", "Glob", "Grep"\n    ],\n    "deny": [\n      "Bash(rm -rf *)",\n      "Bash(git push --force *)"\n    ]\n  }\n}`}
                        />
                        <h3>Permission Modes</h3>
                        <ul className="cl">
                            <li>
                                <strong>Normal:</strong> Ask for each edit and
                                command
                            </li>
                            <li>
                                <strong>Auto-Accept Edits:</strong> Edit files
                                freely, ask for commands
                            </li>
                            <li>
                                <strong>Plan Mode:</strong> Read-only. Creates a
                                plan for approval before any changes
                            </li>
                        </ul>
                        <div className="co danger">
                            <i className="fas fa-exclamation-circle"></i>
                            <div>
                                <code>--dangerously-skip-permissions</code>{" "}
                                bypasses all permission prompts. Only use this
                                in sandboxed CI environments, never locally.
                            </div>
                        </div>
                    </section>

                    {/* ── SECURITY ── */}
                    <section className="sec" id="security">
                        <div className="sec-head">
                            <div className="sec-ico y">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div>
                                <h2>Security</h2>
                                <p className="sub">Data privacy and safety</p>
                            </div>
                        </div>
                        <ul className="cl">
                            <li>
                                Code context is sent to Anthropic's API for
                                processing
                            </li>
                            <li>
                                Anthropic does <strong>not</strong> train on
                                your code by default
                            </li>
                            <li>
                                Team and Enterprise plans have additional data
                                privacy guarantees
                            </li>
                            <li>
                                Claude respects <code>.gitignore</code> —
                                ignored files are never sent
                            </li>
                            <li>
                                Permission system prevents unauthorized
                                destructive actions
                            </li>
                            <li>
                                All API communication is encrypted over HTTPS
                            </li>
                        </ul>
                        <div className="co warn">
                            <i className="fas fa-exclamation-triangle"></i>
                            <div>
                                <strong>Prompt injection:</strong> Be aware that
                                content in files could attempt to manipulate
                                Claude. Don't blindly paste untrusted content.
                            </div>
                        </div>
                    </section>

                    {/* ── MODELS ── */}
                    <section className="sec" id="models">
                        <div className="sec-head">
                            <div className="sec-ico p">
                                <i className="fas fa-brain"></i>
                            </div>
                            <div>
                                <h2>Model Configuration</h2>
                                <p className="sub">
                                    Choose the right model for the task
                                </p>
                            </div>
                        </div>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Best For</th>
                                        <th>Speed</th>
                                        <th>Usage Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Sonnet</strong> (default)
                                        </td>
                                        <td>
                                            Most coding tasks — good balance
                                        </td>
                                        <td>Fast</td>
                                        <td>Low</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Opus</strong>
                                        </td>
                                        <td>Complex reasoning, architecture</td>
                                        <td>Slower</td>
                                        <td>High</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Haiku</strong>
                                        </td>
                                        <td>Simple tasks, high volume</td>
                                        <td>Fastest</td>
                                        <td>Lowest</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CB
                            lang="bash"
                            code={`# Start with a specific model\nclaude --model opus\n\n# Switch mid-session\n/model sonnet\n\n# Toggle extended thinking (Opus)\n# Alt+T in VS Code`}
                        />
                        <h3>Extended Thinking</h3>
                        <ul className="cl">
                            <li>Enabled by default for Opus</li>
                            <li>
                                Toggle with <code>Alt+T</code> (VS Code) or{" "}
                                <code>Option+T</code> (macOS)
                            </li>
                            <li>
                                Disable with{" "}
                                <code>export MAX_THINKING_TOKENS=0</code>
                            </li>
                        </ul>
                    </section>

                    {/* ── CLI REFERENCE ── */}
                    <section className="sec" id="cli-ref">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fas fa-hashtag"></i>
                            </div>
                            <div>
                                <h2>CLI Reference</h2>
                                <p className="sub">
                                    Complete command-line reference
                                </p>
                            </div>
                        </div>
                        <h3>Flags</h3>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Flag</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        [
                                            "-p, --print",
                                            "Print response without interactive mode",
                                        ],
                                        [
                                            "-c, --continue",
                                            "Continue most recent conversation",
                                        ],
                                        [
                                            "-r, --resume",
                                            "Resume a specific session by name or ID",
                                        ],
                                        [
                                            "--model <name>",
                                            "Set model (sonnet, opus, haiku)",
                                        ],
                                        [
                                            "--permission-mode",
                                            "Set mode (default, plan, acceptEdits)",
                                        ],
                                        [
                                            "--add-dir <path>",
                                            "Add additional working directories",
                                        ],
                                        [
                                            "--tools <list>",
                                            "Restrict available tools",
                                        ],
                                        [
                                            "--output-format",
                                            "Output format: text, json, stream-json",
                                        ],
                                        [
                                            "--max-turns <n>",
                                            "Limit number of agentic turns",
                                        ],
                                        [
                                            "--json-schema",
                                            "Get validated structured JSON output",
                                        ],
                                        ["--verbose", "Enable verbose logging"],
                                        [
                                            "--chrome",
                                            "Enable Chrome browser automation",
                                        ],
                                    ].map(([f, d]) => (
                                        <tr key={f}>
                                            <td>
                                                <code>{f}</code>
                                            </td>
                                            <td>{d}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── CHECKPOINTING ── */}
                    <section className="sec" id="checkpointing">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-history"></i>
                            </div>
                            <div>
                                <h2>Checkpointing</h2>
                                <p className="sub">Undo anything — safely</p>
                            </div>
                        </div>
                        <p>
                            Claude automatically creates checkpoints before
                            making changes. You can rewind to any checkpoint to
                            restore both code and conversation state.
                        </p>
                        <ul className="cl">
                            <li>
                                <strong>Terminal:</strong> Press{" "}
                                <code>Esc</code> twice, or use{" "}
                                <code>/rewind</code>
                            </li>
                            <li>
                                <strong>VS Code:</strong> Hover over a message
                                and click the rewind icon
                            </li>
                            <li>
                                Rewind restores: code changes, conversation
                                state, and file system
                            </li>
                            <li>
                                You can fork from a checkpoint to try a
                                different approach
                            </li>
                        </ul>
                        <div className="co tip">
                            <i className="fas fa-lightbulb"></i>
                            <div>
                                Checkpoints persist across sessions but are{" "}
                                <strong>not a replacement for git</strong>.
                                Always commit important work.
                            </div>
                        </div>
                    </section>

                    {/* ── GITHUB ACTIONS ── */}
                    <section className="sec" id="github-actions">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fab fa-github"></i>
                            </div>
                            <div>
                                <h2>GitHub Actions</h2>
                                <p className="sub">
                                    CI/CD automation with Claude Code
                                </p>
                            </div>
                        </div>
                        <p>
                            Use Claude Code in your GitHub Actions workflows for
                            automated code reviews, PR generation, and more.
                        </p>
                        <CB
                            lang=".github/workflows/claude-review.yml"
                            code={`name: Claude Code Review\non: [pull_request]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}\n          prompt: |\n            Review this PR for:\n            - Bugs and logic errors\n            - Security vulnerabilities\n            - Performance issues\n            Provide specific, actionable feedback.`}
                        />
                    </section>

                    {/* ── SDK ── */}
                    <section className="sec" id="sdk">
                        <div className="sec-head">
                            <div className="sec-ico p">
                                <i className="fas fa-cube"></i>
                            </div>
                            <div>
                                <h2>SDK & Programmatic Usage</h2>
                                <p className="sub">
                                    Build with Claude Code as a library
                                </p>
                            </div>
                        </div>
                        <CB
                            lang="bash"
                            code={`# Headless mode\nclaude -p "explain this function" --output-format text\n\n# JSON output for parsing\nclaude -p "list all API endpoints" --output-format json\n\n# Stream output\ncat access.log | claude -p "detect anomalies" --output-format stream-json\n\n# Combine with other tools\ngit diff main --name-only | xargs -I{} claude -p "review {} for security issues" --output-format json`}
                        />
                    </section>

                    {/* ── TROUBLESHOOTING ── */}
                    <section className="sec" id="troubleshooting">
                        <div className="sec-head">
                            <div className="sec-ico y">
                                <i className="fas fa-wrench"></i>
                            </div>
                            <div>
                                <h2>Troubleshooting</h2>
                                <p className="sub">
                                    Common issues and solutions
                                </p>
                            </div>
                        </div>
                        <div className="tw">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Issue</th>
                                        <th>Solution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>
                                                command not found: claude
                                            </code>
                                        </td>
                                        <td>
                                            Reinstall, or add to PATH. Run{" "}
                                            <code>claude doctor</code>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Authentication failures</td>
                                        <td>
                                            Run <code>/login</code> to
                                            re-authenticate.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Slow responses</td>
                                        <td>
                                            Use <code>/compact</code> to reduce
                                            context. Switch to Sonnet if on
                                            Opus.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rate limit reached</td>
                                        <td>
                                            Wait for reset (rolling window) or
                                            upgrade to Max plan.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extension not loading</td>
                                        <td>
                                            Update VS Code to 1.98.0+. Reinstall
                                            extension. Check{" "}
                                            <code>/doctor</code>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>MCP server not connecting</td>
                                        <td>
                                            Run <code>claude mcp list</code>.
                                            Use <code>--debug mcp</code> flag.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="co tip">
                            <i className="fas fa-lightbulb"></i>
                            <div>
                                Run <code>claude --doctor</code> or{" "}
                                <code>/doctor</code> in a session for automated
                                diagnostics.
                            </div>
                        </div>
                    </section>

                    {/* ── SUPABASE ── */}
                    <section className="sec" id="supabase">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-database"></i>
                            </div>
                            <div>
                                <h2>Claude Code + Supabase Integration</h2>
                                <p className="sub">
                                    Complete guide with Agents, Commands, and
                                    MCP
                                </p>
                            </div>
                        </div>
                        <p>
                            This integration installs{" "}
                            <strong>2 specialized agents</strong>,{" "}
                            <strong>8 database commands</strong>, and an{" "}
                            <strong>MCP server</strong> that turn Claude Code
                            into a full-featured Supabase development
                            environment.
                        </p>
                        <div className="co info">
                            <i className="fas fa-info-circle"></i>
                            <div>
                                All components install automatically to standard
                                Claude Code directories and are immediately
                                available. No restart needed.
                            </div>
                        </div>
                        <h3>What's Included</h3>
                        <div className="cgrid">
                            <div className="mc">
                                <div
                                    className="mc-i"
                                    style={{ color: "var(--purple)" }}
                                >
                                    <i className="fas fa-robot"></i>
                                </div>
                                <h4>2 Agents</h4>
                                <p>
                                    Schema Architect &amp; Realtime Optimizer —
                                    specialized agents for database design and
                                    WebSocket tuning
                                </p>
                            </div>
                            <div className="mc">
                                <div
                                    className="mc-i"
                                    style={{ color: "var(--blue)" }}
                                >
                                    <i className="fas fa-terminal"></i>
                                </div>
                                <h4>8 Commands</h4>
                                <p>
                                    Slash commands for schema sync, migrations,
                                    performance, security audits, backups,
                                    types, data explorer, and realtime
                                    monitoring
                                </p>
                            </div>
                            <div className="mc">
                                <div
                                    className="mc-i"
                                    style={{ color: "var(--green)" }}
                                >
                                    <i className="fas fa-plug"></i>
                                </div>
                                <h4>1 MCP Server</h4>
                                <p>
                                    Direct Supabase API integration through
                                    Model Context Protocol
                                </p>
                            </div>
                        </div>
                        <h3>Installation</h3>
                        <Tabs
                            groups={[
                                {
                                    id: "supa-all",
                                    label: "Full Stack Install",
                                    content: (
                                        <CB
                                            lang="Terminal"
                                            code={`npx claude-code-templates@latest \\\n  --command supabase-schema-sync,supabase-migration-assistant,supabase-performance-optimizer,supabase-security-audit,supabase-backup-manager,supabase-type-generator,supabase-data-explorer,supabase-realtime-monitor \\\n  --agent supabase-schema-architect,supabase-realtime-optimizer \\\n  --mcp supabase`}
                                        />
                                    ),
                                },
                                {
                                    id: "supa-ind",
                                    label: "Individual Components",
                                    content: (
                                        <CB
                                            lang="Terminal"
                                            code={`# Install a specific agent\nnpx claude-code-templates@latest --agent supabase-schema-architect\n\n# Install a specific command\nnpx claude-code-templates@latest --command supabase-schema-sync\n\n# Install the MCP server only\nnpx claude-code-templates@latest --mcp supabase`}
                                        />
                                    ),
                                },
                            ]}
                        />
                        <h3>MCP Server Configuration</h3>
                        <Tabs
                            groups={[
                                {
                                    id: "supa-mcp-remote",
                                    label: "Remote MCP (Recommended)",
                                    content: (
                                        <>
                                            <p>
                                                Supabase provides an official
                                                Remote MCP Server — the simplest
                                                way to connect.
                                            </p>
                                            <CB
                                                lang=".mcp.json"
                                                code={`{\n  "mcpServers": {\n    "supabase": {\n      "url": "https://mcp.supabase.com/mcp"\n    }\n  }\n}`}
                                            />
                                            <CB
                                                lang="Terminal"
                                                code={`# Add via CLI\nclaude mcp add --transport http supabase https://mcp.supabase.com/mcp\n\n# Authenticate (opens browser login)\n# Type /mcp in Claude Code and follow the login flow`}
                                            />
                                        </>
                                    ),
                                },
                                {
                                    id: "supa-mcp-tools",
                                    label: "Available Tools",
                                    content: (
                                        <div className="tw">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Category</th>
                                                        <th>Tools</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <strong>
                                                                Database
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <code>
                                                                list_tables
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                apply_migration
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                execute_sql
                                                            </code>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>
                                                                Edge Functions
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <code>
                                                                list_edge_functions
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                deploy_edge_function
                                                            </code>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>
                                                                Development
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <code>
                                                                get_project_url
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                get_publishable_keys
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                generate_typescript_types
                                                            </code>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>
                                                                Debugging
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <code>
                                                                get_logs
                                                            </code>
                                                            ,{" "}
                                                            <code>
                                                                get_advisors
                                                            </code>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>
                                                                Documentation
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <code>
                                                                search_docs
                                                            </code>{" "}
                                                            — search Supabase
                                                            docs from Claude
                                                            Code
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </section>

                    {/* ── TUTORIALS ── */}
                    <section className="sec" id="tutorials">
                        <div className="sec-head">
                            <div className="sec-ico o">
                                <i className="fas fa-play-circle"></i>
                            </div>
                            <div>
                                <h2>Tutorials & Videos</h2>
                                <p className="sub">
                                    Watch and learn from demos
                                </p>
                            </div>
                        </div>
                        <div className="vgrid">
                            {[
                                [
                                    "6eBSHbLKuN0",
                                    "Mastering Claude Code in 30 Minutes",
                                    "Official walkthrough of Claude Code's features and agentic workflows.",
                                ],
                                [
                                    "gv0WHhKelSE",
                                    "Claude Code Best Practices",
                                    "Tips for effective prompting and workflow optimization.",
                                ],
                                [
                                    "nZCy8E5jlok",
                                    "Taking Claude to the Next Level",
                                    "Advanced features, MCP integrations, and scaling.",
                                ],
                                [
                                    "dRsjO-88nBs",
                                    "Building Headless Automation",
                                    "Automate workflows with Claude Code's headless mode and SDK.",
                                ],
                            ].map(([id, title, desc]) => (
                                <div key={id} className="vcard">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${id}`}
                                        title={title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                    <div className="vcard-i">
                                        <h4>{title}</h4>
                                        <p>{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── RESOURCES ── */}
                    <section className="sec" id="resources">
                        <div className="sec-head">
                            <div className="sec-ico b">
                                <i className="fas fa-book"></i>
                            </div>
                            <div>
                                <h2>Documentation & Links</h2>
                                <p className="sub">
                                    Official docs and community resources
                                </p>
                            </div>
                        </div>
                        <h3>Official Documentation</h3>
                        <div className="rgrid">
                            {[
                                [
                                    "fas fa-compass",
                                    "https://code.claude.com/docs/en/overview",
                                    "Overview",
                                    "What Claude Code is and platforms",
                                ],
                                [
                                    "fas fa-rocket",
                                    "https://code.claude.com/docs/en/quickstart",
                                    "Quickstart",
                                    "Install and start in 5 minutes",
                                ],
                                [
                                    "fas fa-cogs",
                                    "https://code.claude.com/docs/en/how-claude-code-works",
                                    "How It Works",
                                    "The agentic loop and tools",
                                ],
                                [
                                    "fas fa-star",
                                    "https://code.claude.com/docs/en/best-practices",
                                    "Best Practices",
                                    "Prompting and optimization tips",
                                ],
                                [
                                    "fas fa-book",
                                    "https://code.claude.com/docs",
                                    "Full Docs",
                                    "Complete documentation",
                                ],
                            ].map(([ic, href, title, desc]) => (
                                <a
                                    key={title}
                                    href={href}
                                    target="_blank"
                                    className="rlink"
                                >
                                    <i className={ic}></i>
                                    <div>
                                        <h4>{title}</h4>
                                        <p>{desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <h3>Community</h3>
                        <div className="rgrid">
                            <a
                                href="https://github.com/anthropics/claude-code"
                                target="_blank"
                                className="rlink"
                            >
                                <i className="fab fa-github"></i>
                                <div>
                                    <h4>Claude Code GitHub</h4>
                                    <p>Source, issues, releases</p>
                                </div>
                            </a>
                            <a
                                href="https://www.anthropic.com/engineering/claude-code-best-practices"
                                target="_blank"
                                className="rlink"
                            >
                                <i className="fas fa-award"></i>
                                <div>
                                    <h4>Anthropic Engineering Blog</h4>
                                    <p>Official best practices post</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* ── FAQ ── */}
                    <section className="sec" id="faq">
                        <div className="sec-head">
                            <div className="sec-ico g">
                                <i className="fas fa-question-circle"></i>
                            </div>
                            <div>
                                <h2>FAQ</h2>
                                <p className="sub">
                                    Frequently asked questions
                                </p>
                            </div>
                        </div>
                        <FaqItem
                            q="What subscription do I need?"
                            a={
                                <>
                                    Claude Code requires a <strong>Pro</strong>{" "}
                                    ($20/mo), <strong>Max</strong> ($100 or
                                    $200/mo), <strong>Team</strong>, or{" "}
                                    <strong>Enterprise</strong> plan.
                                    Alternatively, use an Anthropic Console
                                    account with API credits. The free tier does
                                    not include Claude Code.
                                </>
                            }
                        />
                        <FaqItem
                            q="What if I hit usage limits?"
                            a={
                                <>
                                    Pro has a rolling usage window — wait and it
                                    resets. Max plans have much higher limits.
                                    Use <code>/compact</code> to save context
                                    tokens.
                                </>
                            }
                        />
                        <FaqItem
                            q="How do I integrate Claude Code with our repo?"
                            a={
                                <>
                                    Just <code>cd</code> into your project and
                                    run <code>claude</code>. It reads your
                                    codebase, respects <code>.gitignore</code>,
                                    and works within your existing git workflow.
                                    Add a <code>CLAUDE.md</code> for team
                                    standards.
                                </>
                            }
                        />
                        <FaqItem
                            q="How is this different from GitHub Copilot or ChatGPT?"
                            a={
                                <>
                                    Claude Code is <strong>agentic</strong> — it
                                    doesn't just suggest code, it reads your
                                    entire codebase, edits files, runs terminal
                                    commands, manages git, and iterates on
                                    failures. It operates in a loop (gather
                                    context → act → verify) rather than
                                    generating one-shot completions.
                                </>
                            }
                        />
                        <FaqItem
                            q="Is my code sent to Anthropic?"
                            a={
                                <>
                                    Yes, code context is sent to Anthropic's API
                                    for processing. Anthropic does{" "}
                                    <strong>not</strong> train on your data by
                                    default. Team and Enterprise plans have
                                    additional data privacy guarantees.
                                </>
                            }
                        />
                        <FaqItem
                            q="Can Claude run destructive commands?"
                            a={
                                <>
                                    Claude has a permission system. It asks
                                    approval before running commands that modify
                                    your system. It won't force-push, delete
                                    branches, or run <code>rm -rf</code> without
                                    explicit approval.
                                </>
                            }
                        />
                        <FaqItem
                            q="What languages and frameworks does it support?"
                            a="Any language and framework. Especially strong with JavaScript/TypeScript, Python, Rust, Go, Java, C/C++, Ruby, PHP. Understands React, Next.js, Django, FastAPI, Express, Rails, and more."
                        />
                        <FaqItem
                            q="How do I resume a previous session?"
                            a={
                                <>
                                    Run <code>claude -c</code> to continue the
                                    most recent session, or{" "}
                                    <code>claude -r</code> for an interactive
                                    picker. Name sessions with{" "}
                                    <code>/rename my-task</code> for easy
                                    resumption.
                                </>
                            }
                        />
                        <FaqItem
                            q="Can I use Claude Code in a monorepo?"
                            a="Yes. Claude handles monorepos well — it navigates packages, understands workspace configs (pnpm workspaces, Turborepo, Nx, Lerna), and works across multiple packages."
                        />
                        <FaqItem
                            q="What's the difference between subagents and agent teams?"
                            a={
                                <>
                                    <strong>Subagents</strong> work within a
                                    single session — like specialized helpers
                                    with their own context window.{" "}
                                    <strong>Agent teams</strong> coordinate
                                    across separate sessions with separate git
                                    worktrees, useful for large parallelizable
                                    tasks.
                                </>
                            }
                        />
                    </section>
                </main>
            </div>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <div>
                    Built with love by <strong>Closefuture</strong> team
                </div>
            </footer>
        </div>
    )
}
