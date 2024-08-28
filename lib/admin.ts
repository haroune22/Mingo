import { auth } from "@clerk/nextjs"

const AllowedIds = [
    'user_2l13WxW9LoC4BZXB7Xg19fnFoPt'
]

export const isAdmin = async() => {
    const { userId } = await auth()

    if(!userId){
        return false
    }

    return AllowedIds.indexOf(userId) !== -1
}