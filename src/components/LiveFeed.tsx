import React from 'react';

const filters = [
  { id: 'all', label: 'All', active: true },
  { id: 'tasks', label: 'Tasks', count: 21 },
  { id: 'comments', label: 'Comments', count: 172 },
  { id: 'decisions', label: 'Decisions', count: 0 },
  { id: 'docs', label: 'Docs', count: 0 },
  { id: 'status', label: 'Status', count: 2 },
];

const agentFilters = [
  { name: 'Jarvis', count: 17 },
  { name: 'Shuri', count: 20 },
  { name: 'Quill', count: 22 },
  { name: 'Wong', count: 18 },
  { name: 'Fury', count: 30 },
  { name: 'Loki', count: 26 },
  { name: 'Wanda', count: 9 },
  { name: 'Vision', count: 22 },
  { name: 'Manish', count: 5 },
  { name: 'Pepper', count: 12 },
  { name: 'Friday', count: 9 },
];

const feedItems = [
  { id: '1', agent: 'Quill', action: 'commented on', target: '"Write Customer Case Studies (Brent + Will)"', time: 'about 2 hours ago' },
  { id: '2', agent: 'Quill', action: 'commented on', target: '"Twitter Content Blitz - 10 Tweets This Week"', time: 'about 2 hours ago' },
  { id: '3', agent: 'Friday', action: 'commented on', target: '"Design Expansion Revenue Mechanics (SaaS Cheat Code)"', time: 'about 2 hours ago' },
  { id: '4', agent: 'Pepper', action: 'commented on', target: '"Design Expansion Revenue Mechanics (SaaS Cheat Code)"', time: 'about 2 hours ago' },
];

const LiveFeed: React.FC = () => {
  return (
    <aside className="[grid-area:right-sidebar] bg-white border-l border-border flex flex-col overflow-hidden">
      <div className="px-6 py-5 border-b border-border">
        <div className="text-[11px] font-bold tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full" /> LIVE FEED
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {filters.map(f => (
              <div key={f.id} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border cursor-pointer flex items-center gap-1 transition-colors ${f.active ? 'bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]' : 'bg-muted text-muted-foreground'
                }`}>
                {f.label} {f.count !== undefined && <span className="opacity-70 text-[9px]">{f.count}</span>}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[var(--accent-orange)] text-[var(--accent-orange)] bg-white cursor-pointer">
              All Agents
            </div>
            {agentFilters.map(a => (
              <div key={a.name} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border bg-white text-muted-foreground cursor-pointer flex items-center gap-1">
                {a.name} <span className="text-secondary-foreground/50 text-[9px]">{a.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {feedItems.map(item => (
            <div key={item.id} className="flex gap-3 p-3 bg-secondary border border-border rounded-lg">
              <div className="w-1.5 h-1.5 bg-[var(--accent-orange)] rounded-full mt-1.5 shrink-0" />
              <div className="text-xs leading-tight text-foreground">
                <span className="font-bold text-[var(--accent-orange)]">{item.agent}</span> {item.action} <span className="font-semibold">{item.target}</span>
                <div className="text-[10px] text-muted-foreground mt-1">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 flex items-center justify-center gap-2 text-[10px] font-bold text-[var(--accent-green)] bg-[#f8f9fa] border-t border-border">
        <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full" /> LIVE
      </div>
    </aside>
  );
};

export default LiveFeed;
