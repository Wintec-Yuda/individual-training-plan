import AuthLayout from "../templates/Auth";
import LoginForm from "../fragments/form/Login";

const LoginView = () => {
  return (
    <AuthLayout title="Individual Training Plan">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginView;
