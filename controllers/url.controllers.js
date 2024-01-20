const shortid = require("shortid");
const URL = require("../models/url.models.js");

async function handleGenerateNewShortURL (req, res, next) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render("home", {
      id: shortID
    })
    // return res.json({ id: shortID });

    next();
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });

  next();
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics};