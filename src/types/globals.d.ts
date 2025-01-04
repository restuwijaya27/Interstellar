export {}

// Roles Type
export type Role = 'admin' | 'mahasiswa'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: 'admin' | 'mahasiswa';
    };
  }
}
