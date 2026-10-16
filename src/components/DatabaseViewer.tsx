import React, { useState } from 'react';
import { Database, Table, Key, ArrowRight, Download, Search, Check, Layers, HardDrive } from 'lucide-react';
import { DATABASE_TABLES, DatabaseTableDefinition } from '../data/marinaData';
import { PriceTag, PriceFontOption } from './PriceTag';

interface DatabaseViewerProps {
  priceFont?: PriceFontOption;
}

export const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ priceFont = 'cinzel' }) => {
  const [selectedTable, setSelectedTable] = useState<string>(DATABASE_TABLES[0].tableName);
  const [activeTab, setActiveTab] = useState<'data' | 'schema' | 'er-diagram'>('data');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentTable = DATABASE_TABLES.find(t => t.tableName === selectedTable) || DATABASE_TABLES[0];

  const filteredData = currentTable.sampleData.filter(row => {
    if (!searchQuery.trim()) return true;
    return Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const downloadSqlScript = () => {
    let script = `-- Marina Valérielle Database Schema & Seed Data\n-- Generated for Marina Valérielle Project 2026\n\n`;
    DATABASE_TABLES.forEach(tbl => {
      script += `-- Table: ${tbl.tableName} (${tbl.thaiDescription})\n`;
      script += `CREATE TABLE ${tbl.tableName} (\n`;
      const cols = tbl.columns.map(c => `  ${c.name} ${c.type}${c.isPrimary ? ' PRIMARY KEY' : ''}`);
      script += cols.join(',\n') + '\n);\n\n';
    });

    const blob = new Blob([script], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marina_valerielle_database_schema.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/95 rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Top Header */}
      <div className="bg-[#102D4F] text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B69A5A]">
            <Database className="w-4 h-4" />
            <span>Relational Database Management System</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-white mt-1">
            การออกแบบฐานข้อมูลเว็บไซต์ Marina Valérielle (9 ตาราง)
          </h3>
          <p className="text-xs text-sky-100/75 mt-0.5">
            โครงสร้างเชิงสัมพันธ์ (RDBMS) รองรับระบบบริหารการจอง ข้อมูลลูกค้า บริการเสริม และการชำระเงิน
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadSqlScript}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#B69A5A] hover:bg-[#a5894b] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ดาวน์โหลด .SQL</span>
          </button>
        </div>
      </div>

      {/* Table Selector Navigation */}
      <div className="flex overflow-x-auto bg-[#E9F1F6]/70 border-b border-slate-200 p-2 gap-1.5 scrollbar-none">
        {DATABASE_TABLES.map(tbl => {
          const isSelected = tbl.tableName === selectedTable;
          return (
            <button
              key={tbl.tableName}
              onClick={() => setSelectedTable(tbl.tableName)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#134C65] shadow-xs font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-[#134C65] hover:bg-white/50'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-[#487F86]" />
              <span>{tbl.tableName}</span>
              <span className="text-[10px] text-slate-400 font-sans">
                ({tbl.sampleData.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-bar: Search, Tabs, Table Description */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-[#102D4F] font-mono text-sm">{currentTable.tableName}</span>
          <span className="text-slate-500 ml-2">— {currentTable.thaiDescription}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('data')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'data' ? 'bg-[#134C65] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ข้อมูลตัวอย่าง (Data)
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'schema' ? 'bg-[#134C65] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              โครงสร้างฟิลด์ (Schema)
            </button>
          </div>

          {/* Search */}
          {activeTab === 'data' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหารายการ..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 rounded-lg border border-slate-200 text-xs bg-white w-36 sm:w-48 focus:outline-none focus:border-[#134C65]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 overflow-x-auto">
        {activeTab === 'data' ? (
          <div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50/80 text-slate-600 font-mono text-[11px]">
                  {currentTable.columns.map(col => (
                    <th key={col.name} className="py-2.5 px-3 font-semibold">
                      <div className="flex items-center gap-1">
                        {col.isPrimary && <span title="Primary Key"><Key className="w-3 h-3 text-amber-500" /></span>}
                        {col.isForeign && <span title="Foreign Key"><ArrowRight className="w-3 h-3 text-sky-500" /></span>}
                        <span>{col.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#E9F1F6]/30 transition-colors">
                      {currentTable.columns.map(col => {
                        const val = row[col.name];
                        // If column is a price, display with PriceTag!
                        const isPriceCol = col.name.includes('price') || col.name.includes('amount') || col.name.includes('subtotal');
                        return (
                          <td key={col.name} className="py-3 px-3 text-slate-700 font-medium">
                            {isPriceCol && typeof val === 'number' ? (
                              <PriceTag amount={val} size="sm" variant="navy" activeFont={priceFont} />
                            ) : (
                              <span>{String(val ?? '-')}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={currentTable.columns.length} className="text-center py-8 text-slate-400">
                      ไม่พบข้อมูลที่ตรงกับคำค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Schema Table */
          <div className="space-y-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-600 font-semibold text-[11px]">
                  <th className="py-2 px-3">Column Name</th>
                  <th className="py-2 px-3">Data Type</th>
                  <th className="py-2 px-3">Constraint</th>
                  <th className="py-2 px-3">คำอธิบายรายละเอียดฟิลด์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {currentTable.columns.map(col => (
                  <tr key={col.name} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-[#134C65]">{col.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{col.type}</td>
                    <td className="py-2.5 px-3">
                      {col.isPrimary && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm font-semibold">
                          <Key className="w-2.5 h-2.5" /> PRIMARY KEY
                        </span>
                      )}
                      {col.isForeign && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-sm font-semibold">
                          <ArrowRight className="w-2.5 h-2.5" /> FOREIGN KEY
                        </span>
                      )}
                      {!col.isPrimary && !col.isForeign && <span className="text-slate-400">-</span>}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-700">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Relational Notes */}
            <div className="bg-[#E9F1F6]/50 rounded-xl p-4 border border-slate-200/60 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-[#134C65] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>ความสัมพันธ์ในระบบ (Relational Integrity Rules):</span>
              </div>
              <p>• ลูกค้าหนึ่งคน (Customer 1) สามารถมีรายการจอง (Bookings N) ได้หลายครั้ง</p>
              <p>• แพ็กเกจท่องเที่ยวหนึ่งรายการ (Package 1) สามารถถูกจอง (Bookings N) ได้หลายรายการ</p>
              <p>• รายการจองหนึ่งรายการ (Booking 1) สามารถเลือกบริการเสริมได้หลายบริการผ่านตาราง `booking_services` (M:N)</p>
              <p>• มีระบบตรวจสอบช่วงเวลาการเดินเรือเพื่อป้องกันการจองเรือซ้ำซ้อน (Double Booking Prevention)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
