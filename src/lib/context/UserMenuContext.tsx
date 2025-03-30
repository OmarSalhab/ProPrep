import { createContext, useState, useContext } from "react";

type UserMenuContextType = {
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
};

const UserMenuContext = createContext<UserMenuContextType | undefined>(undefined);

export function UserMenuProvider({ children }: { children: React.ReactNode }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <UserMenuContext.Provider value={{ showUserMenu, setShowUserMenu }}>
      {children}
    </UserMenuContext.Provider>
  );
}

export function useUserMenu() {
  const context = useContext(UserMenuContext);
  if (context === undefined) {
    throw new Error('useUserMenu must be used within a UserMenuProvider');
  }
  return context;
}