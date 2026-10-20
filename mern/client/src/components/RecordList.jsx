import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch("/record/");
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      setRecords(await response.json());
    }
    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`/record/${id}`, { method: "DELETE" });
    setRecords(records.filter((r) => r._id !== id));
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">All Employees</h3>
      <table className="w-full border text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Position</th>
            <th className="p-3">Level</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id} className="border-t">
              <td className="p-3">{record.name}</td>
              <td className="p-3">{record.position}</td>
              <td className="p-3">{record.level}</td>
              <td className="p-3 flex gap-2">
                <Link to={`/edit/${record._id}`} className="border rounded-md px-3 py-1 hover:bg-slate-100">
                  Edit
                </Link>
                <button onClick={() => deleteRecord(record._id)} className="border rounded-md px-3 py-1 text-red-700 hover:bg-red-50">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
