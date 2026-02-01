import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  agentId?: string;
  timeLabel: string;
  tags: string[];
  status: 'INBOX' | 'ASSIGNED' | 'IN PROGRESS' | 'REVIEW' | 'DONE';
  borderColor?: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Explore SiteName Dashboard & Document All Features',
    description: 'Thoroughly explore the entire SiteName dashboard, documenting all available features and their functionalities.',
    timeLabel: '1 day ago',
    tags: ['research', 'documentation', 'sitename'],
    status: 'INBOX',
    borderColor: 'var(--accent-orange)'
  },
  {
    id: '2',
    title: 'Product Demo Video Script',
    description: 'Create full script for SiteName product demo video with...',
    timeLabel: '1 day ago',
    tags: ['video', 'content', 'demo'],
    status: 'ASSIGNED',
    agentId: 'Loki',
    borderColor: 'var(--accent-orange)'
  },
  {
    id: '3',
    title: 'SiteName vs Zendesk AI Comparison',
    description: 'Create detailed brief for Zendesk AI comparison page',
    timeLabel: '1 day ago',
    tags: ['competitor', 'seo', 'comparison'],
    status: 'IN PROGRESS',
    borderColor: 'var(--accent-blue)'
  },
  {
    id: '4',
    title: 'Shopify Blog Landing Page',
    description: 'Write copy for Shopify integration landing page - how SiteName help...',
    timeLabel: '1 day ago',
    tags: ['copy', 'landing-page', 'shopify'],
    status: 'REVIEW',
    borderColor: 'var(--text-main)'
  }
];

const columns = [
  { id: 'INBOX', label: 'INBOX', color: 'var(--text-subtle)', count: 11 },
  { id: 'ASSIGNED', label: 'ASSIGNED', color: 'var(--accent-orange)', count: 10 },
  { id: 'IN PROGRESS', label: 'IN PROGRESS', color: 'var(--accent-green)', count: 7 },
  { id: 'REVIEW', label: 'REVIEW', color: 'var(--text-main)', count: 5 },
  { id: 'DONE', label: 'DONE', color: 'var(--accent-green)', count: 0 },
];

const MissionQueue: React.FC = () => {
  return (
    <main className="[grid-area:main] bg-secondary flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-border">
        <div className="text-[11px] font-bold tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--accent-orange)] rounded-full" /> MISSION QUEUE
        </div>
        <div className="flex gap-2">
          <div className="text-[11px] font-semibold px-3 py-1 rounded bg-muted text-muted-foreground flex items-center gap-1.5">
            <span className="text-sm">📦</span> 1
          </div>
          <div className="text-[11px] font-semibold px-3 py-1 rounded bg-[#f0f0f0] text-[#999]">35 active</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-px bg-border overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="bg-secondary flex flex-col min-w-[250px]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f8f9fa] border-b border-border">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
              <span className="text-[10px] font-bold text-muted-foreground flex-1 uppercase tracking-tighter">{col.label}</span>
              <span className="text-[10px] text-muted-foreground bg-border px-1.5 py-0.25 rounded-full">{col.count}</span>
            </div>
            <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm flex flex-col gap-3 border border-border transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer" style={{ borderLeft: `4px solid ${task.borderColor || 'transparent'}` }}>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span className="text-base">↑</span>
                    <span className="tracking-widest">...</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{task.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{task.description}</p>
                  <div className="flex justify-between items-center mt-1">
                    {task.agentId && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">👤</span>
                        <span className="text-[11px] font-semibold text-foreground">{task.agentId}</span>
                      </div>
                    )}
                    <span className="text-[11px] text-muted-foreground">{task.timeLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {task.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MissionQueue;
