"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const film_controller_1 = require("./film.controller");
const filmRouter = (0, express_1.Router)();
filmRouter.get('/', film_controller_1.getFilms);
filmRouter.get('/:id', film_controller_1.getFilmById);
exports.default = filmRouter;
