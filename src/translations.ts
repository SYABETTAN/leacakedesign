interface Translations {
  [key: string]: {
    [key: string]: any;
  };
}

export const translations: Translations = {
  en: {
    hero: {
      title: "Lea Cake Design",
      subtitle: "Creating unforgettable moments with custom-designed cakes",
      cta: "Order Your Dream Cake"
    },
    portfolio: {
      title: "Our Creations",
      followUs: "Follow us on Instagram @lea_abettan for more designs"
    },
    features: {
      customDesigns: "Custom Designs",
      customDesignsDesc: "Every cake is uniquely designed to match your vision",
      premiumQuality: "Premium Quality",
      premiumQualityDesc: "Made with the finest ingredients for exceptional taste",
      onTimeDelivery: "On-Time Delivery",
      onTimeDeliveryDesc: "Guaranteed delivery for your special occasion"
    },
    form: {
      title: "Order Your Custom Cake",
      dairyNotice: "Please note: All our cakes are Halavi (dairy)",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Delivery Date",
      delivery: {
        option: "Would you like delivery?",
        address: "Delivery Address",
        pickup: "Pick up in Bayt Vagan, Jerusalem"
      },
      size: {
        label: "Cake Size",
        bento: "Bento",
        regular: "Regular",
        twoTiers: "2 Tiers"
      },
      cakeFlavor: {
        label: "Cake Flavor",
        vanilla: "Vanilla",
        chocolate: "Chocolate"
      },
      buttercreamFlavor: {
        label: "Buttercream Flavor",
        placeholder: "Vanilla, Chocolate, or custom flavor"
      },
      description: "Design Description",
      inspiration: {
        label: "Inspiration Images",
        upload: "Click to upload inspiration images"
      },
      submit: "Submit Request",
      success: "Thank you for your request! We will contact you soon.",
      error: "There was an error sending your order. Please try again."
    },
    footer: {
      about: "Creating beautiful, custom-designed cakes for your special occasions.",
      followUs: "Follow Us",
      rights: "All rights reserved."
    }
  },
  fr: {
    hero: {
      title: "Lea Cake Design",
      subtitle: "Créons des moments inoubliables avec des gâteaux sur mesure",
      cta: "Commandez Votre Gâteau"
    },
    portfolio: {
      title: "Nos Créations",
      followUs: "Suivez-nous sur Instagram @lea_abettan pour plus de créations"
    },
    features: {
      customDesigns: "Designs Personnalisés",
      customDesignsDesc: "Chaque gâteau est conçu pour correspondre à votre vision",
      premiumQuality: "Qualité Premium",
      premiumQualityDesc: "Fabriqué avec les meilleurs ingrédients pour un goût exceptionnel",
      onTimeDelivery: "Livraison à Temps",
      onTimeDeliveryDesc: "Livraison garantie pour votre occasion spéciale"
    },
    form: {
      title: "Commandez Votre Gâteau Personnalisé",
      dairyNotice: "Note : Tous nos gâteaux sont Halavi (produits laitiers)",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      date: "Date de Livraison",
      delivery: {
        option: "Souhaitez-vous la livraison ?",
        address: "Adresse de livraison",
        pickup: "Récupération à Bayt Vagan, Jérusalem"
      },
      size: {
        label: "Taille du Gâteau",
        bento: "Bento",
        regular: "Regular",
        twoTiers: "2 Étages"
      },
      cakeFlavor: {
        label: "Parfum du Gâteau",
        vanilla: "Vanille",
        chocolate: "Chocolat"
      },
      buttercreamFlavor: {
        label: "Parfum de la Crème",
        placeholder: "Vanille, Chocolat, ou autre parfum"
      },
      description: "Description du Design",
      inspiration: {
        label: "Images d'Inspiration",
        upload: "Cliquez pour télécharger des images d'inspiration"
      },
      submit: "Envoyer la Demande",
      success: "Merci pour votre demande ! Nous vous contacterons bientôt.",
      error: "Une erreur est survenue lors de l'envoi de votre commande. Veuillez réessayer."
    },
    footer: {
      about: "Création de gâteaux personnalisés pour vos occasions spéciales.",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés."
    }
  }
};