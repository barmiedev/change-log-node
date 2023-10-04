import prisma from "../modules/db";

/**
 * Get all releases
 */
export const getReleases = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

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
};

/**
 * Get a single release
 */
export const getRelease = async (req, res) => {
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
};

/**
 * Create a new release
 */
export const createRelease = async (req, res) => {
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
};

/**
 * Update a release
 */
export const updateRelease = async (req, res) => {
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
};

/**
 * Delete a release
 */
export const deleteRelease = async (req, res) => {
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
};
