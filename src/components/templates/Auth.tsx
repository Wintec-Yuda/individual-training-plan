type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <section className="bg-emerald-200 p-4 min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold mb-4">{title}</h1>
      {children}
    </section>
  );
};

export default AuthLayout;
