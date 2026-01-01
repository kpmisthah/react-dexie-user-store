import Dexie, {type Table} from "dexie"
import type { User } from "./interface/user.interface"

class AppDB extends Dexie {
    users!:Table<User>
    constructor(){
        super("RandomUserDB")
        this.version(1).stores({
            users:"id"
        })
    }
}

export const db = new AppDB()
