const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
  ];


const categories = [
    {
        id : 1,
        name : 'Fútbol'
    },
    {
        id : 2,
        name : 'Lifestyle'
    },
    {
        id : 3,
        name : 'Básquet'
    },
    {
        id : 4,
        name : 'Crossfit'
    },
    {
        id : 5,
        name : 'Ojotas'
    }
]

const brands = [
    {
        id : 1,
        name : 'Jordan'
    },
    {
        id : 2,
        name : 'Nike'
    },
    {
        id : 3,
        name : 'Adidas'
    },
    {
        id : 4,
        name : 'New Balance'
    },
    {
        id : 5,
        name : 'Reebok'
    },
]


const products = [
    {
        id : '1',
        name :'Air Jordan 3 Palomino',
        description: 'Zapatillas Jordan 3 de cuero',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 400000,
        sizes : [8,9,10,10.5,12],
        images : 'https://nikearprod.vtexassets.com/arquivos/ids/730387/CT8532_102_A_PREM.jpg?v=638308266124900000'
    },
    {
        id : '2',
        name : 'Air Jordan 4 Retro Black Cat',
        description : 'Zapatillas Jordan 4 full black',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 400000,
        sizes : [7, 7.5, 10.5, 12],
        images: 'https://acdn.mitiendanube.com/stores/002/042/897/products/nnnnnnnnnnn-05a44c9105ae4dad4d17079078572659-1024-1024.jpg'        
    },
    {
        id : '3',
        name : 'Air Jordan 1 Retro High Chicago  ',
        description : 'Gema para los sneakerheads',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 350000,
        sizes : [6,7,8,10.5,12,12.5,13,15],
        images: 'https://acdn.mitiendanube.com/stores/001/160/313/products/f6c4b46e1-e4854ab78d79c1611016052167644378-640-0.jpeg'        
    },
    {
        id : '4',
        name : 'Air Jordan 4 Retro Kaws',
        description : 'Zapatillas Jordan 4 gamuza.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 500000,
        sizes : [10.5,11,13,15],
        images: 'https://m.media-amazon.com/images/I/81jEIh9fOwL._AC_SL1500_.jpg'        
    },
    {
        id : '5',
        name : 'Air Jordan Retro 11 High Concord',
        description : 'Air Jordan 11 blancas y negras.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 700000,
        sizes : [8.5,9,9.5,10,10.5],
        images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZy97JEaJLnzVNS0v34VT-M7VHwYZZ35SHw&s'        
    },
    {
        id : '6',
        name : 'Botines Nike Tiempo Legend 9',
        description : 'Botines nike para cancha 11',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 150000,
        sizes : [5,6,7,8,10.5,13],
        images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZy97JEaJLnzVNS0v34VT-M7VHwYZZ35SHw&s'        
    },
    {
        id : '7',
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines llamativos.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 10000000,
        sizes : [5,6,10.5,11],
        images : 'https://i8.amplience.net/i/jpl/jd_679576_a?v=1'    
    },
    {
        id : '8',
        name : 'Botines Adidas Predator Elites',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 799999,
        sizes : [5,6,10.5,11,11.5,12],
        images : 'https://dcdn.mitiendanube.com/stores/002/059/331/products/0fee1924-be44116a9720f46abe17064756655195-1024-1024.png'
    },
    {
        id : '9',
        name : 'Botines Adidas Nemezis 19.2',
        description : 'Botines de fútbol cancha 11.',
        brandname : brands[2].name,
        brandid : brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 9999999,
        sizes : [5,6,10.5,11,11.5,12],
        images : 'https://assets.adidas.com/images/w_600,f_auto,q_auto/c3d0d5604635498496a0aa5600ec659a_9366/Botines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard.jpg'
    },
    {
        id : '10',
        name : 'Botines Adidas Copa 20.3',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 9999999,
        sizes : [10.5,11,11.5,12],
        images : 'https://www.fullram.com.ar/files/products/5da07bd7e3f87-1357-4.jpg'    
    },
    {
        id : '11',
        name : 'Nike Kobe 8 Black History Moth',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 9999999,
        sizes : [9,9.5,10.5,11,11.5,12],
        images : 'https://kenlu.net/wp-content/uploads/2013/01/20130125-nike-bhm-kobe-8-9.jpg'
    },
    {
        id : '12',
        name : 'Nike Lebron 11 Low Sprite',
        description : 'Las mejores zapatillas de basket',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 1200000,
        sizes : [9,9.5,10.5,11,11.5,12],
        images : 'https://www.manelsanchez.pt/uploads/media/images/644534-400.manelsanchez__.4__1.jpg'
    },
    {
        id : '13',
        name : 'Nike Kevin Durant 7 What the KD',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 1200000,
        sizes : [9,9.5,10.5,11.5,12,13,15],
        images : 'https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_nike-kd-7-what-the-0.jpg'
    },
    {
        id : '14',
        name : 'Nike Basketball GT Run',
        description : 'Zapatillas de basket',
        brandname :  brands[3].name,
        brandid :  brands[3].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 300000,
        sizes : [6,7,10.5,11.5],
        images : 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/65818d029d6e2-6389105.jpeg'
    },
    {
        id : '15',
        name : 'Reebok Nano X',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 499999,
        sizes : [10.5,11.5],
        images : 'https://http2.mlstatic.com/D_NQ_NP_812720-MLA74998275545_032024-O.webp'
    },
    {
        id : '16',
        name : 'Reebok Nano X3 Gum Bottoms',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 325000,
        sizes : [10.5],
        images : 'https://http2.mlstatic.com/D_NQ_NP_683796-MLA71975907029_092023-O.webp'
    },
    {
        id : '17',
        name : 'Nike Metcon 9 AMP',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 750999,
        sizes : [7,8,9,10,11.5],
        images: 'https://nikearprod.vtexassets.com/arquivos/ids/786104/DZ2616_001_A_PREM.jpg?v=638336832038000000  '
    },
    {
        id : '18',
        name : 'Adidas Adilette Slides',
        description : 'Ojotas Adidas',
        brandname :  brands[2].name.toString,
        brandid :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 250000,
        sizes : [11,12,12.5,13],
        images : 'https://assets.adidas.com/images/w_600,f_auto,q_auto/7b337a3605064f9fba40ae9400f4c77b_9366/Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard.jpg'
    },
    {
        id : '19',
        name : 'Nike More Uptempo Slides',
        description : 'Slides Nike cómodas',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 250000,
        sizes : [6.5,7.5,9,10.5],
        images : 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0e588980-9009-4b57-a565-ee93f1d4aba3/air-more-uptempo-mens-slides-47mMCm.png'
    },
    {
        id : '20',
        name : 'Adidas Yeezy Slides',
        description : 'Ojotas caras de Kanye West',
        brandname :  brands[2].name,
        brandud :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 199999,
        sizes : [6.5,7.5,9,10.5],
        images : 'https://acdn.mitiendanube.com/stores/001/240/717/products/adidas_yeezyslide-21-52d8db48aa3de2510416928962763768-640-0.png'
    },
];

module.exports = {
    users,
    categories,
    brands,
    products,
};