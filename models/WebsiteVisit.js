const mongoose = require("mongoose");

const websiteVisitSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  network: String,
  ipVersion: String,
  city: String,
  region: String,
  regionCode: String,
  country: String,
  countryName: String,
  countryCode: String,
  countryCodeISO3: String,
  countryCapital: String,
  countryTLD: String,
  continentCode: String,
  inEU: Boolean,
  postalCode: String,
  latitude: Number,
  longitude: Number,
  timezone: String,
  utcOffset: String,
  callingCode: String,
  currency: String,
  currencyName: String,
  languages: String,
  countryArea: Number,
  countryPopulation: Number,
  asn: String,
  organization: String,
  visitCount: {
    type: Number,
    default: 1,
  },
  lastVisitedAt: {
    type: Date,
    default: Date.now,
  },
  firstVisitedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WebsiteVisit", websiteVisitSchema);
