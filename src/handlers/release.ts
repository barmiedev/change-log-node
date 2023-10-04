import prisma from "../modules/db";

/**
 * Get all releases
 */
export const getReleases = async (req, res, next) => {
  try {
    const releases = await prisma.release.findMany({
      where: {
        product: {
          belongToId: req.user.id,
        },
      },
      include: {
        updates: true,
      },
    });

    res.json({
      data: releases,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single release
 */
export const getRelease = async (req, res, next) => {
  try {
    const { id } = req.params;
    const release = await prisma.release.findUnique({
      where: {
        id,
        product: {
          belongToId: req.user.id,
        },
      },
      include: {
        updates: true,
      },
    });

    res.json({ data: release });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new release
 */
export const createRelease = async (req, res, next) => {
  try {
    const { title, body, version, status, productId } = req.body;
    const release = await prisma.release.create({
      data: {
        title,
        body,
        version,
        status,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    res.json({ data: release });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Update a release
 */
export const updateRelease = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body, version, status } = req.body;
    const release = await prisma.release.update({
      where: {
        id,
        product: {
          belongToId: req.user.id,
        },
      },
      data: {
        title,
        body,
        version,
        status,
      },
    });

    res.json({ data: release });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

/**
 * Delete a release
 */
export const deleteRelease = async (req, res, next) => {
  try {
    const { id } = req.params;
    const release = await prisma.release.delete({
      where: {
        id,
        product: {
          belongToId: req.user.id,
        },
      },
    });

    res.json({ data: release });
  } catch (error) {
    next(error);
  }
};
