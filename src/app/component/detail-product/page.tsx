import { useRecoilState, useRecoilValue } from "recoil";
import { ShoppingCart } from "lucide-react";
import { Facebook } from "lucide-react";
import { Mail } from "lucide-react";
import { AtomDetailProduct } from "@/app/recoil/detail-product-provider";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import { ProductType } from "@/app/utils/product.type";
import { OrderDetailType } from "@/app/utils/shopping-list.type";

const DetailProduct = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(AtomShoppingCart);
  const detailProductValue: ProductType = useRecoilValue(AtomDetailProduct);
  const handleAddToCart = () => {
    const updatedCart = [
      ...shoppingCart,
      {
        idOrder: detailProductValue.id,
        quantity: 1,
        nameOrder: detailProductValue.name,
        urlOrder: detailProductValue.urlProduct,
        priceOrder: detailProductValue.price,
      },
    ];

    const mergedItems = updatedCart.reduce((cart, curr) => {
      const found = cart.find(
        (item: OrderDetailType) => item.idOrder === curr.idOrder
      );
      if (found) {
        found.quantity += curr.quantity;
      } else {
        cart.push({ ...curr });
      }
      return cart;
    }, []);

    setShoppingCart(mergedItems);
  };
  return (
    <div className="detail-product md:flex grid gap-5 w-full italic font-serif">
      <div>
        <img
          src={detailProductValue.urlProduct}
          alt=""
          className="w-[500px] h-[700px]"
        />
      </div>
      <div>
        <div className="grid gap-3 border-b-2 border-red pb-10">
          <h1 className="text-2xl font-semibold font-serif italic">
            {detailProductValue.name}
          </h1>
          <p>{(detailProductValue.price / 100).toFixed(2)} $</p>
          <button
            className="flex font-serif italic hover:underline text-xl text-amber-900 "
            onClick={() => handleAddToCart()}
          >
            <ShoppingCart />
            add to cart
          </button>
        </div>
        <div className="grid gap-3 mt-5 border-b-2 border-red pb-10">
          <p>
            <span className="font-semibold">Size</span> :
            {detailProductValue.size}
          </p>
          <p>
            <span className="font-semibold">Material</span> :
            {detailProductValue.material}
          </p>
          <p>
            <span className="font-semibold">Detail</span> :
            {detailProductValue.detail}
          </p>
          <p>
            <span className="font-semibold">Origin</span> :
            {detailProductValue.origin}
          </p>
        </div>
        <div className="text-center italic font-serif mt-10">
          <h1 className="font-semibold ">
            $12.95 Flat Rate Shipping in the USA
          </h1>
          <p>share with friends:</p>
          <div className="flex justify-center">
            <a href="https://www.facebook.com/sharer.php?u=https://www.leifshop.com/products/melon-tiles-no-2-painting">
              <Facebook color="#00FF00" />
            </a>
            <a href="mailto:?subject=Check out this product from LEIF!&amp;body=https://www.leifshop.com/products/melon-tiles-no-2-painting">
              <Mail color="#00FF00" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
