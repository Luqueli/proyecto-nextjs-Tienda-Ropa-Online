import {fetchPurchasesDetails} from '@/app/lib/data'

export  async function PurchaseDetails({id}: {id : string}){
    const details = await fetchPurchasesDetails(id);
    return(
        <>
            {details.map((detail) => (
                <ul key={detail.detaliid}>
                    <li className="py-2 px-3">{detail.productname} - <b>Cantidad </b>{detail.quantity}</li>
                </ul>
            )
                )
            }
        </>
    )
}