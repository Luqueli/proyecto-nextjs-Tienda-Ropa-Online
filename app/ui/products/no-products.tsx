
export default function noProducts() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">No se han encontrado productos con esa búsqueda :(</h1>
        </div>
      </div>
    )
  }