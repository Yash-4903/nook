import { Router } from "express";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import {compare} from "bcrypt-ts";
import { hashPassword } from "../utils/passwordHash";
import jwt from 'jsonwebtoken'

const router = Router();

router.post("/signIn", async (req, res) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: " Emial and password are require"
            });
        };

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if(!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const passwordValid = await compare(
            password,
            user.passwordHash
        );

        if(!passwordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        const JWT_SECRET  = process.env.JWT_SECRET!;

        const token = jwt.sign(
            { id: user.id, emial: user.email},
            JWT_SECRET,
            { expiresIn: '1d'}
        )

        res.status(200).json({
            message: "Signed in successfully",
            user: {
                id: user.id,
                email: user.email   
            }, token
        })
    } catch (error) {
        console.error("Signip error:", error);
        res.status(500).json({
            error: "Failed to signin"
        })
    }
});

router.post("/signup", async (req, res) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: " Emial and password are require"
            });
        };

        const passwordHash = await hashPassword(password)

        await db
          .insert(users)
          .values({
            email: email,
            passwordHash,
        })

        return res.status(201).json({
            message: "Signup Successfully"
        })       
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            error: "Failed to signup"
        })
    }
});

export default router;