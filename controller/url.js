const shortid = require("shortid");
const URL = require("../model/url");




async function handlerGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(404).json({ err: "URL not found" })
    }

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    return res.render("home", { id: shortId })

}

async function handlerRedirectNewShortUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    return res.redirect(entry.redirectURL);

}
async function handlerGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({
        shortId
    });

    if (!entry) {
        return res.status(404).json({ err: "URL not found" })
    }
    const length = entry.visitHistory.length;
    res.json({
        "TotalClick": length,
        "Analytics": entry.visitHistory
    })

}

module.exports = {
    handlerGenerateNewShortUrl,
    handlerRedirectNewShortUrl,
    handlerGetAnalytics

}