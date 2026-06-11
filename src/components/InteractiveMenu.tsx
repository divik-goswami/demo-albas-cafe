"use client";

import { motion, Variants } from "framer-motion";

interface MenuItem {
  price: string;
  title: string;
  info: string;
  image: string;
}

export default function InteractiveMenu() {
  const menuItems: MenuItem[] = [
    {
      price: "₹380",
      title: "Signature Espresso",
      info: "Double shot of our house blend. Intensely sweet with notes of red berries and dark chocolate crema.",
      image: "/drinks/signature_espresso.png",
    },
    {
      price: "₹420",
      title: "Rose Cortado",
      info: "Equal parts double espresso and steamed micro-foam, infused with a drop of organic rose water.",
      image: "/drinks/rose_cortado.png",
    },
    {
      price: "₹460",
      title: "Pistachio Flat White",
      info: "Velvety micro-foamed oat milk poured over a double shot, sweetened with house-made pistachio butter.",
      image: "/drinks/pistachio_flat_white.png",
    },
    {
      price: "₹540",
      title: "Ethiopia V60",
      info: "Single-origin coffee brewed slowly via V60. Clean tea-like body with vibrant notes of bergamot and jasmine.",
      image: "/drinks/ethiopia_v60.png",
    },
    {
      price: "₹480",
      title: "Blossom Latte",
      info: "A warm, soothing latte infused with cherry blossom flavor, finished with delicate floral milk art.",
      image: "/drinks/blossom_latte.png",
    },
    {
      price: "₹500",
      title: "Hibiscus Cold Brew",
      info: "Our slow-steeped cold brew layered with sweet hibiscus infusion and topped with vanilla cold foam.",
      image: "/drinks/hibiscus_cold_brew.png",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <section className="menu-section" id="menu">
      <div className="menu-header">
        <span className="menu-tag">The Experience</span>
        <h2 className="menu-title">Our Brew Selection</h2>
        <p className="menu-description">
          Each cup is crafted with precision, balancing extraction profiles to bring out the unique terroir of our beans.
        </p>
      </div>

      <motion.div
        className="menu-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {menuItems.map((item, i) => {
          const xOffset = i % 2 === 0 ? -45 : 45;
          return (
            <motion.div 
              key={item.title} 
              className="menu-card" 
              variants={{
                hidden: { opacity: 0, x: xOffset, y: 20 },
                show: { 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
            >
              <div className="menu-card-image-wrapper">
                <img src={item.image} alt={item.title} className="menu-card-image" loading="lazy" decoding="async" />
              </div>
              <div className="menu-card-details">
                <h3 className="menu-card-title">{item.title}</h3>
                <span className="menu-card-price">{item.price}</span>
                <p className="menu-card-info">{item.info}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
