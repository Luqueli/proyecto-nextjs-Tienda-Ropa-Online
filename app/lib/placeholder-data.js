const users = [
    {
      email: 'admin@admin.com',
      password: 'admin',
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
        name :'Air Jordan 3 Palomino',
        description: 'Zapatillas Jordan 3 de cuero',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719263958/q9sjkyidlf8zjfhxz6js.jpg',
        cloudinary_public_id : 'q9sjkyidlf8zjfhxz6js'
    },
    {
        name : 'Air Jordan 4 Retro Black Cat',
        description : 'Zapatillas Jordan 4 full black',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719279875/Jordan4BlackCat_xqrd6r.jpg',
        cloudinary_public_id : 'Jordan4BlackCat_xqrd6r'       
    },
    {
        name : 'Air Jordan 1 Retro High OG Latte',
        description : 'Gema para los sneakerheads',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 6000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193376/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP_j6zcih.webp',
        cloudinary_public_id : 'tenis-air-jordan-1-retro-high-og-latte-Dw2wdP_j6zcih' 
    },
    {
        name : 'Air Jordan 4 Retro Oxidized Green',
        description : 'Zapatillas Jordan 4 con colores metálicos.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719279967/tenis-air-jordan-4-retro-oxidized-green-PNtDJp_bj3wku.jpg',
        cloudinary_public_id : 'tenis-air-jordan-4-retro-oxidized-green-PNtDJp_bj3wku'    
    },
    {
        name : 'Air Jordan Retro 11 Retro Low',
        description : 'Air Jordan 11 blancas y negras.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 10000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193377/tenis-grandes-air-jordan-11-retro-low-black-varsity-royal-Fw0r7C_f7sbxm.webp',
        cloudinary_public_id : 'tenis-grandes-air-jordan-11-retro-low-black-varsity-royal-Fw0r7C_f7sbxm'
    },
    {
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines nike para cancha 11 color verde',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719280029/calzado-de-f%C3%BAtbol-fg-de-corte-high-superfly-9-elite-mercurial-dream-speed-sb8gJK_ccmw7v.webp',
        cloudinary_public_id : 'calzado-de-fútbol-fg-de-corte-high-superfly-9-elite-mercurial-dream-speed-sb8gJK_ccmw7v'    
    },
    {
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines llamativos.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193376/tacos-de-f%C3%BAtbol-de-corte-para-terreno-firme-de-corte-high-mercurial-superfly-9-elite-sb8gJK_ouilxn.webp',
        cloudinary_public_id : 'tacos-de-fútbol-de-corte-para-terreno-firme-de-corte-high-mercurial-superfly-9-elite-sb8gJK_ouilxn'      
    },
    {
        name : 'Botines Adidas Messi Freestyle',
        description : 'Botines de freestyle de Lionel Andrés Messi.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 22000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193377/zapatilla-adidas-f50-freestyle-24-messi-ftwr-whitegold-metblue-burst-1_yogrb5.webp',
        cloudinary_public_id : 'zapatilla-adidas-f50-freestyle-24-messi-ftwr-whitegold-metblue-burst-1_yogrb5'      
    },
    {
        name : 'Botines Adidas Nemezis 19.2',
        description : 'Botines de fútbol cancha 11.',
        brandname : brands[2].name,
        brandid : brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 35000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193375/Botines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard_b2xd3g.avif',
        cloudinary_public_id : 'Botines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard_b2xd3g'     
    },
    {
        name : 'Botines Adidas Copa 19.3',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 12000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719280175/5da07bd7e3f87-1357-4_za1itr.jpg',
        cloudinary_public_id : '5da07bd7e3f87-1357-4_za1itr'   
    },
    {
        name : 'Sabrina 2 Court Vision',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193376/sabrina-2-court-vision-basketball-shoes-NM2JwV_kh4cu0.webp',
        cloudinary_public_id : 'sabrina-2-court-vision-basketball-shoes-NM2JwV_kh4cu0'
    },
    {
        name : 'Nike Lebron XXII',
        description : 'Las mejores zapatillas de basket',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 30000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719280235/lebron-xxi-basketball-shoes-DjB9tK_rhlm2n.webp',
        cloudinary_public_id : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719280235/lebron-xxi-basketball-shoes-DjB9tK_rhlm2n.webp'
    },
    {
        name : 'Nike Kevin Durant 17 x Alchemist',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 29500,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193375/kd17-x-alchemist-basketball-shoes-8rnfrS_hsy6wf.webp',
        cloudinary_public_id : 'kd17-x-alchemist-basketball-shoes-8rnfrS_hsy6wf'
    },
    {
        name : 'New Balance 574',
        description : 'Zapatillas para todos los días',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 10000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193374/65818d029d6e2-6389105_ftdi2f.jpg',
        cloudinary_public_id : '65818d029d6e2-6389105_ftdi2f'
    },
    {
        name : 'Reebok Nano X',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 499999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_nose/v1719280289/reebokNanoX_zlayep.jpg',
        cloudinary_public_id : 'reebokNanoX_zlayep'
    },
    {
        name : 'Reebok Nano X3 Gum Bottoms',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 325000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_nose/v1719280331/reebok-nano-x-training-shoes-black---true-grey_164544_skxawc.jpg',
        cloudinary_public_id : 'reebok-nano-x-training-shoes-black---true-grey_164544_skxawc'
    },
    {
        name : 'Nike Metcon 9 AMP',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 75999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193376/DZ2616_001_A_PREM_ziemh4.jpg',
        cloudinary_public_id : 'DZ2616_001_A_PREM_ziemh4'
    },
    {
        name : 'Adidas Adilette Slides',
        description : 'Ojotas Adidas',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193376/Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard_ghckyi.avif',
        cloudinary_public_id : 'Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard_ghckyi'
    },
    {
        name : 'Nike More Uptempo Slides',
        description : 'Slides Nike cómodas',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193375/air-more-uptempo-mens-slides-47mMCm_g70tzv.webp',
        cloudinary_public_id : 'air-more-uptempo-mens-slides-47mMCm_g70tzv'
    },
    {
        name : 'Adidas Yeezy Slides',
        description : 'Ojotas caras de Kanye West',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[4].id,
        categoryname : categories[4].name,
        price : 19999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719193375/adidas_yeezyslide-21-52d8db48aa3de2510416928962763768-640-0_zodbjk.png',
        cloudinary_public_id : 'adidas_yeezyslide-21-52d8db48aa3de2510416928962763768-640-0_zodbjk'
    },
];

module.exports = {
    users,
    categories,
    brands,
    products,
};