import { Router } from "express";
import { generateRoomCode } from "../utils/room-code";
import { db } from "../db";
import { rooms } from "../db/schema";
import { eq } from 'drizzle-orm';

const router = Router();

router.post("/", async (req, res) => {
    try {
        const code = generateRoomCode();

        const [room] = await db 
            .insert(rooms)
            .values({
                code,
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

router.get("/:code", async (req, res) => {
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

router.delete("/:code", async (req, res) => {
    try {
        const { code } = req.params;

        const [room] = await db
            .delete(rooms)
            .where(eq(rooms.code, code))
            .returning();
        
        if(!room) {
            return res.status(404).json({
                error: "Room not found"
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to delete room"
        })
    }
});

export default router;