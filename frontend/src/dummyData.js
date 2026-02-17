// Dummy data for ABUHAY Agency demo
export const dummyProperties = [{
        _id: '1',
        title: 'Luxury 5 Bedroom Duplex',
        description: 'A stunning duplex in Lekki with modern amenities and a swimming pool.',
        price: 120000000,
        type: 'sale',
        category: 'house',
        subCategory: 'Duplex',
        location: { state: 'Lagos', city: 'Lekki', area: 'Ikate' },
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80'
        ],
        sellerId: 'u1',
        isVerified: true,
        isFeatured: true,
        views: 45,
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: 'Affordable 2 Bedroom Flat',
        description: 'Perfect for young families, close to schools and shopping.',
        price: 35000000,
        type: 'sale',
        category: 'house',
        subCategory: 'Flat',
        location: { state: 'Abuja', city: 'Gwarinpa', area: '' },
        images: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'
        ],
        sellerId: 'u2',
        isVerified: false,
        isFeatured: false,
        views: 12,
        createdAt: new Date().toISOString()
    },
    {
        _id: '3',
        title: 'Prime Land for Sale',
        description: '600sqm dry land, perfect for residential development.',
        price: 18000000,
        type: 'sale',
        category: 'land',
        subCategory: 'Land',
        location: { state: 'Ogun', city: 'Abeokuta', area: 'Adigbe' },
        images: [
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
        ],
        sellerId: 'u3',
        isVerified: true,
        isFeatured: false,
        views: 7,
        createdAt: new Date().toISOString()
    }
];

export const dummyUsers = [
    { _id: 'u1', name: 'Jane Doe', email: 'jane@abuhay.com', role: 'seller', phone: '08012345678', isVerified: true, subscriptionPlan: 'pro', createdAt: new Date().toISOString() },
    { _id: 'u2', name: 'John Smith', email: 'john@abuhay.com', role: 'seller', phone: '08087654321', isVerified: false, subscriptionPlan: 'free', createdAt: new Date().toISOString() },
    { _id: 'u3', name: 'Buyer One', email: 'buyer@abuhay.com', role: 'buyer', phone: '08011112222', isVerified: true, subscriptionPlan: 'free', createdAt: new Date().toISOString() },
];

export const dummyLeads = [
    { _id: 'l1', propertyId: dummyProperties[0], buyerName: 'Buyer One', buyerPhone: '08011112222', buyerEmail: 'buyer@abuhay.com', message: 'I am interested in this duplex.', isSold: false, createdAt: new Date().toISOString() },
    { _id: 'l2', propertyId: dummyProperties[1], buyerName: 'Jane Doe', buyerPhone: '08012345678', buyerEmail: 'jane@abuhay.com', message: 'Is this flat still available?', isSold: false, createdAt: new Date().toISOString() },
];