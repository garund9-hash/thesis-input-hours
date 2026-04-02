import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Clock, TrendingUp, Calendar, Trash2 } from 'lucide-react';

export default function Dashboard({ categories, entries, onDeleteEntry }) {
  const totalHours = useMemo(() => {
    return entries.reduce((acc, entry) => acc + Number(entry.hours), 0);
  }, [entries]);

  const categoryData = useMemo(() => {
    const map = {};
    entries.forEach(entry => {
      const cat = categories.find(c => c.id === entry.categoryId);
      if (cat) {
        if (!map[cat.id]) {
          map[cat.id] = { name: cat.name, value: 0, color: cat.color };
        }
        map[cat.id].value += Number(entry.hours);
      }
    });
    return Object.values(map).sort((a, b) => b.value - a.value);
  }, [entries, categories]);

  const activeCategory = categoryData.length > 0 ? categoryData[0] : null;

  return (
    <div className="dashboard">
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-card summary-card">
          <div className="summary-icon">
            <Clock size={24} />
          </div>
          <div className="summary-content">
            <h3>총 투입 시간</h3>
            <div className="value">{totalHours.toFixed(1)} <span style={{fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>시간</span></div>
          </div>
        </div>

        <div className="glass-card summary-card">
          <div className="summary-icon" style={{ background: 'var(--accent-hover)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="summary-content">
            <h3>가장 많이 투자한 카테고리</h3>
            <div className="value" style={{ fontSize: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeCategory ? activeCategory.name : '데이터 없음'}
            </div>
            {activeCategory && <div style={{fontSize:'0.875rem', color: 'var(--text-secondary)'}}>{activeCategory.value.toFixed(1)} 시간</div>}
          </div>
        </div>

        <div className="glass-card summary-card">
          <div className="summary-icon" style={{ background: 'var(--danger-color)' }}>
            <Calendar size={24} />
          </div>
          <div className="summary-content">
            <h3>기록 횟수</h3>
            <div className="value">{entries.length} <span style={{fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>건</span></div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>카테고리별 시간 배분</h2>
          {categoryData.length > 0 ? (
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} 시간`, '투입 시간']} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
               데이터가 없습니다. 먼저 시간을 기록해보세요.
             </div>
          )}
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>최근 기록</h2>
          {entries.length > 0 ? (
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '300px', pr: '10px' }}>
              <ul className="entry-list" style={{ marginTop: 0 }}>
                {entries.slice(0, 10).map(entry => {
                  const cat = categories.find(c => c.id === entry.categoryId);
                  return (
                    <li key={entry.id} className="entry-item" style={{ padding: '0.75rem 1rem' }}>
                      <div className="entry-info">
                        <div className="entry-title">{cat ? cat.name : '알 수 없음'} <span style={{fontWeight: 'normal', color: 'var(--text-secondary)'}}>({entry.hours}시간)</span></div>
                        <div className="entry-meta">
                          {entry.date}
                        </div>
                        {entry.memo && <div className="entry-memo">{entry.memo}</div>}
                      </div>
                      <button className="btn-danger" onClick={() => onDeleteEntry(entry.id)} style={{ padding: '0.4rem', border: 'none' }}>
                        <Trash2 size={18} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              기록이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
