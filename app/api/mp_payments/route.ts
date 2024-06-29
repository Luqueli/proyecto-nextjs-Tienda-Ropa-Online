import type {NextRequest} from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";
import {createPurchase} from '@/app/lib/actions'

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest) {

  const body = await request.json().then((data) => data as {data: {id: string}});  
  console.log("body: ", body)
  const payment = new Payment(mercadopago)

  let items : any;
  let payerEmail : string;
  let totalAmount: number;

  const paymentInfo = await payment.get({id: body.data.id})
    .then(paymentInfo => {
      console.log(paymentInfo);
        if (paymentInfo) {
            items = paymentInfo.additional_info?.items;
            payerEmail = paymentInfo.payer?.email!
            totalAmount = paymentInfo.transaction_amount!
            console.log(paymentInfo.additional_info?.items);
            createPurchase(items,payerEmail,totalAmount);
        } 
        }).catch(error => {
            console.error(error);
    });

    
  return Response.json({success: true});
}
