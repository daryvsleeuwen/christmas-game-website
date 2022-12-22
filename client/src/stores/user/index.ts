import { writable, type Writable } from "svelte/store";

type GameSettings = {
    roundDuration: number;
}

type User = {
    accessToken: string
    email: string;
    gameSettings: GameSettings;
}

export const user: Writable<User | null> = writable(null)