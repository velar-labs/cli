"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var init_1 = require("@/src/commands/init");
var add_1 = require("@/src/commands/add");
var list_1 = require("@/src/commands/list");
/**
 * Display a nice introduction banner
 */
function displayIntro() {
    console.log("");
    console.log(chalk_1.default.bold.cyan("  ▼ VELAR CLI v0.1.0"));
    console.log(chalk_1.default.gray("  Tailwind CSS v4+ components for Laravel"));
    console.log("");
}
/**
 * Velar CLI program entry point
 */
var program = new commander_1.Command();
program
    .name("velar")
    .description("Velar CLI: Copy UI components into your Laravel project")
    .version("0.1.0")
    .hook("preAction", function () {
    displayIntro();
});
program
    .addCommand(add_1.add)
    .addCommand(init_1.init)
    .addCommand(list_1.search);
program.parse(process.argv);
