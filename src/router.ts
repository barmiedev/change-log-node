import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createRelease,
  deleteRelease,
  getRelease,
  getReleases,
  updateRelease,
} from "./handlers/release";

const router = Router();

/**
 * Product routes
 */
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product/",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Release routes
 */
router.get("/release", getReleases);
router.get("/release/:id", getRelease);
router.put(
  "/release/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  handleInputErrors,
  updateRelease
);
router.post(
  "/release/",
  body("title").exists(),
  body("body").exists(),
  body("productId").exists(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  handleInputErrors,
  createRelease
);
router.delete("/release/:id", deleteRelease);

/**
 * Update routes
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/update/",
  body("name").isString(),
  body("description").isString(),
  () => {}
);
router.delete("/update/:id", () => {});

export default router;
