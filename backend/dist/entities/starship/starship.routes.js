"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const starship_controller_1 = require("./starship.controller");
const starshipRouter = (0, express_1.Router)();
starshipRouter.get('/', starship_controller_1.getStarships);
<<<<<<< HEAD
starshipRouter.get('/:name', starship_controller_1.getStarshipById);
=======
starshipRouter.get('/:id', starship_controller_1.getStarshipById);
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
exports.default = starshipRouter;
