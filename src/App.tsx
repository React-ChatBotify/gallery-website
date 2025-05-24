import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GlobalModal from './components/GlobalModal/GlobalModal';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { AuthProvider } from './context/AuthContext';
import { GlobalModalProvider } from './context/GlobalModalContext';
import { useNotify } from './hooks/useNotify';
import i18n from './i18n';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginProcessPage from './pages/LoginProcess';
import PluginsPage from './pages/Plugins';
import ThemeBuilderPage from './pages/ThemeBuilder';
import ThemesPage from './pages/Themes';
import UserProfilePage from './pages/UserProfile';
import ProtectedRoute from './routes/ProtectedRoute';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

const App: React.FC = () => {
  const notify = useNotify();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const isDarkMode = localStorage.getItem('RCBG_IS_DARK_MODE');
    return isDarkMode === 'true';
  });

  useEffect(() => {
    i18n.loadNamespaces('components/globalmodal');
  }, []);

  useEffect(() => {
    const message = localStorage.getItem('logoutMessage');
    if (message) {
      setTimeout(() => {
        notify(message);
      }, 500);
      localStorage.removeItem('logoutMessage');
    }
  }, [notify]);

  const storedLanguage = localStorage.getItem('RCBG_SELECTED_LANGUAGE');
  if (storedLanguage) {
    i18n.changeLanguage(storedLanguage);
  } else {
    i18n.changeLanguage('en');
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('RCBG_IS_DARK_MODE', String(!prev));
      return !prev;
    });
  };

  // Define Navbar wrapper
  const NavbarWrapper = () => (
    <div>
      <NavigationBar toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );

  // Define Routes inside App component
  const routes = [
    {
      element: <LoginProcessPage />,
      path: '/login/process',
    },
    {
      children: [
        { element: <HomePage />, path: '/' },
        { element: <PluginsPage />, path: '/plugins' },
        { element: <ThemesPage />, path: '/themes' },
        { element: <ThemeBuilderPage />, path: '/theme-builder' },
        {
          element: <ProtectedRoute element={<UserProfilePage />} />,
          path: '/profile',
        },
      ],
      element: <NavbarWrapper />,
      errorElement: <ErrorPage />,
      path: '/',
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<div></div>}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalModalProvider>
              <CssBaseline />
              <RouterProvider router={router} />
              <GlobalModal />
            </GlobalModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
      {/* Toast */}
      <ToastContainer />
    </Suspense>
  );
};

export default App;
