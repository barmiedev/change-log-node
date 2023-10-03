import { Router } from "express";

const router = Router();

/**
 * Product routes
 */
router.get("/product", (req, res) => {
  res.json({ message: "hello from express" });
});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product/", () => {});
router.delete("/product/:id", () => {});

/**
 * Release routes
 */
router.get("/release", () => {});
router.get("/release/:id", () => {});
router.put("/release/:id", () => {});
router.post("/release/", () => {});
router.delete("/release/:id", () => {});

/**
 * Update routes
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update/", () => {});
router.delete("/update/:id", () => {});

export default router;
