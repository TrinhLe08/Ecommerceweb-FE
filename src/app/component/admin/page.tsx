"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { CheckCircle, PackageSearch } from "lucide-react";
import { adminApis } from "@/app/apis/admin-apis";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { LogOut } from "lucide-react";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

interface MasterPlayOutProps {
  Component: React.ComponentType<any>;
}

const items: MenuItem[] = [
  getItem(
    "Summary",
    "sub0",
    <Link href="/?page-admin=summary">
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "User",
    "sub1",
    <Link href="/?page-admin=all-user">
      <UserOutlined />
    </Link>
  ),
  getItem(
    "Order",
    "sub2",
    <Link href="/?page-admin=order-list">
      <CheckCircle size={19} />
    </Link>
  ),
  getItem(
    "Product",
    "9",
    <Link href="/?page-admin=product-list">
      <PackageSearch size={19} />
    </Link>
  ),
];

const MasterLayOutAdmin: React.FC<MasterPlayOutProps> = ({ Component }) => {
  const router = useRouter();
  const LogOutAdmin = () => {
    localStorage.clear();
    router.push("/");
    return;
  };
  useEffect(() => {
    const token: string | null = localStorage.getItem("accessToken");
    const CheckToken = async () => {
      try {
        if (token) {
          const check = await adminApis.checkTokenAdmin(token);
          if (check.data) {
            return;
          } else {
            LogOutAdmin();
            return;
          }
        } else {
          LogOutAdmin();
          return;
        }
      } catch (err) {
        console.log(err);
        LogOutAdmin();
        return;
      }
    };
    CheckToken();
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} className="pt-10" />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Link href="/?page-admin=summary" className="mb-4">
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt=""
            className="w-[20%]"
          />
        </Link>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Component />
          </div>
        </Content>
        <div className="flex justify-end">
          <button
            className="flex border-red-600 border-b-2"
            onClick={() => LogOutAdmin()}
          >
            Log Out <LogOut />
          </button>
        </div>
      </Layout>
    </Layout>
  );
};

export default MasterLayOutAdmin;
