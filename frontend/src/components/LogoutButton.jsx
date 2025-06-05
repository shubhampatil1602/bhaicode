import { useAuthStore } from "@/store/useAuthStore";

export const LogoutButton = ({ children }) => {
  const { signOut } = useAuthStore();

  const onLogout = async () => {
    await signOut();
  };

  return <button onClick={onLogout}>{children}</button>;
};
