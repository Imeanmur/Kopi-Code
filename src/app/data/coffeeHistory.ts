export interface PurchaseRecord {
  id: string;
  date: string;
  variant: 'Lintong' | 'Sidikalang';
  product: string;
  weight: string;
  price: number;
  roast: string;
}

export const purchaseHistory: PurchaseRecord[] = [
  {
    id: 'KPC-001',
    date: '2025-05-20',
    variant: 'Lintong',
    product: 'Kopi Lintong Premium',
    weight: '250g',
    price: 85000,
    roast: 'Medium Roast',
  },
  {
    id: 'KPC-002',
    date: '2025-05-10',
    variant: 'Sidikalang',
    product: 'Kopi Sidikalang Bold',
    weight: '200g',
    price: 75000,
    roast: 'Dark Roast',
  },
  {
    id: 'KPC-003',
    date: '2025-04-28',
    variant: 'Lintong',
    product: 'Kopi Lintong Single Origin',
    weight: '100g',
    price: 55000,
    roast: 'Light Roast',
  },
  {
    id: 'KPC-004',
    date: '2025-04-15',
    variant: 'Sidikalang',
    product: 'Kopi Sidikalang Espresso',
    weight: '250g',
    price: 90000,
    roast: 'Dark Roast',
  },
  {
    id: 'KPC-005',
    date: '2025-03-30',
    variant: 'Lintong',
    product: 'Kopi Lintong Premium',
    weight: '500g',
    price: 155000,
    roast: 'Medium Roast',
  },
];
