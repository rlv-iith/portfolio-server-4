import { useRole } from '../context/RoleContext';

export default function Dashboard() {
  const { role, setRole } = useRole();
  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl">Dashboard for {role}</h1>
      <button onClick={() => setRole(null)} className="mt-4 underline">Back</button>
    </div>
  );
}