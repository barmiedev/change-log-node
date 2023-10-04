import prisma from "../modules/db";

/**
 * Get all updates
 */
export const getUpdates = async (req, res, next) => {
  try {
    const updates = await prisma.update.findMany({
      where: {
        release: {
          product: {
            belongToId: req.user.id,
          },
        },
      },
    });

    res.json({ data: updates });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single update
 */
export const getUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await prisma.update.findUnique({
      where: {
        id,
        release: {
          product: {
            belongToId: req.user.id,
          },
        },
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new update
 */
export const createUpdate = async (req, res, next) => {
  try {
    const { name, description, type, releaseId } = req.body;
    const update = await prisma.update.create({
      data: {
        name,
        description,
        type,
        releaseId,
      },
    });

    res.json({ data: update });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Update an update
 */
export const updateUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, type } = req.body;
    const update = await prisma.update.update({
      where: {
        id,
        release: {
          product: {
            belongToId: req.user.id,
          },
        },
      },
      data: {
        name,
        description,
        type,
      },
    });

    res.json({ data: update });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Delete an update
 */
export const deleteUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await prisma.update.delete({
      where: {
        id,
        release: {
          product: {
            belongToId: req.user.id,
          },
        },
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};
