import React from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  level: 'LEAD' | 'INT' | 'SPC';
  status: 'WORKING' | 'IDLE';
  avatar: string;
}

const agents: Agent[] = [
  { id: '1', name: 'Manish', role: 'Founder', level: 'LEAD', status: 'WORKING', avatar: '👨' },
  { id: '2', name: 'Friday', role: 'Developer Agent', level: 'INT', status: 'WORKING', avatar: '⚙️' },
  { id: '3', name: 'Fury', role: 'Customer Rese...', level: 'SPC', status: 'WORKING', avatar: '🔬' },
  { id: '4', name: 'Jarvis', role: 'Squad Lead', level: 'LEAD', status: 'WORKING', avatar: '🤖' },
  { id: '5', name: 'Loki', role: 'Content Writer', level: 'SPC', status: 'WORKING', avatar: '✍️' },
  { id: '6', name: 'Pepper', role: 'Email Marketin...', level: 'INT', status: 'WORKING', avatar: '📧' },
  { id: '7', name: 'Quill', role: 'Social Media', level: 'INT', status: 'WORKING', avatar: '📱' },
  { id: '8', name: 'Shuri', role: 'Product Analyst', level: 'SPC', status: 'WORKING', avatar: '🔍' },
  { id: '9', name: 'Vision', role: 'SEO Analyst', level: 'SPC', status: 'WORKING', avatar: '🌐' },
  { id: '10', name: 'Wanda', role: 'Designer', level: 'SPC', status: 'WORKING', avatar: '🎨' },
  { id: '11', name: 'Wong', role: 'Documentation', level: 'SPC', status: 'WORKING', avatar: '📄' },
];

const AgentsSidebar: React.FC = () => {
  return (
    <aside className="[grid-area:left-sidebar] bg-white border-r border-border flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div className="text-[11px] font-bold tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full" /> AGENTS
        </div>
        <div className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-semibold">12</div>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-muted transition-colors group">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl border border-border group-hover:bg-white transition-colors">
              {agent.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                <span className={`text-[9px] font-bold px-1 py-0.5 rounded text-white ${agent.level === 'LEAD' ? 'bg-[var(--status-lead)]' :
                  agent.level === 'INT' ? 'bg-[var(--status-int)]' : 'bg-[var(--status-spc)]'
                  }`}>
                  {agent.level}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{agent.role}</div>
            </div>
            <div className="text-[9px] font-bold text-[var(--status-working)] flex items-center gap-1 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-[var(--status-working)] rounded-full" />
              {agent.status}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AgentsSidebar;
