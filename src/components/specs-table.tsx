export function SpecsTable({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-black/10">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value], i) => (
            <tr key={key} className={i % 2 === 0 ? "bg-paper" : "bg-paper-dim"}>
              <th scope="row" className="w-1/3 px-4 py-3 text-start font-medium text-on-light-muted">
                {key}
              </th>
              <td className="px-4 py-3 font-tech text-on-light">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
