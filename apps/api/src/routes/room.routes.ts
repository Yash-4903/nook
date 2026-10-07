import { Router } from "express";
import { generateRoomCode } from "../utils/room-code";
import { db } from "../db";
import { rooms } from "../db/schema";
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from "../utils/auth.middleware";
import { Request, Response } from "express";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    try {

        const code = generateRoomCode();

        const [room] = await db 
            .insert(rooms)
            .values({
                code,
                createdBy : req.user.userId
            })
            .returning();
        
        res.status(201).json({
            room
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create room"
        })
    }
});

router.get("/:code", authMiddleware, async (req: Request<{ code: string }>, res) => {
    try {
        const { code } = req.params;

        const [room] = await db
            .select()
            .from(rooms)
            .where(eq(rooms.code, code))
        
        if(!room) {
            return res.status(404).json({
                error: "Room not found",
            });
        }

        res.json({
            room
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to get room"
        })
    }
});

router.delete("/:code", authMiddleware, async (req: Request<{ code: string }>, res) => {
    try {
        const { code } = req.params;

        const [room] = await db
            .delete(rooms)
            .where(
                and(
                    (eq(rooms.code, code)),
                    (eq(rooms.createdBy, req.user.userId))
                )
            )
            .returning();
        
        if(!room) {
            return res.status(404).json({
                error: "Room not found"
            });
        }

        res.status(200).json({
            message: "Room deleted successfully"
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to delete room"
        })
    }
});

export default router;