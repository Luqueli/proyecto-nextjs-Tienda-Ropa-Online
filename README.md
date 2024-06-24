

Proyecto IAW 2024: Carrito de compras con Next.js 14

La idea de este archivo Readme es explicar y expresar cómo fue el proceso que derivó en el resultado final de la aplicación web, contando las trabas y errores que tuvimos.

Al principio cometimos uno de los errores más grandes, que si bien tal vez no nos atrasó mucho, algo de tiempo nos consumió. Quisimos empezar haciendo una tienda de ropa en general, con muchos productos de distinta índole, cada uno con su categoría, talle, marca. 
Sin necesidad de decirlo, era algo demasiado ambicioso y ya nos costó desde el arranque generar las definiciones, las tablas de la base de datos y sus relaciones.
Por simplicidad, terminamos decidiendo achicar el scope de los productos a zapatillas.
No obstante, quisimos seguir abarcando la dinámica de los talles, marcas y categorías. La parte de realizar las ABM de las tablas no nos resultó tan complicado, pero la lógica de programación era bastante compleja por las relaciones que tenían.

Ejemplo: Si el admin quisiera eliminar una categoría (lo cual tiene el poder), y esta tuviera productos activos con su id en su entidad, no sería posible y sería totalmente necesario mostrar lo que estaba sucediendo, ya que no era un error de la aplicación en sí, sino de cómo se manejaba la lógica.

Después de esto, avanzamos de manera bastante constante porque nos dedicamos a realizar la parte del back end para después poder testear de alguna manera, mockkeando los datos con el archivo placeholder-data, la parte del front end (cabe aclarar que siempre trabajamos en features distintas)
Esto consistió en hacer las definiciones, el seeder, el archivo con los datos a cargar inicialmente y las React Server Actions

Al principio pudimos mantener el ritmo porque los fetch eran similares a los que habíamos practicado con la documentación del framework.

Acá de nuevo nos trabamos porque tuvimos que pelear bastante con la validación del lado del servidor, zod y los tipados de typescript. Una vez que pudimos hacer andar uno de los formularios, el resto salió solo.

La mutación de datos con las Actions no fueron tan difíciles porque en el tutorial habían bastantes ejemplos con las mutaciones que necestábamos. En otras cosas que usamos el tutorial de Next.js fueron:
Búsqueda y paginación
Optimizaciones usando el componente Image y utilizando fuentes en el archivo global.css
Manejo de errores tanto 404 como errores de la base de datos y que no haya un corte abrupto en la app
Ruteo
Estilos (usamos DaysiUI, TailwindCSS y v0 para crear el total de nuestras páginas).


Los últimos días fueron los más dificiles porque al integrar Cloudinary para cumplir con el requisito de la API de terceros, tuvimos que volver a re-definir muchas definiciones para que las cosas funcionaran correctamente. Más en concreto, tuvimos que agregar atributos para poder recuperar y eliminar las imágenes de la página de Cloudinary.

En cuanto a cómo fue nuestro trabajo más allá de lo técnico, nos juntamos basntate a codear juntos porque somos amigos, así que cada vez que podíamos resolver alguna trabita que nos frenaba bastante nos poníamos bastantes contentos, y eso creemos que nos llevó a no dejar las cosas por la mitad e intentar hacer un trabajo aceptable.

Algunas cosas que sabemos que nos quedaron pendientes pero que no pudimos resolver a tiempo fueron las siguientes:

Sabemos que tenemos errores por corregir, pero intentamos hacer todo lo que pudimos hasta el último momento. De antemano pedimos disculpas si algún punto crucial no fue cumplido pero Tomás, los últimos 5 días fue baja total por gripe, por lo que también nos atrasó, aunque consideramos que es algo que en la vida real sucede con total naturaleza
	
Sacar tipados any de algunas functions:
Un caso en concreto es cuando usamos la API de terceros Cloudinary. Al querer subir una imágen con la API, recibimos una promesa que en el reject pasa como parámetro un valor de tipo UploadApiErrorResponse, y en el resolve, un valor de tipo UploadApiResponse. Buscamos soluciones en internet, intentando definir un tipo propio en el archivo definitions.ts, pero no pudimos. Lo solucionamos declarando la respuesta e tipo any.

Al agregar un producto al carrito de compras se esta produciendo un efecto que causa que la pagina vuelva a su parte superior.
Ocultar el botón Cerrar Sesión cuando el admin no esta loggeado haciendo uso de hooks useSession/getSession.
Guardar las compras que los usuarios realizan por mercado pago en la base de datos controlando el flujo total de mercado pago para saber si una compra fue exitosa o no, solo por registro o para que el admin las pueda visualizar?
El footer quedó como parte estética y como parte del layout, ya que no implementamos nada.

