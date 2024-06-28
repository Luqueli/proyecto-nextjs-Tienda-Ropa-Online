import {MercadoPagoConfig, Payment} from "mercadopago";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const client = new MercadoPagoConfig({accessToken : process.env.MP_ACCESS_TOKEN!});
    const body = await req.json().then((data) => data as {data : {id : string}});
    const secret = req.headers.get("x-signature");
    /*
    if (secret !== process.env.SECRET_PAYMENT_MP){
        return Response.json({success:  false});
    }
    */
    const payment= await new Payment(client).get({id :body.data.id});

    //console.log("body :", body);
    return Response.json({success: true});
}
