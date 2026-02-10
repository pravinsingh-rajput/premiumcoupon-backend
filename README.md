# Premium Coupon Backend API

Track website visits by IP geolocation stored in MongoDB.

## Setup

```bash
npm install
npm start        # Production
npm run dev      # Development with auto-reload
```

## API

### Track Website Visit

**Endpoint:** `POST /api/locations`

**Request Body:**

```json
{
  "ip": "49.36.113.223",
  "network": "49.36.112.0/22",
  "version": "IPv4",
  "city": "Mumbai",
  "region": "Maharashtra",
  "region_code": "MH",
  "country": "IN",
  "country_name": "India",
  "country_code": "IN",
  "country_code_iso3": "IND",
  "country_capital": "New Delhi",
  "country_tld": ".in",
  "continent_code": "AS",
  "in_eu": false,
  "postal": "400104",
  "latitude": 19.0748,
  "longitude": 72.8856,
  "timezone": "Asia/Kolkata",
  "utc_offset": "+0530",
  "country_calling_code": "+91",
  "currency": "INR",
  "currency_name": "Rupee",
  "languages": "en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc",
  "country_area": 3287590,
  "country_population": 1352617328,
  "asn": "AS55836",
  "org": "Reliance Jio Infocomm Limited"
}
```

**Response:**

```json
{
  "message": "Success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "ipAddress": "49.36.113.223",
    "network": "49.36.112.0/22",
    "ipVersion": "IPv4",
    "city": "Mumbai",
    "region": "Maharashtra",
    "regionCode": "MH",
    "countryName": "India",
    "latitude": 19.0748,
    "longitude": 72.8856,
    "timezone": "Asia/Kolkata",
    "organization": "Reliance Jio Infocomm Limited",
    "visitCount": 1,
    "firstVisitedAt": "2026-02-10T10:00:00.000Z",
    "lastVisitedAt": "2026-02-10T10:00:00.000Z"
  }
}
```

## MongoDB Collection: `websitevisits`

**Fields:**

- `ipAddress` - Visitor's IP address (unique)
- `network` - CIDR network block
- `ipVersion` - IPv4 or IPv6
- `city`, `region`, `regionCode` - Location details
- `countryName`, `countryCode`, `countryCodeISO3` - Country info
- `countryCapital`, `countryTLD` - Country metadata
- `continentCode`, `inEU` - Continent and EU membership
- `latitude`, `longitude` - Geographic coordinates
- `timezone`, `utcOffset` - Timezone information
- `currency`, `currencyName` - Currency info
- `callingCode` - Country calling code
- `languages` - Spoken languages
- `asn`, `organization` - ISP/Network info
- `visitCount` - Number of visits from this IP
- `firstVisitedAt` - Initial visit timestamp
- `lastVisitedAt` - Last visit timestamp

## How It Works

1. **First visit from IP**: Creates document with `visitCount: 1`
2. **Repeat visits from same IP**: Increments `visitCount`, updates `lastVisitedAt`
3. **No duplicates**: Each IP has exactly one document

## Database

MongoDB Atlas Connection: `premiumcouponcluster`
