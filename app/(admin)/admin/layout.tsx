import Topnav from '@/app/ui/admin/topnav'
import Navbar from '@/app/ui/admin/navbar'
import Footer from '@/app/ui/admin/footer'
import '@/app/ui/global.css';


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (

        <html lang="en">
          <body className="bg-customCream">
            <Navbar />
            <div className="w-[70%] min-h-[70vh] bg-customCream mx-auto p-4">
              <Topnav key="topnav" />
                  {children} 
            </div>
            <Footer />  
          </body>
        </html>


    );
  }
  