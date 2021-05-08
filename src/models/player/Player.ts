import { v4 } from "uuid";

export interface Player {
  id: typeof v4,
  username: string
}