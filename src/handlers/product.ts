import prisma from "../modules/db";

/**
 * Get all products
 */
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

/**
 * Get a single product
 */
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id,
      belongToId: req.user.id,
    },
  });

  res.json({ data: product });
};

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      belongToId: req.user.id,
    },
  });

  res.json({ data: product });
};

/**
 * Update a product
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await prisma.product.update({
    where: {
      id,
      belongToId: req.user.id,
    },
    data: {
      name,
    },
  });

  res.json({ data: product });
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id,
      belongToId: req.user.id,
    },
  });

  res.json({ data: product });
};
