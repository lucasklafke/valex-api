var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { faker } from '@faker-js/faker';
import Cryptr from "cryptr";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import dayjs from "dayjs";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
function decryptNumber(number, cryptr) {
    var decryptedString = cryptr.decrypt(number);
    return decryptedString;
}
function encryptNumber(number, cryptr) {
    var encryptedString = cryptr.encrypt(number);
    return encryptedString;
}
function nameFormatter(fullName) {
    var splitedName = fullName.split(" ");
    var formatedName = "";
    for (var i = 0; i < splitedName.length; i++) {
        if (i === 0) {
            formatedName += "".concat(splitedName[i], " ");
        }
        else if (i === splitedName.length - 1) {
            formatedName += splitedName[i];
        }
        else {
            formatedName += "".concat(splitedName[i][0], " ");
        }
    }
    return formatedName.toUpperCase();
}
function expirationDateFormatter(date) {
    var splitedDate = date.split("-");
    var formatedYear = Number(splitedDate[1]) + 5;
    var formatedDate = "".concat(splitedDate[0], "-").concat(formatedYear);
    return formatedDate;
}
function calcBalance(payments, recharges) {
    var balance = 0;
    for (var i = 0; i < payments.length; i++) {
        balance -= payments[i].amount;
    }
    for (var i = 0; i < recharges.length; i++) {
        balance += recharges[i].amount;
    }
    return balance;
}
export function createCard(key, id, type) {
    return __awaiter(this, void 0, void 0, function () {
        var cardAlreadyExist, now, cryptr, fullName, randomCvvNumber, employeeFormatedName, randomCardNumber, expirationDate, cryptedCvvNumber, cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(type, id)];
                case 1:
                    cardAlreadyExist = _a.sent();
                    if (cardAlreadyExist) {
                        throw { code: 409, message: "card type already exist" };
                    }
                    now = dayjs().format("MM-YY");
                    cryptr = new Cryptr('myTotallySecretKey');
                    return [4 /*yield*/, employeeRepository.findById(id)];
                case 2:
                    fullName = (_a.sent()).fullName;
                    randomCvvNumber = faker.random.numeric(3);
                    console.log(randomCvvNumber);
                    employeeFormatedName = nameFormatter(fullName);
                    randomCardNumber = faker.random.numeric(11);
                    expirationDate = expirationDateFormatter(now);
                    cryptedCvvNumber = encryptNumber(randomCvvNumber, cryptr);
                    cardData = {
                        employeeId: id,
                        number: randomCardNumber,
                        cardholderName: employeeFormatedName,
                        securityCode: cryptedCvvNumber,
                        expirationDate: expirationDate,
                        password: null,
                        isVirtual: false,
                        originalCardId: null,
                        isBlocked: true,
                        type: type
                    };
                    cardRepository.insert(cardData);
                    return [2 /*return*/];
            }
        });
    });
}
export function activateCard(id, password, cvv) {
    return __awaiter(this, void 0, void 0, function () {
        var cryptr, card, decryptedCvv, cryptedPassword, CardUpdateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cryptr = new Cryptr('myTotallySecretKey');
                    return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { code: 404, message: "card not found" };
                    }
                    console.log(card.securityCode);
                    decryptedCvv = decryptNumber(card.securityCode, cryptr);
                    console.log("a", decryptedCvv);
                    if (decryptedCvv !== cvv) {
                        throw { code: 400, message: "invalid cvv" };
                    }
                    cryptedPassword = encryptNumber(password, cryptr);
                    CardUpdateData = {
                        password: cryptedPassword,
                        isBlocked: false
                    };
                    return [4 /*yield*/, cardRepository.update(id, CardUpdateData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function blockCard(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, cryptr, decryptedPassword, CardUpdateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { code: 404, message: "card not found" };
                    }
                    cryptr = new Cryptr('myTotallySecretKey');
                    decryptedPassword = decryptNumber(card.password, cryptr);
                    if (decryptedPassword !== password) {
                        throw { code: 400, message: "invalid password" };
                    }
                    CardUpdateData = {
                        isBlocked: true
                    };
                    return [4 /*yield*/, cardRepository.update(id, CardUpdateData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function unblockCard(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, cryptr, decryptedPassword, CardUpdateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { code: 404, message: "card not found" };
                    }
                    cryptr = new Cryptr('myTotallySecretKey');
                    decryptedPassword = decryptNumber(card.password, cryptr);
                    if (decryptedPassword !== password) {
                        throw { code: 400, message: "invalid password" };
                    }
                    CardUpdateData = {
                        isBlocked: false
                    };
                    return [4 /*yield*/, cardRepository.update(id, CardUpdateData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getBalance(cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var card, payments, recharges, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { code: 404, message: "card not found" };
                    }
                    return [4 /*yield*/, paymentRepository.findByCardId(cardId)];
                case 2:
                    payments = _a.sent();
                    return [4 /*yield*/, rechargeRepository.findByCardId(cardId)];
                case 3:
                    recharges = _a.sent();
                    balance = calcBalance(payments, recharges);
                    return [2 /*return*/, { balance: balance, payments: payments, recharges: recharges }];
            }
        });
    });
}
export function recharge(cardId, amount, companyId) {
    return __awaiter(this, void 0, void 0, function () {
        var card, employee, rechargeData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { code: 404, message: "card not found" };
                    }
                    if (card.isBlocked) {
                        throw { code: 400, message: "card is blocked" };
                    }
                    if (card.expirationDate < dayjs().format("MM-DD")) {
                        throw { code: 400, message: "card is expired" };
                    }
                    return [4 /*yield*/, employeeRepository.findById(card.employeeId)];
                case 2:
                    employee = _a.sent();
                    if (employee.companyId !== companyId) {
                        throw { code: 400, message: "card is not from this company" };
                    }
                    rechargeData = {
                        cardId: cardId,
                        amount: amount
                    };
                    return [4 /*yield*/, rechargeRepository.insert(rechargeData)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
