// Credenciais do administrador — altere aqui se necessário
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "dtiba2025";

const KEY = "dtiba_admin_session";
const PASS_KEY = "dtiba_admin_pass";

export function loginAdmin(user: string, pass: string): boolean {
  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(KEY, "1");
      sessionStorage.setItem(PASS_KEY, pass);
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem(PASS_KEY);
  }
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}

export function getAdminPass(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PASS_KEY);
}