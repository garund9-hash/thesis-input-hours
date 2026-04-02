import { useState, useEffect } from 'react';

const STORAGE_KEY = 'thesis_time_tracker_data';

const defaultCategories = [
  { id: 'cat-1', name: '연구배경 및 목적 작성', color: '#3b82f6' },
  { id: 'cat-2', name: '선행연구 분석', color: '#8b5cf6' },
  { id: 'cat-3', name: '연구모형 분석', color: '#f59e0b' },
  { id: 'cat-4', name: '결론 도출', color: '#10b981' },
];

export function useThesisData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      categories: defaultCategories,
      entries: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addCategory = (name, color) => {
    const newCategory = { id: `cat-${Date.now()}`, name, color };
    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const deleteCategory = (id) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
      // Also maybe delete entries associated? The user didn't request cascade delete, so we'll keep the entries as they might want the history.
    }));
  };

  const addTimeEntry = (entry) => {
    // entry: { date, categoryId, hours, memo }
    const newEntry = { ...entry, id: `entry-${Date.now()}` };
    setData(prev => ({
      ...prev,
      entries: [newEntry, ...prev.entries].sort((a, b) => new Date(b.date) - new Date(a.date))
    }));
  };

  const deleteTimeEntry = (id) => {
    setData(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== id)
    }));
  };

  return {
    categories: data.categories,
    entries: data.entries,
    addCategory,
    deleteCategory,
    addTimeEntry,
    deleteTimeEntry
  };
}
