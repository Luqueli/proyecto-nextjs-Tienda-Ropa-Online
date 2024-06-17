import Topnav from '@/components/ui/topnav'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-[70%] min-h-[70vh] bg-customCream mx-auto p-4">
                <Topnav key="topnav"/>
                  {children} 
        </div>

    );
  }
  