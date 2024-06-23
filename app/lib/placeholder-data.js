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
        //id : '1',
        name :'Air Jordan 3 Palomino',
        description: 'Zapatillas Jordan 3 de cuero',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        images : 'https://nikearprod.vtexassets.com/arquivos/ids/730387/CT8532_102_A_PREM.jpg?v=638308266124900000'
    },
    {
        //id : '2',
        name : 'Air Jordan 4 Retro Black Cat',
        description : 'Zapatillas Jordan 4 full black',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        images: 'https://acdn.mitiendanube.com/stores/002/042/897/products/nnnnnnnnnnn-05a44c9105ae4dad4d17079078572659-1024-1024.jpg'        
    },
    {
        id : '3',
        name : 'Air Jordan 1 Retro High OG Latte',
        description : 'Gema para los sneakerheads',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 6000,
        images: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bb5e235a-9096-44cd-af79-f8f09da6683c/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png'        
    },
    {
        //id : '4',
        name : 'Air Jordan 4 Retro Oxidized Green',
        description : 'Zapatillas Jordan 4 con colores metálicos.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        images: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c0604e24-0b81-43f7-9288-73b8274dda45/tenis-air-jordan-4-retro-oxidized-green-PNtDJp.png'        
    },
    {
        //id : '5',
        name : 'Air Jordan Retro 11 Retro Low',
        description : 'Air Jordan 11 blancas y negras.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 10000,
        images: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fe4d169d-75c0-4112-b36e-ab5d89207d88/tenis-grandes-air-jordan-11-retro-low-black-varsity-royal-Fw0r7C.png'        
    },
    {
        //id : '6',
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines nike para cancha 11 color verde',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        images: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fcd04af1-7e94-4e9b-8a06-3f6ce6066c32/calzado-de-f%C3%BAtbol-fg-de-corte-high-superfly-9-elite-mercurial-dream-speed-sb8gJK.png'        
    },
    {
        //id : '7',
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines llamativos.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        images : 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/18c38ffb-48ec-418a-8e19-cc5bcea9f1fe/tacos-de-f%C3%BAtbol-de-corte-para-terreno-firme-de-corte-high-mercurial-superfly-9-elite-sb8gJK.png'    
    },
    {
        //id : '8',
        name : 'Botines Adidas Messi Freestyle',
        description : 'Botines de freestyle de Lionel Andrés Messi.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 22000,
        images : 'https://www.futbolemotion.com/imagesarticulos/230087/grandes/zapatilla-adidas-f50-freestyle-24-messi-ftwr-whitegold-metblue-burst-1.webp'
    },
    {
        //id : '9',
        name : 'Botines Adidas Nemezis 19.2',
        description : 'Botines de fútbol cancha 11.',
        brandname : brands[2].name,
        brandid : brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 35000,
        images : 'https://assets.adidas.com/images/w_600,f_auto,q_auto/c3d0d5604635498496a0aa5600ec659a_9366/Botines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard.jpg'
    },
    {
        //id : '10',
        name : 'Botines Adidas Copa 20.3',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 12000,
        images : 'https://www.fullram.com.ar/files/products/5da07bd7e3f87-1357-4.jpg'    
    },
    {
        //id : '11',
        name : 'Sabrina 2 Court Vision',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 25000,
        images : 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7392cc18-3182-45ec-9188-cab38c1adad3/sabrina-2-court-vision-basketball-shoes-NM2JwV.png'
    },
    {
        //id : '12',
        name : 'Nike Lebron XXII',
        description : 'Las mejores zapatillas de basket',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 30000,
        images : 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90bda4f5-bd8d-4c09-8115-ffef07d28ac7/lebron-xxi-basketball-shoes-DjB9tK.png'
    },
    {
        //id : '13',
        name : 'Nike Kevin Durant 17 x Alchemist',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 29500,
        images : 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/57e94d3a-4145-427f-93b9-b3121b97739c/kd17-x-alchemist-basketball-shoes-8rnfrS.png'
    },
    {
        //id : '14',
        name : 'New Balance 574',
        description : 'Zapatillas para todos los días',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 10000,
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
        images : 'https://http2.mlstatic.com/D_NQ_NP_683796-MLA71975907029_092023-O.webp'
    },
    {
        //id : '17',
        name : 'Nike Metcon 9 AMP',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 75999,
        images: 'https://nikearprod.vtexassets.com/arquivos/ids/786104/DZ2616_001_A_PREM.jpg?v=638336832038000000  '
    },
    {
        //id : '18',
        name : 'Adidas Adilette Slides',
        description : 'Ojotas Adidas',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 25000,
        images : 'https://assets.adidas.com/images/w_600,f_auto,q_auto/7b337a3605064f9fba40ae9400f4c77b_9366/Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard.jpg'
    },
    {
        //id : '19',
        name : 'Nike More Uptempo Slides',
        description : 'Slides Nike cómodas',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 25000,
        images : 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0e588980-9009-4b57-a565-ee93f1d4aba3/air-more-uptempo-mens-slides-47mMCm.png'
    },
    {
        //id : '20',
        name : 'Adidas Yeezy Slides',
        description : 'Ojotas caras de Kanye West',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 19999,
        images : 'https://acdn.mitiendanube.com/stores/001/240/717/products/adidas_yeezyslide-21-52d8db48aa3de2510416928962763768-640-0.png'
    },
];

module.exports = {
    users,
    categories,
    brands,
    products,
};