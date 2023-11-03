"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.notesValidationSchema = joi_1.default.object({
    note_title: joi_1.default.string().required().min(2).max(3000),
    note_body: joi_1.default.string().required().min(1).max(10000),
});
