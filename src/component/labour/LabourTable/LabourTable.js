// Table: columns aur rows page se aate hain, cell ka design page ki render function banati hai
// columns: [{ key, label, render? }]  rows: [{ id, ... }]
const LabourTable = ({ columns, rows, emptyText = "Nothing to show." }) => (
  <div className="overflow-x-auto rounded-xl border border-[#D9E3E9] bg-white shadow-sm">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead className="bg-[#F4F4F2] text-xs text-[#565553]">
        <tr>
          {columns.map(({ key, label }) => (
            <th key={key} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
              {label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-[#D9E3E9] text-[#202124]">
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-4 py-10 text-center text-[#565553]">
              {emptyText}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              {columns.map(({ key, render }) => (
                <td key={key} className="whitespace-nowrap px-4 py-3">
                  {render ? render(row) : row[key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default LabourTable;