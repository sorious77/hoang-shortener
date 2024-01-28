import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {props.children}
    </main>
  );
};

export default Layout;
