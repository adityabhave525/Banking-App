"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions)
    
    //token should ideally come from a bank but we are stimulating this feature,
    //it should be an axios request otherwise if a real bank api was used

    const token = Math.random().toString() 

    const userId = session.user.id
    if(!userId){
        return{
            msg: "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token
        }
    })

    return {
        msg: "On Ramp Transactions added"
    }
}