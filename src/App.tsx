import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DailyInput from './pages/DailyInput';
import Insights from './pages/Insights';
import Community from './pages/Community';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderPage = () => {
    const pages = {
      Dashboard: <Dashboard />,
      'Daily Input': <DailyInput />,
      Insights: <Insights />,
      Community: <Community />,
      Settings: <Settings />,
    };

    return (
      <div className="page-transition">
        {pages[currentPage as keyof typeof pages]}
      </div>
    );
  };

  return (
    <Layout onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;