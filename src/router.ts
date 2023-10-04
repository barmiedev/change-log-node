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
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

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
router.get("/releases", getReleases);
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
router.get("/updates", getUpdates);
router.get("/update/:id", getUpdate);
router.put(
  "/update/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("type")
    .optional()
    .isIn([
      "BUG_FIX",
      "NEW_FEATURE",
      "IMPROVEMENT",
      "DEPRECATION",
      "SECURITY_FIX",
    ]),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update/",
  body("name").isString(),
  body("description").isString(),
  body("type").isIn([
    "BUG_FIX",
    "NEW_FEATURE",
    "IMPROVEMENT",
    "DEPRECATION",
    "SECURITY_FIX",
  ]),
  body("releaseId").isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

export default router;
