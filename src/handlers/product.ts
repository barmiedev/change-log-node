import prisma from "../modules/db";

/**
 * Get all products
 */
export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });

    res.json({ data: user.products });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single product
 */
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
        belongToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        belongToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Update a product
 */
export const updateProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id,
        belongToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};
