export interface Ivariant {
  type: string;
  value: string;
}

export interface Iivertry {
  quantity: number;
  inStock: boolean;
}

export interface Iproduct {
  name: string;
  desctiption: string;
  price: number;
  category: string;
  tages: [string];
  variantes: Ivariant[];
  iventry: Iivertry;
}
