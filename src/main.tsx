import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import { PublicRoute } from './contexts/PublicRoute';
import { ProtectedRoute } from './contexts/ProtectedRoute';
import Layout from './pages/patient/Layout';
import Patients from './pages/patient/Patients';
import ViewPatient from './pages/patient/ViewPatient';
import { useAuthStore } from './store/authStore';
import SuccessfulDeliveries from './pages/deliveries/DeliveriesLayout';
// ... other imports

const queryClient = new QueryClient();

// Notice how much cleaner this is now! No AuthProvider needed.
const RootApp = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<App />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Layout />}>
              <Route index element={<Patients />} />
              <Route path="patient/:patientId" element={<ViewPatient />} />
              <Route path="delivery" element={<SuccessfulDeliveries />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);