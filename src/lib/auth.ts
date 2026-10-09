import crypto from 'crypto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@struggleofstudent.org';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ss_super_secret_jwt_token_2026_xyz987';

export function validateAdminCredentials(email: string, pass: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD;
}

export function generateAdminToken(): string {
  const payload = JSON.stringify({
    role: 'admin',
    email: ADMIN_EMAIL,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  });
  const base64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return false;

    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(base64Payload).digest('base64url');
    if (signature !== expectedSignature) return false;

    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf-8'));
    if (payload.role !== 'admin' || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function isRequestAuthorized(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (verifyAdminToken(token)) return true;
  }

  // Also check cookie
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/ss_admin_token=([^;]+)/);
  if (match && match[1]) {
    if (verifyAdminToken(match[1])) return true;
  }

  return false;
}
