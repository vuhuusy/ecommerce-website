import { useEffect } from "react";

const OrderSummary = ({ products, setProductInfo }) => {
  const subtotal = products?.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const discount = products?.reduce(
    (acc, product) => acc + (product.price * product.discount) / 100,
    0
  );

  const totalPrice = subtotal - discount + 20;

  useEffect(() => {
    setProductInfo({ subtotal, discount, totalPrice });
  }, [products]);

  return (
    <div className="border rounded p-3">
      <h3 className="font-medium mb-3">Order Summary</h3>
      <div>
        {products?.map((product, i) => (
          <p className="capitalize font-semibold" key={product?._id}>
            {i + 1}. {product?.title} - {`(${product?.quantity})`}
          </p>
        ))}

        <div className="mt-5 border-b border-t">
          <ul>
            <li className="flex justify-between items-center my-2">
              Subtotal{" "}
              <span>
                <b>${subtotal}</b>
              </span>
            </li>
            <li className="flex justify-between items-center my-2">
              Shipping Cost{" "}
              <span>
                <b>$20</b>
              </span>
            </li>
            <li className="flex justify-between items-center my-2">
              Discount{" "}
              <span className="text-orange-500">
                <b>${discount}</b>
              </span>
            </li>
          </ul>
        </div>
        <div className="mt-3 font-bold">
          <p className="flex justify-between items-center">
            Total Cost <span>${totalPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
