import { Router } from "express";

const router = Router();

/**
 * Product
 */

router.get("/product", (req, res) => {
  res.json({ message: "hello" });
});
router.get("/product:id", () => {});
router.put("/product:id", () => {});
router.post("/product", () => {});
router.delete("/product", () => {});

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update:id", () => {});
router.put("/update:id", () => {});
router.post("/update", () => {});
router.delete("/update", () => {});

/**
 * UpdatePoints
 */

router.get("/update_points", () => {});
router.get("/update_points:id", () => {});
router.put("/update_points:id", () => {});
router.post("/update_points", () => {});
router.delete("/update_points", () => {});

export default router;
