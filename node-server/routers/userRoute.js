import express from 'express';
import protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/", protect, (req, res) => {
    res.send("User route accessed successfully.")
});

export default router;