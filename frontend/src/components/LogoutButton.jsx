import { useAuthStore } from "@/store/useAuthStore";

export const LogoutButton = ({ children, className }) => {
  const { signOut } = useAuthStore();

  const onLogout = async () => {
    await signOut();
  };

  return (
    <button className={className} onClick={onLogout}>
      {children}
    </button>
  );
};
