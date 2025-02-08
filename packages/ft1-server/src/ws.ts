import { Elysia, t } from "elysia";
import type { ElysiaWS } from "elysia/ws";

type PlayerType = {
    players: Set<ElysiaWS>;
    state: {
        player1: string | null;
        player2: string | null;
        turn: "player1" | "player2" | null;
    };
};

const rooms = new Map<string, PlayerType>();

const gameRoute = new Elysia().ws("/room", {
    query: t.Object({
        id: t.String(),
    }),
    body: t.Object({
        message: t.String(),
    }),
    open: (ws) => {
        const roomId = ws.data.query.id;
        // Validate roomId
        if (!roomId) {
            ws.send({ error: "Missing game id." });
            ws.close();
            return;
        }

        // Initialize game room if it doesn't exist
        if (!rooms.get(roomId)) {
            rooms.set(roomId, {
                players: new Set(),
                state: {
                    player1: null,
                    player2: null,
                    turn: null,
                },
            });
        }

        const room = rooms.get(roomId);
        // Reject if not room found
        if (!room) {
            ws.send({ error: "No room found" });
            ws.close();
            return;
        }

        // Reject if there are more than two players
        if (room.players.size >= 2) {
            ws.send({ error: "Room is full" });
            ws.close();
            return;
        }

        // Assign player slot
        const playerId = room.players.size === 0 ? "player1" : "player2";
        room.state[playerId] = playerId;
        room.players.add(ws);

        ws.subscribe(roomId);
        ws.publish(roomId, {
            message: `${playerId} has joined!`,
            state: room.state,
        });
        console.log(`${playerId} has joined!`);
    },
    message: (ws, message) => {
        console.log("message", message);
        const gameId = ws.data.query.id;
        console.log("gameId", gameId);
        ws.publish(gameId, message);
    },
    close: (ws, code, reason) => {
        const roomId = ws.data.query.id;
        // Validate roomId
        if (!roomId) {
            ws.send({ error: "Missing game id." });
            ws.close();
            return;
        }

        const room = rooms.get(roomId);
        // Reject if not room found
        if (!room) {
            ws.send({ error: "No room found" });
            ws.close();
            return;
        }

        ws.unsubscribe(roomId);
    },
});

export default gameRoute;
