import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function TimeEntryForm({ categories, onAddEntry }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0].id : '');
  const [hours, setHours] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !categoryId || !hours || Number(hours) <= 0) return;
    
    onAddEntry({
      date,
      categoryId,
      hours: Number(hours),
      memo
    });
    
    // Reset form mostly but keep date and category active for quick entry
    setHours('');
    setMemo('');
    alert('저장되었습니다.');
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>시간 기록하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="date-input">날짜</label>
          <input 
            type="date" 
            id="date-input"
            className="form-input" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category-select">카테고리</label>
          <select 
            id="category-select"
            className="form-input" 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)} 
            required
            style={{ appearance: 'none' }}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="hours-input">투입 시간 (시간)</label>
          <input 
            type="number" 
            id="hours-input"
            className="form-input" 
            value={hours} 
            onChange={(e) => setHours(e.target.value)} 
            placeholder="예: 2.5"
            step="0.1"
            min="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="memo-input">메모 (선택사항)</label>
          <textarea 
            id="memo-input"
            className="form-input form-textarea" 
            value={memo} 
            onChange={(e) => setMemo(e.target.value)} 
            placeholder="오늘 어떤 작업을 했는지 간단히 적어보세요."
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '2rem' }}>
          <Save size={20} />
          기록 저장하기
        </button>
      </form>
    </div>
  );
}
