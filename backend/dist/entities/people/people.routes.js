"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const people_controller_1 = require("./people.controller");
const peopleRouter = (0, express_1.Router)();
peopleRouter.get('/', people_controller_1.getPeople);
peopleRouter.get('/:name', people_controller_1.getPeopleByName);
exports.default = peopleRouter;
