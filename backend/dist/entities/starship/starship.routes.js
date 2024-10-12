"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const starship_controller_1 = require("./starship.controller");
const starshipRouter = (0, express_1.Router)();
starshipRouter.get('/', starship_controller_1.getStarships);
starshipRouter.get('/:id', starship_controller_1.getStarshipById);
exports.default = starshipRouter;
