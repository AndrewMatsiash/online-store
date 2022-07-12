import { CATALOG } from '../../constants/catalog';
import { ROOT_PRODUCTS } from '../../constants/root';
import { localStorageUtil } from '../../utils/localStorage';
import { Header } from '../header/header';

class Products {
  labelAdd: string;

  classNameActive:string;

  labelRemove: string;

  innerHTML: string | undefined;

  id!: string;

  classList: any;

  constructor() {
    this.classNameActive = 'products-element__btn_active';
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Удалить из корзины';
  }

  handleSetLocationStorage(): void {
    const { pushProduct, products } = localStorageUtil.setProducts(this.id);

    if (pushProduct) {
      this.classList.add('products-element__btn_active');
      this.innerHTML = 'Удалить из корзины';
    } else {
      this.classList.remove('products-element__btn_active');
      this.innerHTML = 'Добавить в корзину';
    }
    Header.render(products.length);
  }

  render(catalog = CATALOG): void {
    const productsStore:string[] = localStorageUtil.getProducts();

    let htmlCatalog = '';

    catalog.forEach(({
      id, name, img, popular, numberOfCameras, color, quantity, releaseDate, brand,
    }) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = ` ${this.classNameActive}`;
        activeText = this.labelRemove;
      }

      htmlCatalog += `
   <li class="products-element">
     <span class="products-element__name">${name}</span>
     <img class="products-element__img" src="${img}">
     <span class="products-element__quanlity">Количество: ${quantity}</span>
     <span class="products-element__relase-data">Дата релиза:${releaseDate}</span>
     <span class="products-element__brand">Производитель:${brand}</span>
     <span class="products-element__color">Цвет:${color}</span>
     <span class="products-element__cameras">Количество камер:${numberOfCameras}</span>
     <span class="products-element__popular">Популярный:${popular}</span>
     <button id="${id}" class="products-element__btn${activeClass}">
     ${activeText}
     </button>
    </li>
            `;
    });

    const html = `
            <ul class="products-container">
                ${htmlCatalog}
            </ul>
        `;

    ROOT_PRODUCTS.innerHTML = html;
    const buttons = document.querySelectorAll('.products-element__btn');
    buttons.forEach((el) => el.addEventListener('click', this.handleSetLocationStorage));
  }
}

export const productsPage = new Products();
productsPage.render();
console.log(CATALOG);

