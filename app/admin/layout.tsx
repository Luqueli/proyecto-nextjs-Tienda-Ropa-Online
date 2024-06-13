import Topnav from '@/components/ui/topnav'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-[70%] min-h-[70vh] bg-white mx-auto p-4">
                <Topnav />
                  {children} 
        </div>

    );
  }
  