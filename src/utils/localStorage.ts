class LocalStorag {
  keyName: string;

  constructor() {
    this.keyName = 'products';
  }

  getProducts():string[] | [] {
    const productsLocalStorage:string | null = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }

  setProducts(id: string): { pushProduct: boolean, products: string[] | [] } {
    const products:string[] = this.getProducts();
    const index = products.indexOf(id);
    let pushProduct = false;
    if (index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      products.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {
      pushProduct,
      products,
    };
  }
}

export const localStorageUtil = new LocalStorag();
