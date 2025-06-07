import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import ForgotPassword from "../../components/auth/ForgotPassword";


export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | Echo Media - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for Echo Media - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    </>
  );
}
