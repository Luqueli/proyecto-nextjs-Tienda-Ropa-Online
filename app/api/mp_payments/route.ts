import type {NextRequest} from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";
import {createPurchase} from '@/app/lib/actions'

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest) {

  const body = await request.json().then((data) => data as {data: {id: string}});  
  console.log("body: ", body)
  const payment = new Payment(mercadopago)

  let paymentInfo;

  try {

    paymentInfo = await payment.get({ id: body.data.id });
  
  } catch (error) {
    console.error("Error fetching payment info:", error);
    return Response.json({ success: false, error: "Failed to fetch payment info" }, { status: 500 });
  }

  if (!paymentInfo) {

    console.error("Payment info not found");
    return Response.json({ success: false, error: "Payment info not found" }, { status: 404 });
  
  }

  const items = paymentInfo.additional_info?.items || [];
  const payerEmail = paymentInfo.payer?.email || "";
  const totalAmount = paymentInfo.transaction_amount || 0;

  console.log("Payment info:", paymentInfo);
  console.log("Items:", items);
  console.log("Payer email:", payerEmail);
  console.log("Total amount:", totalAmount);

  try {
    await createPurchase(items, payerEmail, totalAmount);
  } catch (error) {
    console.error("Error creating purchase:", error);
    return Response.json({ success: false, error: "Failed to create purchase" }, { status: 500 });
  }
  return Response.json({success: true});
}
