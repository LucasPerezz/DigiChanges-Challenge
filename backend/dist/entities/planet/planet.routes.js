"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planet_controller_1 = require("./planet.controller");
const planetsRouter = (0, express_1.Router)();
planetsRouter.get('/', planet_controller_1.getPlanets);
<<<<<<< HEAD
planetsRouter.get('/:name', planet_controller_1.getPlanetsById);
=======
planetsRouter.get('/:id', planet_controller_1.getPlanetsById);
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
exports.default = planetsRouter;
