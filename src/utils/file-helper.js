"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_BACKUP_SUFFIX = void 0;
exports.createFileBackup = createFileBackup;
exports.restoreFileBackup = restoreFileBackup;
exports.deleteFileBackup = deleteFileBackup;
var fs_extra_1 = __importDefault(require("fs-extra"));
exports.FILE_BACKUP_SUFFIX = ".bak";
function createFileBackup(filePath) {
    if (!fs_extra_1.default.existsSync(filePath)) {
        return null;
    }
    var backupPath = "".concat(filePath).concat(exports.FILE_BACKUP_SUFFIX);
    try {
        fs_extra_1.default.renameSync(filePath, backupPath);
        return backupPath;
    }
    catch (error) {
        console.error("Failed to create backup of ".concat(filePath, ": ").concat(error));
        return null;
    }
}
function restoreFileBackup(filePath) {
    var backupPath = "".concat(filePath).concat(exports.FILE_BACKUP_SUFFIX);
    if (!fs_extra_1.default.existsSync(backupPath)) {
        return false;
    }
    try {
        fs_extra_1.default.renameSync(backupPath, filePath);
        return true;
    }
    catch (error) {
        console.error("Warning: Could not restore backup file ".concat(backupPath, ": ").concat(error));
        return false;
    }
}
function deleteFileBackup(filePath) {
    var backupPath = "".concat(filePath).concat(exports.FILE_BACKUP_SUFFIX);
    if (!fs_extra_1.default.existsSync(backupPath)) {
        return false;
    }
    try {
        fs_extra_1.default.unlinkSync(backupPath);
        return true;
    }
    catch (error) {
        // Best effort - don't log as this is just cleanup
        return false;
    }
}
