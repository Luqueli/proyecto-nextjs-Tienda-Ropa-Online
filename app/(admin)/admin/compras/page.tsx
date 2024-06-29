import {Button} from '@/app/ui/button'
import React from "react"
import {fetchPurchases,fetchPurchasesDetails } from '@/app/lib/data'
import {Purchase, PurchaseDetail} from '@/app/lib/definitions'
import {PurchaseDetails} from '@/app/ui/admin/product-details'





export default async function Compras(){

    const purchases = await fetchPurchases();


    return(
        <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Lista de compras</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 font-medium">
              <th className="py-2 px-3 text-left w-[100px]">ID</th>
              <th className="py-2 px-3 text-left">Fecha de compra</th>
              <th className="py-2 px-3 text-left">Email del comprador</th>
              <th className="py-2 px-3 text-right">Costo total</th>
              <th className="py-2 px-3 text-left">Items</th>
              

            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
                <tr className="border-b" key={purchase.purchaseid}>
                  <td className="py-2 px-3">{purchase.purchaseid}</td>
                  <td className="py-2 px-3">{purchase.timestamp}</td>
                  <td className="py-2 px-3">{purchase.buyeremail}</td>
                  <td className="py-2 px-3 text-right">${purchase.totalcost}</td>
                  <td className="py-2 px-3"><PurchaseDetails id={purchase.purchaseid}/></td>
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    )
}