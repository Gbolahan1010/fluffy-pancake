import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({ name: "", position: "", level: "" });
  const params = useParams();
  const navigate = useNavigate();
  const isNew = !params.id;

  useEffect(() => {
    if (isNew) {
      setForm({ name: "", position: "", level: "" });
      return;
    }
    async function fetchData() {
      const response = await fetch(`/record/${params.id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        navigate("/");
        return;
      }
      const record = await response.json();
      setForm({ name: record.name, position: record.position, level: record.level });
    }
    fetchData();
  }, [params.id, isNew, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(isNew ? "/record" : `/record/${params.id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("The record could not be saved. Please try again.");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Create Employee" : "Update Employee"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-6 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input id="name" type="text" className="w-full border rounded-md p-2" placeholder="First Last"
            value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium mb-1">Position</label>
          <input id="position" type="text" className="w-full border rounded-md p-2" placeholder="Developer"
            value={form.position} onChange={(e) => updateForm({ position: e.target.value })} />
        </div>
        <fieldset>
          <legend className="block text-sm font-medium mb-1">Level</legend>
          <div className="flex gap-6">
            {["Intern", "Junior", "Senior"].map((lvl) => (
              <label key={lvl} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="level" value={lvl} checked={form.level === lvl}
                  onChange={(e) => updateForm({ level: e.target.value })} />
                {lvl}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="border rounded-md px-4 py-2 bg-green-700 text-white hover:bg-green-800">
          Save Employee Record
        </button>
      </form>
    </div>
  );
}
