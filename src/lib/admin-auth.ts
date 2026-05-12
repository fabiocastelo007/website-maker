// Credenciais do administrador — altere aqui se necessário
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "dtiba2025";

const KEY = "dtiba_admin_session";

export function loginAdmin(user: string, pass: string): boolean {
  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(KEY, "1");
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}