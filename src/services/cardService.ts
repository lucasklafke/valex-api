import { faker } from '@faker-js/faker';
import Cryptr from "cryptr"
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import { TransactionTypes } from '../repositories/cardRepository.js';
import dayjs from "dayjs"
import {PaymentWithBusinessName } from "../repositories/paymentRepository.js"
import {RechargeInsertData} from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

function decryptNumber(number : string, cryptr : Cryptr){
        const decryptedString = cryptr.decrypt(number);
        return decryptedString
}
function encryptNumber(number : string, cryptr : Cryptr){
        const encryptedString = cryptr.encrypt(number);
        return encryptedString

}

function nameFormatter(fullName : string){
        const splitedName = fullName.split(" ")
        let formatedName = ""
        
        for(let i = 0; i < splitedName.length; i++){
                if(i === 0 ){
                        formatedName += `${splitedName[i]} `
                }else
                if(i === splitedName.length -1){
                        formatedName += splitedName[i] 
                } else{
                        formatedName += `${splitedName[i][0]} `
                }

        }
        return formatedName.toUpperCase()
}

function expirationDateFormatter(date:string){
        const splitedDate = date.split("-")
        const formatedYear = Number(splitedDate[1]) + 5
        const formatedDate = `${splitedDate[0]}-${formatedYear}`
        return formatedDate
}

function calcBalance(payments : PaymentWithBusinessName[], recharges : RechargeInsertData[]){
        let balance = 0
        for(let i = 0; i < payments.length; i++){
                balance -= payments[i].amount
        }
        for(let i = 0; i < recharges.length; i++){
                balance += recharges[i].amount
        }
        return balance
}


export async function createCard(key : String, id:number, type: TransactionTypes, ){

        const cardAlreadyExist = await cardRepository.findByTypeAndEmployeeId(type , id)
        if(cardAlreadyExist){
                throw {code: 409, message: "card type already exist"}
        }

        const now = dayjs().format("MM-YY")
        const cryptr = new Cryptr('myTotallySecretKey');

        const {fullName}= await employeeRepository.findById(id)
        const randomCvvNumber = faker.random.numeric(3)

        const employeeFormatedName = nameFormatter(fullName)
        const randomCardNumber = faker.random.numeric(11)
        const expirationDate = expirationDateFormatter(now)
        const cryptedCvvNumber = encryptNumber(randomCvvNumber, cryptr)

        const cardData = {
                employeeId: id,
                number: randomCardNumber,
                cardholderName : employeeFormatedName,
                securityCode : cryptedCvvNumber,
                expirationDate: expirationDate,
                password: null,
                isVirtual:false,
                originalCardId: null,
                isBlocked: true,
                type,
        }
        cardRepository.insert(cardData)

}

export async function activateCard(id : number, password : string, cvv : string){
        const cryptr = new Cryptr('myTotallySecretKey')

        const card = await cardRepository.findById(id)
        if(!card){
                throw {code: 404, message: "card not found"}
        }
        const decryptedCvv = decryptNumber(card.securityCode, cryptr)
        if(decryptedCvv !== cvv){
                throw {code: 400, message: "invalid cvv"}
        }

        const cryptedPassword = encryptNumber(password, cryptr)
        const CardUpdateData = {
                password: cryptedPassword,
                isBlocked: false,       
                
        }
        await cardRepository.update(id, CardUpdateData)
        
}

export async function blockCard(id : number, password : string){
        const card = await cardRepository.findById(id)
        if(!card){
                throw {code: 404, message: "card not found"}
        }

        const cryptr = new Cryptr('myTotallySecretKey')
        const decryptedPassword = decryptNumber(card.password, cryptr)
        if(decryptedPassword !== password){
                throw {code: 400, message: "invalid password"}
        }

        const CardUpdateData = {
                isBlocked: true,       
                
        }
        await cardRepository.update(id, CardUpdateData)
        return
}

export async function unblockCard(id : number, password : string){
        const card = await cardRepository.findById(id)
        if(!card){
                throw {code: 404, message: "card not found"}
        }
        
        const cryptr = new Cryptr('myTotallySecretKey')
        const decryptedPassword = decryptNumber(card.password, cryptr)
        if(decryptedPassword !== password){
                throw {code: 400, message: "invalid password"}
        }

        const CardUpdateData = {
                isBlocked: false,       
                
        }
        await cardRepository.update(id, CardUpdateData)
        return
}

export async function getBalance(cardId : number){
        const card = await cardRepository.findById(cardId)
        if(!card){
                throw {code: 404, message: "card not found"}
        }
        const payments = await paymentRepository.findByCardId(cardId)
        const recharges = await rechargeRepository.findByCardId(cardId)
        const balance = calcBalance(payments, recharges)
        return {balance, payments, recharges}
}

export async function recharge(cardId: number, amount : number, companyId : number){
        const card = await cardRepository.findById(cardId)
        if(!card){
                throw {code: 404, message: "card not found"}
        }
        if(card.isBlocked){
                throw {code: 400, message: "card is blocked"}
        }
        if(card.expirationDate < dayjs().format("MM-DD")){
                throw {code: 400, message: "card is expired"}
        }
        const employee = await employeeRepository.findById(card.employeeId)
        if(employee.companyId !== companyId){
                throw {code: 400, message: "card is not from this company"}
        }
        const rechargeData = {
                cardId,
                amount,
        }
        await rechargeRepository.insert(rechargeData)
        return

}