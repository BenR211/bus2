"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send("Hello I am your express server :)");
    const name = req.query.name;
    postCodeToFirst5BusesAt2NearestBusStops("SW15 2UT");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
function stopIDToFirst5Buses(stopID) {
    return __awaiter(this, void 0, void 0, function* () {
        const myUrl = "https://api.tfl.gov.uk/StopPoint/" + stopID + "/Arrivals";
        const response = yield fetch(myUrl);
        const data = yield response.json();
        // deal with JSON response
        const busesArray = [];
        const numOfBuses = Math.min(5, data.length);
        for (let i = 0; i < numOfBuses; i++) {
            busesArray.push(data[i].lineName);
        }
        return busesArray;
    });
}
function postCodeToLongLat(postcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const myUrl = "https://api.postcodes.io/postcodes/" + postcode;
        const response = yield fetch(myUrl);
        const data = yield response.json();
        return [data.result.longitude, data.result.latitude];
    });
}
function longLatToBusStopIds(longLat) {
    return __awaiter(this, void 0, void 0, function* () {
        const myUrl = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=" + longLat[1] + "&lon=" + longLat[0];
        const response = yield fetch(myUrl);
        const data = yield response.json();
        // deal with JSON response
        const busIds = [];
        const numOfStops = Math.min(2, data.stopPoints.length);
        for (let i = 0; i < numOfStops; i++) {
            busIds.push(data.stopPoints[i].naptanId);
        }
        return busIds;
    });
}
function postCodeToFirst5BusesAt2NearestBusStops(postcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const longLat = yield postCodeToLongLat(postcode);
        const busStopIds = yield longLatToBusStopIds(longLat);
        let buses = [];
        for (let i = 0; i < busStopIds.length; i++) {
            let temp = yield stopIDToFirst5Buses(busStopIds[i]);
            buses = buses.concat(temp);
            console.log(temp);
        }
        console.log(buses);
    });
}
