import Login from '~/features/auth/components/Login';
import { type NextPageWithLayout } from '../_app';
import Layout from '~/features/ui/components/layouts/Normal';
import AuthLayout from '~/features/ui/components/layouts/AuthLayout';
import Toast from '~/features/ui/components/Toast';

const LoginPage: NextPageWithLayout = () => {
  return (
  <>
  <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
           
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="mb-8 text-center">

              <h1 className="mb-1 text-4xl font-semibold text-gray-700 dark:text-gray-200">ยินดีต้อนรับ</h1>
              <p className="text-gray-400">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
              </div>
              <Login></Login>
            </div>
          </main>
        </div>
        <Toast></Toast>
      </div>
    </div>
  </>
  );
};

// LoginPage.getLayout = Layout;

export default LoginPage;
