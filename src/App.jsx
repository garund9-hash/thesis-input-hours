import React, { useState, useEffect } from 'react';
import { useThesisData } from './hooks/useThesisData';
import Dashboard from './components/Dashboard';
import TimeEntryForm from './components/TimeEntryForm';
import CategoryManager from './components/CategoryManager';
import { BookOpen, Moon, Sun } from 'lucide-react';

export default function App() {
  const { 
    categories, entries, 
    addCategory, deleteCategory, 
    addTimeEntry, deleteTimeEntry 
  } = useThesisData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('thesis_theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('thesis_theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('thesis_theme', 'light');
      }
      return next;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">
          <BookOpen />
          Thesis Time Tracker
        </h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main>
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드
          </button>
          <button 
            className={`tab-btn ${activeTab === 'entry' ? 'active' : ''}`}
            onClick={() => setActiveTab('entry')}
          >
            시간 기록
          </button>
          <button 
            className={`tab-btn ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            카테고리 관리
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'dashboard' && (
            <Dashboard 
              categories={categories} 
              entries={entries} 
              onDeleteEntry={deleteTimeEntry} 
            />
          )}

          {activeTab === 'entry' && (
            <TimeEntryForm 
              categories={categories} 
              onAddEntry={(entry) => {
                addTimeEntry(entry);
                setActiveTab('dashboard'); // Redirect after save
              }} 
            />
          )}

          {activeTab === 'category' && (
            <CategoryManager 
              categories={categories} 
              onAddCategory={addCategory} 
              onDeleteCategory={deleteCategory} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
