export interface Ivariants {
  type: string;
  value: string;
}

export interface Iinventory {
  quantity: number;
  inStock: boolean;
}

export interface Iproduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: [string];
  variants: Ivariants[];
  inventory: Iinventory;
}
