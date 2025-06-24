interface FilterData {
    saleType: 'For Sale' | 'For Rent' | 'For Buy';
    city: string;
    country: string;
    category: string;
    priceRange: [number, number];
    bedrooms: number;
    bathrooms: number;
    facilities: string[];
  }


  export {FilterData}