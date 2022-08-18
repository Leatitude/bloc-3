import DB from "../../../db.json";

const findProductById = (productId) => {
  return DB.products.find((product) => product.id == productId);
};

export default defineEventHandler((event) => {
  const productId = event.context.params.productId;
  const product = findProductById(productId);

  if (!product) {
    throw createError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  const similarProducts = (product.similarProducts || []).map((id) =>
    findProductById(id)
  );

  return { ...product, similarProducts };
});
