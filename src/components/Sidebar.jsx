import { useLocation, NavLink } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  let role = 'guest';
  if (path.includes('/dashboard/admin')) role = 'admin';
  else if (path.includes('/dashboard/doctor')) role = 'doctor';
  else if (path.includes('/dashboard/patient')) role = 'patient';

  const links = {
    admin: [
      { name: 'Patients', to: '/dashboard/admin/patients' },
    ],
    doctor: [
      { name: 'Appointments', to: '/dashboard/doctor/appointments' },
      { name: 'Patients', to: '/dashboard/doctor/patients' },
    ],
    patient: [
      { name: 'Appointments', to: '/dashboard/patient/appointments' },
    ],
  };

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <ul className="space-y-2">
        {links[role]?.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}