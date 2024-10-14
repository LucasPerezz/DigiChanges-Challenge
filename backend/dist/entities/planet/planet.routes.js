"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planet_controller_1 = require("./planet.controller");
const planetsRouter = (0, express_1.Router)();
planetsRouter.get('/', planet_controller_1.getPlanets);
planetsRouter.get('/:name', planet_controller_1.getPlanetsByName);
exports.default = planetsRouter;
