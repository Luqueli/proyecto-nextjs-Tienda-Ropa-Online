'use server'
import { NextRequest } from "next/server";
import {MercadoPagoConfig,Payment} from "mercadopago";

export async function POST(req: NextRequest) {
    const client = new MercadoPagoConfig({accessToken : process.env.MP_ACCESS_TOKEN!});

   try{
    const body = await req.json().then((data) => data as {data : {id : string}});
    const secret = req.headers.get("x-signature");
        
    if (secret !== process.env.SECRET_PAYMENT_MP){
        return Response.json({success:  false});
    }
    const payment= await new Payment(client).get({id :body.data.id});
    console.log("payment: ", payment)
    } catch (error){
        return {
            message: 'Error: failed to get payment info.',
        };

    }


    return Response.json({success: true});
}