import { dummyUsers, dummyProperties, dummyLeads } from '../dummyData';

function Users() {
  const users = dummyUsers;
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b">
                <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.isVerified ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Properties() {
  const properties = dummyProperties;
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Properties</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded shadow p-4">
            <div className="font-semibold text-primary">{p.title}</div>
            <div className="text-gold font-bold text-sm">{p.subCategory}</div>
            <div className="text-gray-600 text-sm">{p.location?.city}, {p.location?.state}</div>
            <div className="text-dark font-bold">₦{p.price?.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{p.type?.toUpperCase()} | {p.category}</div>
            <a href={`/property/${p._id}`} className="text-accent hover:underline text-sm">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leads() {
  const leads = dummyLeads;
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Leads</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr><th>Property</th><th>Buyer</th><th>Contact</th><th>Message</th></tr></thead>
          <tbody>
            {leads.map(l => (
              <tr key={l._id} className="border-b">
                <td>{l.propertyId?.title}</td>
                <td>{l.buyerName}</td>
                <td>{l.buyerEmail} <br />{l.buyerPhone}</td>
                <td>{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings() {
  return <div><h3 className="text-xl font-bold mb-4">Settings</h3><div className="text-gray-500">(Settings coming soon...)</div></div>;
}

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="mb-4 space-x-4">
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/properties">Properties</Link>
        <Link to="/admin/leads">Leads</Link>
        <Link to="/admin/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="properties" element={<Properties />} />
        <Route path="leads" element={<Leads />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
