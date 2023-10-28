import express from "express"
import { redirectShortUrl, urlShort ,handleGetAnalytics, searchUrl, GetAllUrl} from "../controllers/urlController";



const router = express.Router();

router.get("/search", searchUrl);
router.get("/getall",GetAllUrl)
router.get("/:shortId", redirectShortUrl)
router.get("/analytics/:shortId", handleGetAnalytics);

router.post("/shorten", urlShort)


export default router