import { useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, FileSpreadsheet, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/components/ui/Dropdown";
import { exportRowsToExcel, exportRowsToPDF } from "@/admin/lib/exportTable";

export interface AdminTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  /** Plain value used for Excel/PDF export. Columns without this (e.g. action columns) are skipped in exports. */
  exportValue?: (row: T) => string | number;
}

export function AdminTable<T>({
  columns,
  data,
  keyField,
  searchPlaceholder = "Search...",
  searchText,
  pageSize = 8,
  toolbar,
  emptyMessage = "No results found.",
  exportFileName = "export",
  exportTitle,
}: {
  columns: AdminTableColumn<T>[];
  data: T[];
  keyField: (row: T) => string;
  searchPlaceholder?: string;
  searchText?: (row: T) => string;
  pageSize?: number;
  toolbar?: ReactNode;
  emptyMessage?: string;
  exportFileName?: string;
  exportTitle?: string;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchText || !query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => searchText(row).toLowerCase().includes(q));
  }, [data, query, searchText]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageData = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  const exportColumns = columns.filter((c) => c.exportValue);

  function buildExportRows() {
    const headers = exportColumns.map((c) => c.header);
    const rows = filtered.map((row) => exportColumns.map((c) => c.exportValue!(row)));
    return { headers, rows };
  }

  function handleExportExcel() {
    const { headers, rows } = buildExportRows();
    void exportRowsToExcel(exportFileName, headers, rows);
  }

  function handleExportPDF() {
    const { headers, rows } = buildExportRows();
    void exportRowsToPDF(exportFileName, headers, rows, exportTitle);
  }

  return (
    <div className="dark:border-gray-700 dark:bg-gray-800 overflow-hidden rounded-2xl border border-gray-300 bg-white">
      <div className="dark:border-gray-700 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4">
        {searchText ? (
          <div className="relative w-full max-w-xs">
            <Search className="text-gray-tertiary absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="border-gray-tertiary/32 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 h-10 w-full rounded-full border pr-4 pl-10 text-sm focus:outline-0"
            />
          </div>
        ) : (
          <div />
        )}
        <div className="flex flex-wrap items-center gap-2">
          {toolbar}
          {exportColumns.length > 0 && (
            <Dropdown
              panelClassName="right-0 w-44"
              trigger={({ toggle }) => (
                <button
                  onClick={toggle}
                  className="border-gray-tertiary/32 text-gray-secondary hover:border-primary-main hover:text-primary-main dark:border-gray-700 dark:text-gray-300 flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium"
                >
                  <Download className="size-3.5" /> Export
                </button>
              )}
            >
              {(close) => (
                <div className="w-full py-1">
                  <button
                    onClick={() => {
                      handleExportExcel();
                      close();
                    }}
                    className="text-gray-secondary hover:bg-gray-100 flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm"
                  >
                    <FileSpreadsheet className="size-4 text-success-dark-main" /> Export Excel
                  </button>
                  <button
                    onClick={() => {
                      handleExportPDF();
                      close();
                    }}
                    className="text-gray-secondary hover:bg-gray-100 flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm"
                  >
                    <FileText className="size-4 text-error-dark" /> Export PDF
                  </button>
                </div>
              )}
            </Dropdown>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-gray-100 dark:bg-gray-900/60">
            <tr>
              {columns.map((col) => (
                <th key={col.header} className={cn("text-gray-secondary dark:text-gray-400 px-5 py-3 text-sm font-medium whitespace-nowrap", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-gray-tertiary px-5 py-10 text-center text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row) => (
                <tr key={keyField(row)} className="dark:border-gray-700 dark:hover:bg-gray-900/40 border-t border-gray-200 hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.header} className={cn("px-5 py-3.5 text-sm", col.className)}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > pageSize && (
        <div className="dark:border-gray-700 flex items-center justify-between border-t border-gray-200 px-5 py-3">
          <p className="text-gray-tertiary text-xs">
            Showing {(pageSafe - 1) * pageSize + 1}-{Math.min(pageSafe * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe === 1}
              className="text-gray-secondary dark:border-gray-700 dark:text-gray-300 flex size-8 items-center justify-center rounded-full border border-gray-300 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe === totalPages}
              className="text-gray-secondary dark:border-gray-700 dark:text-gray-300 flex size-8 items-center justify-center rounded-full border border-gray-300 disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
