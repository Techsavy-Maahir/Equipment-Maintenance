import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../env.js";
import { AppError } from "../errors.js";
import { prisma } from "../prisma.js";
const JWT_EXPIRY = "8h";
export const authService = {
    async login(email, password) {
        // Find user in database
        const user = await prisma.user.findUnique({
            where: { email },
        });
        // Hash comparison: always hash the password even if user doesn't exist
        // This prevents timing attacks (attackers can't tell if email exists)
        const dummy = await bcrypt.hash(password, 10);
        if (!user) {
            // User doesn't exist, but we pretend to check password
            await bcrypt.compare(password, dummy);
            throw new AppError(401, "Invalid credentials");
        }
        // Check if password matches (we don't store passwords, just for demo)
        // In real app, compare password with user.password_hash
        const isValid = await bcrypt.compare(password, user.password_hash ?? dummy);
        if (!user.password_hash || !isValid) {
            throw new AppError(401, "Invalid credentials");
        }
        // Create JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: JWT_EXPIRY });
        return { token, user };
    },
    async getCurrentUser(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        return user;
    },
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            return decoded;
        }
        catch {
            return null;
        }
    },
};
//# sourceMappingURL=auth.service.js.map