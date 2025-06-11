import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import HomePage from './pages/HomePage';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function App() {
  return <HomePage />;
}

export default App;

//
// handy command for creating TypeScript types from Supabase tables:
//
// > pnpm dlx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/types/supabase.ts
//
