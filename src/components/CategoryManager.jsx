import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const PRESET_COLORS = [
  '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', 
  '#ef4444', '#ec4899', '#14b8a6', '#f97316', '#6366f1'
];

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory }) {
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState(PRESET_COLORS[0]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    
    onAddCategory(newCatName.trim(), newCatColor);
    setNewCatName('');
    setNewCatColor(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>카테고리 관리</h2>
      
      <form onSubmit={handleAdd} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" htmlFor="cat-name">새 카테고리 이름</label>
            <input 
              id="cat-name"
              type="text" 
              className="form-input" 
              value={newCatName} 
              onChange={(e) => setNewCatName(e.target.value)} 
              placeholder="예: 참고문헌 정리"
              maxLength={30}
              required
            />
          </div>
          <div>
            <label className="form-label">색상</label>
            <input 
              type="color" 
              className="form-input" 
              value={newCatColor} 
              onChange={(e) => setNewCatColor(e.target.value)} 
              title="카테고리 색상 선택"
              style={{ padding: '0.2rem', height: '44px', width: '60px', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', width: 'auto' }}>
            <Plus size={18} /> 추가
          </button>
        </div>
      </form>

      <div>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          등록된 카테고리 ({categories.length})
        </h3>
        
        {categories.length === 0 ? (
           <p style={{ color: 'var(--text-secondary)' }}>등록된 카테고리가 없습니다.</p>
        ) : (
          <ul className="entry-list" style={{ marginTop: 0 }}>
            {categories.map(cat => (
              <li key={cat.id} className="entry-item" style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div 
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      backgroundColor: cat.color,
                      border: '1px solid var(--border-color)'
                    }} 
                  />
                  <span style={{ fontWeight: 500 }}>{cat.name}</span>
                </div>
                <button 
                  className="btn-danger" 
                  onClick={() => {
                    if(window.confirm(`'${cat.name}' 카테고리를 삭제하시겠습니까? (이 카테고리로 저장된 기존 시간 기록은 계속 유지되나, 차트 표시 시 알 수 없음으로 표시될 수 있습니다.)`)) {
                      onDeleteCategory(cat.id);
                    }
                  }}
                  style={{ padding: '0.4rem', border: 'none' }}
                  title="삭제"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
