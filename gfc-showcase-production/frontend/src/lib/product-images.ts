import { STATIC_PRODUCTS, type Product } from './products-data';

type ProductLike = Partial<Pick<Product, 'name' | 'model_code' | 'category' | 'image_url'>>;

const CATEGORY_FALLBACKS: Record<string, string> = {
  ceiling_fan: 'https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800',
  pedestal_fan: 'https://www.gfcfans.com/cdn/shop/files/pedestaldesignercross.jpg?v=1744721859&width=800',
  bracket_fan: 'https://www.gfcfans.com/cdn/shop/files/deluxe_cf3c09ec-2004-4f7c-aaa9-ffb85b3bfd93.jpg?v=1744721859&width=800',
  air_cooler: 'https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800',
  washing_machine: 'https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800',
  default: 'https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800',
};

const normalize = (value?: string) => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const isOfficial = (url?: string) => Boolean(url && url.includes('gfcfans.com'));

export const getOfficialImage = (product: ProductLike) => {
  if (isOfficial(product.image_url)) {
    return product.image_url as string;
  }

  const model = normalize(product.model_code);
  const name = normalize(product.name);

  const match = STATIC_PRODUCTS.find((item) => {
    if (model && normalize(item.model_code) === model) return true;
    if (name && normalize(item.name) === name) return true;
    return false;
  });

  if (match?.image_url) {
    return match.image_url;
  }

  return CATEGORY_FALLBACKS[product.category || ''] || CATEGORY_FALLBACKS.default;
};
