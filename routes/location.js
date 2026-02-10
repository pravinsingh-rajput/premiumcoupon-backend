const express = require("express");
const router = express.Router();
const WebsiteVisit = require("../models/WebsiteVisit");
const { sendNewVisitEmail, sendRevisitEmail } = require("../config/mailer");

// POST endpoint to store website visit data
router.post("/", async (req, res) => {
  try {
    const visitData = req.body;
    const incomingPages = Array.isArray(visitData.pages) ? visitData.pages : [];
    const singlePage = visitData.page || visitData.pageVisited || visitData.url;
    if (singlePage) {
      incomingPages.push(singlePage);
    }
    const normalizedPages = incomingPages.filter(Boolean);
    const pageVisited = normalizedPages.length
      ? normalizedPages[normalizedPages.length - 1]
      : undefined;

    // Map incoming IP field to ipAddress
    const mappedData = {
      ipAddress: visitData.ip || visitData.ipAddress,
      network: visitData.network,
      ipVersion: visitData.version || visitData.ipVersion,
      city: visitData.city,
      region: visitData.region,
      regionCode: visitData.region_code || visitData.regionCode,
      country: visitData.country,
      countryName: visitData.country_name || visitData.countryName,
      countryCode: visitData.country_code || visitData.countryCode,
      countryCodeISO3: visitData.country_code_iso3 || visitData.countryCodeISO3,
      countryCapital: visitData.country_capital || visitData.countryCapital,
      countryTLD: visitData.country_tld || visitData.countryTLD,
      continentCode: visitData.continent_code || visitData.continentCode,
      inEU: visitData.in_eu !== undefined ? visitData.in_eu : visitData.inEU,
      postalCode: visitData.postal || visitData.postalCode,
      latitude: visitData.latitude,
      longitude: visitData.longitude,
      timezone: visitData.timezone,
      utcOffset: visitData.utc_offset || visitData.utcOffset,
      callingCode: visitData.country_calling_code || visitData.callingCode,
      currency: visitData.currency,
      currencyName: visitData.currency_name || visitData.currencyName,
      languages: visitData.languages,
      countryArea: visitData.country_area || visitData.countryArea,
      countryPopulation:
        visitData.country_population || visitData.countryPopulation,
      asn: visitData.asn,
      organization: visitData.org || visitData.organization,
      pageVisited: pageVisited,
      pagesVisited: normalizedPages.slice(-30),
    };

    // Check if this IP already has a visit record
    const existingVisit = await WebsiteVisit.findOne({
      ipAddress: mappedData.ipAddress,
    });
    if (existingVisit) {
      // Update existing visit record
      existingVisit.visitCount += 1;
      existingVisit.lastVisitedAt = new Date();
      const mergedPages = []
        .concat(existingVisit.pagesVisited || [])
        .concat(mappedData.pagesVisited || [])
        .filter(Boolean);
      if (mergedPages.length > 0) {
        existingVisit.pagesVisited = mergedPages.slice(-30);
        existingVisit.pageVisited =
          existingVisit.pagesVisited[existingVisit.pagesVisited.length - 1];
      }
      const updated = await existingVisit.save();

      // Send email notification for revisit
      sendRevisitEmail(updated);

      return res.status(200).json({
        message: "Success",
        data: updated,
      });
    }

    // Create new website visit record
    const newVisit = new WebsiteVisit(mappedData);
    const savedVisit = await newVisit.save();

    // Send email notification for new visit
    sendNewVisitEmail(savedVisit);

    res.status(201).json({
      message: "Success",
      data: savedVisit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
});

module.exports = router;
