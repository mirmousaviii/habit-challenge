interface Props {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default LoginLayout;
