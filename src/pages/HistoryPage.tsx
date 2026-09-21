import React, { useState } from 'react';
import {
  History,
  Search,
  Clock,
} from 'lucide-react';
import { GenerationRecord } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { HistoryCard } from '../components/cards/HistoryCard';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';

interface HistoryPageProps {
  onNavigate: (path: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedRecord, setSelectedRecord] = useState<GenerationRecord | null>(null);

  // Authentic state: initially empty, ready for future records
  const [records, setRecords] = useState<GenerationRecord[]>([]);

  const filterTabs = [
    { label: 'All Modalities', value: 'all' },
    { label: 'AI Text', value: 'text' },
    { label: 'AI Image', value: 'image' },
    { label: 'AI Voice', value: 'voice' },
    { label: 'AI Video', value: 'video' },
  ];

  const filteredRecords = records
    .filter((r) => (filterType === 'all' ? true : r.type === filterType))
    .filter((r) => r.prompt.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Record deleted from history', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display">
            Generation Archive
          </h1>
          <p className="text-[14px] text-[#5F6878] mt-0.5">
            View, inspect, and export all assets generated in your Toolora AI workspace
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5F6878]">
          <Clock className="w-4 h-4 text-[#FF5A36]" />
          <span>Total Records: <strong className="text-[#172033] font-mono">{records.length}</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Modality Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterType(tab.value)}
              className={`px-4 py-2 rounded-[10px] text-xs font-bold whitespace-nowrap transition-all cursor-pointer font-display ${
                filterType === tab.value
                  ? 'bg-[#172033] text-white shadow-xs'
                  : 'bg-white text-[#5F6878] hover:text-[#172033] border border-[#E5DED4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-[#8F97A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-[10px] bg-white border border-[#E5DED4] text-xs text-[#172033] placeholder:text-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36]/20 shadow-xs"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="px-3.5 py-2 rounded-[10px] bg-white border border-[#E5DED4] text-xs text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer shadow-xs font-semibold"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Content Archive List or Empty State */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <HistoryCard
              key={record.id}
              generation={record}
              onView={(rec) => setSelectedRecord(rec)}
              onDelete={handleDelete}
              onDownload={() => showToast('Downloading asset...', 'info')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<History className="w-8 h-8" />}
          title="No generation history found"
          description="Your generations will be archived here automatically once created in AI Text, Image, Voice, or Video."
          actionText="Create Your First Asset"
          onAction={() => onNavigate('/dashboard/text')}
          badge="Live Local Archive"
        />
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Generation Details: ${selectedRecord.type.toUpperCase()}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-[#5F6878] block mb-1">
                Prompt
              </span>
              <p className="p-3.5 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] text-[#172033] leading-relaxed">
                {selectedRecord.prompt}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4]">
                <span className="text-[#8F97A3] block mb-1">Status</span>
                <span className="font-bold text-[#238B6F]">{selectedRecord.status}</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4]">
                <span className="text-[#8F97A3] block mb-1">Credits Deducted</span>
                <span className="font-bold text-[#FF5A36]">{selectedRecord.creditsUsed} Credits</span>
              </div>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-[#5F6878] block mb-1">
                Generation Settings
              </span>
              <pre className="p-3.5 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] text-[#172033] font-mono text-[11px] overflow-x-auto">
                {JSON.stringify(selectedRecord.settings, null, 2)}
              </pre>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
