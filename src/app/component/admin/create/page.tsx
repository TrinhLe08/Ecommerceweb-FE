"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { productApis } from "@/app/apis/product-apis";

const CreateProduct = () => {
  const [spin, setSpin] = useState(false);
  const router = useRouter();
  const antIcon: JSX.Element = (
    <LoadingOutlined
      style={{
        fontSize: 54,
        color: "black",
      }}
      spin
    />
  );
  const style = {
    input: "focus:outline-none bg-blue-100 p-1",
  };
  const formik = useFormik({
    initialValues: {
      urlProduct: null,
      name: "",
      price: "",
      status: false,
      material: "",
      size: "",
      detail: "",
      origin: "",
      items: "artwork",
    },
    validationSchema: Yup.object({
      urlProduct: Yup.string().required("Cannot be left blank !"),
      name: Yup.string().required("Cannot be left blank !"),
      price: Yup.string().required("Cannot be left blank !"),
      material: Yup.string().required("Cannot be left blank !"),
      size: Yup.string().required("Cannot be left blank !"),
      detail: Yup.string().required("Cannot be left blank !"),
      origin: Yup.string().required("Cannot be left blank !"),
    }),
    onSubmit: async (values: any) => {
      setSpin(true);
      try {
        const createProduct = await productApis.createProduct(values);
        router.push("/?page-admin=product-list");
        setSpin(false);
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    },
  });
  return (
    <div>
      {spin ? (
        <div className="w-full absolute top-0 left-0 h-[200%] flex justify-center items-center z-999 bg-gray-300 bg-opacity-50">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <form
        onSubmit={formik.handleSubmit}
        className="detail-product grid w-full justify-center w-full italic font-serif"
      >
        <label htmlFor="file">Avatar Product :</label>
        <input
          type="file"
          name="file"
          id="file"
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
        <label htmlFor="name">Name Product : </label>
        <input
          type="name"
          id="name"
          value={formik.values.name}
          name="name"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="price">Price Product : </label>
        <input
          type="number"
          id="price"
          value={formik.values.price}
          name="price"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="price">Status Sale Product : </label>
        <input
          type="checkbox"
          checked={formik.values.status ? true : false}
          onChange={() => {
            formik.setFieldValue("status", !formik.values.status);
          }}
          name="status"
          className={style.input}
        />
        <label htmlFor="price">Material Product : </label>
        <input
          type="text"
          id="material"
          value={formik.values.material}
          name="material"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="size">Size Product : </label>
        <input
          type="text"
          id="size"
          value={formik.values.size}
          name="size"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="detail">Detail Product : </label>
        <input
          type="text"
          id="detail"
          value={formik.values.detail}
          name="detail"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="origin">Origin Product : </label>
        <input
          type="text"
          id="origin"
          value={formik.values.origin}
          name="origin"
          onChange={formik.handleChange}
          className={style.input}
        />
        <label htmlFor="item">Item : </label>
        <select
          id="item"
          name="item"
          className="focus:outline-none w-fit border-[1px] border-red-100 rounded-lg p-1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.item}
        >
          <option value="artwork">artwork</option>
          <option value="interior">interior</option>
          <option value="holiday">holiday</option>
          <option value="kitchen">kitchen</option>
        </select>
        <button type="submit" className="underline mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(CreateProduct);
