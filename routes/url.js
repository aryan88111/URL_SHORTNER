const express = require('express');
const { handlerGenerateNewShortUrl, handlerRedirectNewShortUrl, handlerGetAnalytics } = require('../controller/url');
const router = express.Router();

router.post("/", handlerGenerateNewShortUrl)
router.get("/:shortId", handlerRedirectNewShortUrl)
router.get("/ana/:shortId", handlerGetAnalytics)

module.exports = router;