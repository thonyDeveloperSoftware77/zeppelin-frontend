import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <SignIn />
    </div>
  );
};

export default SignInPage;
