
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import PlansAndPricing from "./pages/PlansAndPricing";
import SampleDevotional from "./pages/SampleDevotional";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Books from "./pages/Books";
import MyLibrary from "./pages/MyLibrary";
import ReadingPlans from "./pages/ReadingPlans";
import Profile from "./pages/Profile";
import DevotionalReader from "./pages/DevotionalReader";
import DevotionalQuiz from "./pages/DevotionalQuiz";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsersManagement from "./pages/admin/UsersManagement";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Writer Pages
import WriterDashboard from "./pages/writer/Dashboard";
import WriterDevotionals from "./pages/writer/Devotionals";
import WriterReadingPlans from "./pages/writer/ReadingPlans";
import WriterQuizzes from "./pages/writer/Quizzes";
import WriterAnalytics from "./pages/writer/Analytics";
import WriterDevotionalPreview from "./pages/writer/DevotionalPreview";
import WriterQuizCreate from "./pages/writer/QuizCreate";
import WriterReadingPlanCreate from "./pages/writer/ReadingPlanCreate";
import WriterReadingPlanEdit from "./pages/writer/ReadingPlanEdit";
import WriterDevotionalEdit from "./pages/writer/DevotionalEdit";
import WriterDevotionalCreate from "./pages/writer/DevotionalCreate";
import WriterQuizEdit from "./pages/writer/QuizEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Páginas Públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/plans" element={<PlansAndPricing />} />
            <Route path="/sample" element={<SampleDevotional />} />
            
            {/* Páginas Autenticadas - Leitor */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/books" 
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-library" 
              element={
                <ProtectedRoute>
                  <MyLibrary />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reading-plans" 
              element={
                <ProtectedRoute>
                  <ReadingPlans />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/devotional/:id" 
              element={
                <ProtectedRoute>
                  <DevotionalReader />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/devotional/:id/quiz" 
              element={
                <ProtectedRoute>
                  <DevotionalQuiz />
                </ProtectedRoute>
              } 
            />
            
            {/* Páginas Administrativas */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminUsersManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Páginas de Escritor */}
            <Route 
              path="/writer" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/devotionals" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterDevotionals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/devotionals/new" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterDevotionalCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/devotionals/:id/edit" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterDevotionalEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/devotionals/:id/preview" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterDevotionalPreview />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/reading-plans" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterReadingPlans />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/reading-plans/new" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterReadingPlanCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/reading-plans/:id/edit" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterReadingPlanEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/quizzes" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterQuizzes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/quizzes/new" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterQuizCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/quizzes/:id/edit" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterQuizEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/writer/analytics" 
              element={
                <ProtectedRoute requiredRole="WRITER">
                  <WriterAnalytics />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
