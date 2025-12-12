// Example: How to protect routes in App.jsx
// This is a reference file - you'll need to apply these changes to your actual App.jsx

import ProtectedRoute from './componts/ProtectedRoute';

// Example 1: Protect a route for all authenticated users
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

// Example 2: Protect a route for specific role (Admin only)
<Route 
  path="/admin-dashboard" 
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboared />
    </ProtectedRoute>
  } 
/>

// Example 3: Protect a route for Manager only
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute allowedRoles={['manager']}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

// Example 4: Protect a route for Technician only
<Route 
  path="/technician-dashboard" 
  element={
    <ProtectedRoute allowedRoles={['technician']}>
      <TechnicianDashbored />
    </ProtectedRoute>
  } 
/>

// Example 5: Protect a route for LSP only
<Route 
  path="/lsp-dashboard" 
  element={
    <ProtectedRoute allowedRoles={['lsp']}>
      <LspDashboard />
    </ProtectedRoute>
  } 
/>

// Example 6: Protect a route for multiple roles
<Route 
  path="/report" 
  element={
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <Report />
    </ProtectedRoute>
  } 
/>

// Public routes (no protection needed)
<Route path="/" element={<Login />} />
<Route path="/forgot-password" element={<Forgot />} />
<Route path="/reset-password" element={<Reset />} />

// ============================================
// FULL EXAMPLE OF PROTECTED ROUTES IN APP.JSX
// ============================================

function App() {
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/reset-password" element={<Reset />} />
                <Route path="/add-enquiry" element={<EnquiryForm />} />
                <Route path="/pay" element={<PayPage />} />

                {/* Admin Routes */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboared />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/master/settings"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <MasterSetting />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-inspection"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminInspection />
                        </ProtectedRoute>
                    }
                />
                {/* Add more admin routes... */}

                {/* Manager Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['manager']}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute allowedRoles={['manager']}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change/passwored"
                    element={
                        <ProtectedRoute>
                            <ChangePasswored />
                        </ProtectedRoute>
                    }
                />
                {/* Add more manager routes... */}

                {/* Technician Routes */}
                <Route
                    path="/technician-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['technician']}>
                            <TechnicianDashbored />
                        </ProtectedRoute>
                    }
                />
                {/* Add more technician routes... */}

                {/* LSP Routes */}
                <Route
                    path="/lsp-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['lsp']}>
                            <LspDashboard />
                        </ProtectedRoute>
                    }
                />
                {/* Add more LSP routes... */}
            </Routes>
        </>
    );
}
