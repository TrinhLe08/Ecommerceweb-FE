"use client";
import dynamic from "next/dynamic";
import dotenv from "dotenv";
import RootLayout from "./layout";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import FecthDataDetailProduct from "./global/fecth-data-param-detail-product-request";
import MasterLayOut from "./component/master-playout/page-master";
import HomePage from "./component/home-page/page";
import { AtomDetailProduct } from "./recoil/detail-product-provider";
import { AtomAllUser } from "./recoil/admin-request-all-user-provider";
import { AtomAllOrder } from "./recoil/admin-request-all-order-provider";
import FecthDataParamsAdmin from "./global/fetch-data.param-admin-request";

dotenv.config();

const LoginComponent = dynamic(() => import("./component/login-page/page"), {
  ssr: false,
});
const ConfirmEmail = dynamic(
  () => import("./component/forgor-password/confirm-email/page"),
  {
    ssr: false,
  }
);
const ConfirmCode = dynamic(
  () => import("./component/forgor-password/confirm-code/page"),
  {
    ssr: false,
  }
);
const ChangePassword = dynamic(
  () => import("./component/forgor-password/change-password/page"),
  {
    ssr: false,
  }
);
const RegisterComponent = dynamic(
  () => import("./component/register-page/page"),
  {
    ssr: false,
  }
);
const ProfilePage = dynamic(() => import("./component/profile/page"), {
  ssr: false,
});
const ProductList = dynamic(() => import("./component/product-list/page"), {
  ssr: false,
});
const DetailProduct = dynamic(() => import("./component/detail-product/page"), {
  ssr: false,
});
const ShoppingCart = dynamic(() => import("./component/shopping-cart/page"), {
  ssr: false,
});
const PagementPage = dynamic(() => import("./component/payment-page/page"), {
  ssr: false,
});
const AllUserPage = dynamic(() => import("./component/admin/user/page"), {
  ssr: false,
});
const OrderList = dynamic(() => import("./component/admin/order/page"), {
  ssr: false,
});
const ProductListAdmin = dynamic(
  () => import("./component/admin/product/page"),
  {
    ssr: false,
  }
);
const AdminDetailProduct = dynamic(
  () => import("./component/admin/product-detail/page"),
  {
    ssr: false,
  }
);
const CreateProduct = dynamic(() => import("./component/admin/create/page"), {
  ssr: false,
});
const ShoppingList = dynamic(
  () => import("./component/admin/shopping-list/page"),
  {
    ssr: false,
  }
);
const SummaryPage = dynamic(() => import("./component/admin/summary/page"), {
  ssr: false,
});
const MasterLayOutAdmin = dynamic(
  () => import("./component/admin/page-admin"),
  {
    ssr: false,
  }
);

export default function App() {
  const searchParams = useSearchParams();
  const [__, setDetailProductValue] = useRecoilState(AtomDetailProduct);
  const [___, setAllUser] = useRecoilState(AtomAllUser);
  const [____, setAllOrder] = useRecoilState(AtomAllOrder);

  useEffect(() => {
    const FecthData = async () => {
      const idProductAdmin: number | null = parseInt(
        searchParams.get("page-admin-detail-product") || "0",
        10
      );
      const valueParamsAdmin: string | null = searchParams.get("page-admin");
      try {
        if (valueParamsAdmin && valueParamsAdmin === "all-user") {
          const adminRequest = await FecthDataParamsAdmin(valueParamsAdmin);
          setAllUser(adminRequest);
        } else if (valueParamsAdmin && valueParamsAdmin === "order-list") {
          const adminRequest = await FecthDataParamsAdmin(valueParamsAdmin);
          setAllOrder(adminRequest);
        } else if (idProductAdmin) {
          const dataDetailProduct = await FecthDataDetailProduct(
            idProductAdmin
          );
          setDetailProductValue(dataDetailProduct);
          return;
        }
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    };
    FecthData();
  }, [searchParams]);
  return (
    <RootLayout>
      {searchParams.has("register-page") ? (
        <RegisterComponent />
      ) : searchParams.has("login-page") ? (
        <LoginComponent />
      ) : searchParams.has("confirm-email-page") ? (
        <ConfirmEmail />
      ) : searchParams.has("confirm-code-page") ? (
        <ConfirmCode />
      ) : searchParams.has("change-password-page") ? (
        <ChangePassword />
      ) : searchParams.has("profile-page") ? (
        <MasterLayOut Component={ProfilePage} value={true} />
      ) : searchParams.has("product-page") ? (
        <MasterLayOut Component={ProductList} value={true} />
      ) : searchParams.has("product-detail") ? (
        <MasterLayOut Component={DetailProduct} value={true} />
      ) : searchParams.has("shopping-cart") ? (
        <MasterLayOut Component={ShoppingCart} value={false} />
      ) : searchParams.has("payment-page") ? (
        <PagementPage />
      ) : searchParams.get("page-admin") === "all-user" ? (
        <MasterLayOutAdmin Component={AllUserPage} />
      ) : searchParams.get("page-admin") === "order-list" ? (
        <MasterLayOutAdmin Component={OrderList} />
      ) : searchParams.get("page-admin") === "product-list" ? (
        <MasterLayOutAdmin Component={ProductListAdmin} />
      ) : searchParams.get("page-admin-detail-product") ? (
        <MasterLayOutAdmin Component={AdminDetailProduct} />
      ) : searchParams.get("page-admin") === "create-product" ? (
        <MasterLayOutAdmin Component={CreateProduct} />
      ) : searchParams.get("page-admin") === "shopping-cart" ? (
        <MasterLayOutAdmin Component={ShoppingList} />
      ) : searchParams.get("page-admin") === "summary" ? (
        <MasterLayOutAdmin Component={SummaryPage} />
      ) : (
        <MasterLayOut Component={HomePage} value={true} />
      )}
    </RootLayout>
  );
}
