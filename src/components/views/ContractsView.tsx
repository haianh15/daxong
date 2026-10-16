import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Contract, LeaseConditionDraft } from '../../types';
import {
  FileText, Sliders, Edit3, Send, FileCheck, Calendar, RotateCcw,
  Sparkles, Layers, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { HDT01LeaseConditions } from './contracts/HDT01LeaseConditions';
import { HDT02DraftContract } from './contracts/HDT02DraftContract';
import { HDT03SendAndNegotiate } from './contracts/HDT03SendAndNegotiate';
import { HDT04ReceiveSignedContract } from './contracts/HDT04ReceiveSignedContract';
import { HDT05BatchSchedules } from './contracts/HDT05BatchSchedules';
import { HDT06RenewalContract } from './contracts/HDT06RenewalContract';
import { HDT07ActivateRenewal } from './contracts/HDT07ActivateRenewal';

export type ContractTabKey =
  | 'conditions'
  | 'draft'
  | 'negotiate'
  | 'sign'
  | 'schedules'
  | 'renewal'
  | 'activate';

export const ContractsView: React.FC = () => {
  const {
    contracts,
    leaseConditions,
    batchSchedules
  } = useApp();

  const [activeTab, setActiveTab] = useState<ContractTabKey>('conditions');

  // Inter-tab State
  const [selectedConditionForDraft, setSelectedConditionForDraft] = useState<LeaseConditionDraft | null>(null);
  const [selectedContractForSign, setSelectedContractForSign] = useState<Contract | null>(null);

  const handleNavigateToTab = (tab: ContractTabKey) => {
    setActiveTab(tab);
  };

  const handleSelectConditionForDraft = (condition: LeaseConditionDraft) => {
    setSelectedConditionForDraft(condition);
    setActiveTab('draft');
  };

  const handleSelectContractForSign = (contract: Contract) => {
    setSelectedContractForSign(contract);
    setActiveTab('sign');
  };

  // Counts for Badges
  const conditionsCount = leaseConditions.length;
  const draftOrNegotiatingCount = contracts.filter(c => c.status === 'Nháp' || c.status === 'Chờ khách ký').length;
  const renewalCount = contracts.filter(c => c.contractType === 'Hợp đồng nối tiếp').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              Quy trình 04: Quản lý Hợp đồng thuê (UC-HDT-01 → 07)
            </h1>
            <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              Chuẩn đặc tả ASIS-04
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Điều chỉnh điều kiện thuê, lập dự thảo hợp đồng, theo dõi ký, đối chiếu giấy tờ nhân thân trước ký (4.10), quản lý lịch đợt chung, hợp đồng nối tiếp kế thừa cọc gốc và kích hoạt hiệu lực.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto shrink-0 max-w-full">
          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'conditions'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>HDT-01: Điều kiện ({conditionsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('draft')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'draft'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>HDT-02: Lập dự thảo</span>
          </button>

          <button
            onClick={() => setActiveTab('negotiate')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'negotiate'
                ? 'bg-white text-amber-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>HDT-03: Gửi ký ({draftOrNegotiatingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('sign')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sign'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>HDT-04: Lưu bản ký (4.10)</span>
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'schedules'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>HDT-05: Lịch đợt ({batchSchedules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('renewal')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'renewal'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>HDT-06: Nối tiếp ({renewalCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('activate')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'activate'
                ? 'bg-white text-purple-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>HDT-07: Kích hoạt & Vòng đời</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'conditions' && (
          <HDT01LeaseConditions
            onNavigateToTab={handleNavigateToTab}
            onSelectConditionForDraft={handleSelectConditionForDraft}
          />
        )}

        {activeTab === 'draft' && (
          <HDT02DraftContract
            initialCondition={selectedConditionForDraft}
            onNavigateToTab={handleNavigateToTab}
            onContractCreated={() => {
              setSelectedConditionForDraft(null);
            }}
          />
        )}

        {activeTab === 'negotiate' && (
          <HDT03SendAndNegotiate
            onNavigateToTab={handleNavigateToTab}
            onSelectContractForSign={handleSelectContractForSign}
          />
        )}

        {activeTab === 'sign' && (
          <HDT04ReceiveSignedContract
            initialContract={selectedContractForSign}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === 'schedules' && (
          <HDT05BatchSchedules />
        )}

        {activeTab === 'renewal' && (
          <HDT06RenewalContract
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === 'activate' && (
          <HDT07ActivateRenewal />
        )}
      </div>
    </div>
  );
};
