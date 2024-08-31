"use client";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { AtomDetailProduct } from "@/app/recoil/detail-product-provider";
import { ProductType } from "@/app/utils/product.type";
import { productApis } from "@/app/apis/product-apis";

const AdminDetailProduct = () => {
  const [spin, setSpin] = useState(false);
  const [_, setDetailProduct] = useRecoilState(AtomDetailProduct);
  const detailProductValue: ProductType = useRecoilValue(AtomDetailProduct);
  const antIcon: JSX.Element = (
    <LoadingOutlined
      style={{
        fontSize: 54,
        color: "black",
      }}
      spin
    />
  );
  const formik = useFormik({
    initialValues: {
      urlProduct: null,
      name: `${detailProductValue.name}`,
      price: detailProductValue.price,
      status: !detailProductValue.status,
      material: `${detailProductValue.material}`,
      size: `${detailProductValue.size}`,
      detail: `${detailProductValue.detail}`,
      origin: `${detailProductValue.origin}`,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Cannot be left blank !"),
      price: Yup.string().required("Cannot be left blank !"),
      material: Yup.string().required("Cannot be left blank !"),
      size: Yup.string().required("Cannot be left blank !"),
      detail: Yup.string().required("Cannot be left blank !"),
      origin: Yup.string().required("Cannot be left blank !"),
    }),
    onSubmit: async (values: any) => {
      setSpin(true);
      if (values.urlProduct === null) {
        const dataToUpdateProduct: ProductType = {
          id: detailProductValue.id,
          urlProduct: detailProductValue.urlProduct,
          name: values.name,
          price: values.price,
          status: values.status,
          material: values.material,
          size: values.size,
          detail: values.detail,
          origin: values.origin,
          item: detailProductValue.item,
        };
        const updateProduct = await productApis.updateProduct(
          dataToUpdateProduct
        );
        setDetailProduct(updateProduct.data);
        setSpin(false);
        return;
      }
      const dataToUpdateProduct: ProductType = {
        id: detailProductValue.id,
        urlProduct: values.urlProduct,
        name: values.name,
        price: values.price,
        status: values.status,
        material: values.material,
        size: values.size,
        detail: values.detail,
        origin: values.origin,
        item: detailProductValue.item,
      };
      const updateProduct = await productApis.updateProduct(
        dataToUpdateProduct
      );
      setDetailProduct(updateProduct.data);
      setSpin(false);
      return;
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="detail-product grid w-full justify-center gap-5 w-full italic font-serif"
    >
      {spin ? (
        <div className="w-full absolute top-0 left-0 h-[200%] flex justify-center items-center z-999 bg-gray-300 bg-opacity-50">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div>
        <input
          type="file"
          name="file"
          onChange={(event) => {
            if (
              event.currentTarget.files &&
              event.currentTarget.files.length > 0
            ) {
              const selectedFile = event.currentTarget.files[0];
              formik.setFieldValue("urlProduct", selectedFile);
            }
          }}
          className="mb-2"
        />
        {formik.values.urlProduct && <p>{formik.values.urlProduct.name}</p>}
        <img
          src={detailProductValue.urlProduct}
          alt=""
          className="w-[500px] h-[700px]"
        />
      </div>
      <div>
        <div className="grid gap-3 border-b-2 border-red pb-10">
          <input
            type="name"
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            className="text-2xl font-semibold font-serif italic w-full"
          />
          <input
            type="name"
            value={formik.values.price}
            name="price"
            onChange={formik.handleChange}
            className="w-full"
          />
        </div>
        <div className="grid gap-3 mt-5 border-b-2 border-red pb-10">
          <p>
            <span className="font-semibold">Size</span> :
            <input
              type="name"
              value={formik.values.size}
              name="size"
              onChange={formik.handleChange}
              className="w-full"
            />
          </p>
          <p>
            <span className="font-semibold">Material</span> :
            <input
              type="name"
              value={formik.values.material}
              name="material"
              onChange={formik.handleChange}
              className="w-full"
            />
          </p>
          <p>
            <span className="font-semibold">Detail</span> :
            <input
              type="name"
              value={formik.values.detail}
              onChange={formik.handleChange}
              name="detail"
              className="w-full"
            />
          </p>
          <p>
            <span className="font-semibold">Origin</span> :
            <input
              type="name"
              value={formik.values.origin}
              onChange={formik.handleChange}
              name="origin"
              className="w-full"
            />
          </p>
          <p className="flex w-fit gap-5">
            <span className="font-semibold">Sale</span> :
            <input
              type="checkbox"
              checked={formik.values.status ? true : false}
              onChange={() => {
                formik.setFieldValue("status", formik.values.status);
              }}
              name="status"
              className="w-full"
            />
          </p>
        </div>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default React.memo(AdminDetailProduct);
