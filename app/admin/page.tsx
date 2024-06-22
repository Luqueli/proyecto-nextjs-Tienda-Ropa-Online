import { fetchOverviewCardsData } from "@/app/lib/data"
import { CardContent, Card } from "@/app/ui/admin/card"

export default async function Page(){

    const {
      numberOfUsers,
      numberOfProducts,
      numberOfCategories,
      numberOfBrands
    } = await fetchOverviewCardsData();

    return(
        <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-2 bg-customCream md:grid-cols-4 gap-4">
        <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Cantidad de productos</h3>
            <p className="text-4xl font-bold">{numberOfProducts}</p>
          </div>
          <PackageIcon/>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Cantidad de usuarios</h3>
            <p className="text-4xl font-bold">{numberOfUsers}</p>
          </div>
          <UsersIcon/>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Cantidad de categorías</h3>
            <p className="text-4xl font-bold">{numberOfCategories}</p>
          </div>
          <Grid3x3Icon/>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Cantidad de marcas</h3>
            <p className="text-4xl font-bold">{numberOfBrands}</p>
          </div>
          <ShoppingCartIcon />
        </CardContent>
      </Card>
    </div>
  
      
    )
}
function Grid3x3Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    )
  }
  
  
function PackageIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  }
  
  
function ShoppingCartIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    )
}
  
  
function UsersIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
)
}
  