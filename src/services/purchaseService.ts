import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import { getBalance } from "./cardService.js";
import Cryptr from "cryptr";
import dayjs from "dayjs"

function decryptNumber(number : string, cryptr : Cryptr){
        const decryptedString = cryptr.decrypt(number);
        return decryptedString
}
export async function purchase(cardId : number, password : string, amount : number, businessId : number){

        const card = await cardRepository.findById(cardId)
        if(!card){
                console.log("card not found")
                throw  {code : 404, message : "card not found"}
        }
        if(card.isBlocked === true || card.expirationDate < dayjs().format("MM-DD")){
                throw  {code : 500, message:"Card is blocked or expired"}
        }

        const cryptr = new Cryptr('myTotallySecretKey')
        const decryptPassword = decryptNumber(card.password, cryptr)

        if(decryptPassword !== password){
                throw  {code:401 ,message:"Password is incorrect"}
        }

        const business = await businessRepository.findById(businessId)
        if(!business){
                throw  {code:404, message: "Business not found"}
        }
        if(business.type !== card.type){
                throw  {code:401, message: "Business type is incorrect"}
        }
        const balance = await getBalance(cardId)
        if(balance < amount){
                throw  {code:401, message: "Not enough balance"}
        }
        await paymentRepository.insert({cardId, businessId, amount})
}