"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const people_routes_1 = __importDefault(require("./entities/people/people.routes"));
const cron_1 = require("./cron");
const film_routes_1 = __importDefault(require("./entities/film/film.routes"));
const starship_routes_1 = __importDefault(require("./entities/starship/starship.routes"));
const planet_routes_1 = __importDefault(require("./entities/planet/planet.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/v1/people', people_routes_1.default);
app.use('/api/v1/films', film_routes_1.default);
app.use('/api/v1/starships', starship_routes_1.default);
app.use('/api/v1/planets', planet_routes_1.default);
(0, cron_1.syncData)();
node_cron_1.default.schedule('* * * * *', () => {
    console.log('running a task every minute');
});
app.get("/", (_request, response) => {
    response.status(200).send("Hello World");
});
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/syncdb';
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));
