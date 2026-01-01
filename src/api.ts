import axios from 'axios'
import type { randomUser } from './interface/random-user.interface'

export const fetchUsers = async ()=>{
    const res = await axios.get('https://randomuser.me/api/?results=50')
    return res.data.results.map((u:randomUser)=>({
        id:u.login.uuid,
        name:`${u.name.first} ${u.name.last}`,
        picture:u.picture.large
    }))
}