import { create } from 'zustand';

interface JwtPayload {
  sub: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  hydrate: () => void;
}

function parseJwt(token: string): JwtPayload {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(json);
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userId: null,
  email: null,
  isAuthenticated: false,

  login: (accessToken, refreshToken) => {
    const payload = parseJwt(accessToken);
    localStorage.setItem(
      'tokens',
      JSON.stringify({ accessToken, refreshToken }),
    );
    set({
      accessToken,
      userId: payload.sub,
      email: payload.email,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('tokens');
    set({
      accessToken: null,
      userId: null,
      email: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const raw = localStorage.getItem('tokens');
    if (!raw) return;
    try {
      const { accessToken, refreshToken } = JSON.parse(raw);
      const payload = parseJwt(accessToken);
      const exp = (payload as JwtPayload & { exp?: number }).exp;
      if (exp && Date.now() / 1000 > exp) {
        localStorage.removeItem('tokens');
        return;
      }
      set({
        accessToken,
        userId: payload.sub,
        email: payload.email,
        isAuthenticated: true,
      });
      void refreshToken;
    } catch {
      localStorage.removeItem('tokens');
    }
  },
}));
