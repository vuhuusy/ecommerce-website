const FormInput = ({
  title,
  number,
  placeholder,
  value,
  setProductInfo,
  productInfo,
}) => {
  return (
    <>
      <p className="py-2 capitalize">{title || "Title"}</p>
      <div className="col-span-3 ">
        <input
          onChange={(e) =>
            setProductInfo({ ...productInfo, [title]: e.target.value })
          }
          required
          className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
          type={number ? "number" : "text"}
          placeholder={placeholder || title || "placeholder"}
          value={productInfo.title}
        />
      </div>
    </>
  );
};

export default FormInput;
