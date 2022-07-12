import { ROOT_HEADER } from '../../constants/root';
import { localStorageUtil } from '../../utils/localStorage';

export class Header {
  static render(count:number):void {
    const html = `
<div class="header-container">
<div class="logo">📱MobileStore</div>
<div class="header-counter"> 🗑${count} </div>
</div>
`;

    ROOT_HEADER.innerHTML = html;
  }
}
export const productsStore = localStorageUtil.getProducts();
// const headerPage = new Header();
Header.render(productsStore.length);
