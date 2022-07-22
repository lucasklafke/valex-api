import app from "../src/app.js";
import client from "../src/config/db.js";
import supertest from "supertest";

describe("cards", () => {
        it("given a card body without apikey, expected 404", async () => {
                const body = {
                        "id" : "1",
                        "type" : "restaurant"
                }
                const response = await supertest(app).post("/create/card").send(body)
                expect(response.statusCode).toBe(404)
        })

        it("given a card body, expected 201", async () => {
                const body = {
                        "id" : "1",
                        "type" : "restaurant"
                }
                const card = await client.query(`SELECT * FROM cards where "employeeId" = 1 and "type" = 'restaurant'`)
                await client.query(`DELETE FROM payments where "cardId" = ${card.rows[0].id}`)
                await client.query(`DELETE FROM cards where "employeeId" = 1 and "type" = 'restaurant'`)
                const apiKey = "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
                const response = await supertest(app).post("/create/card").send(body).set("Authorization", `Bearer ${apiKey}`); 
                expect(response.statusCode).toBe(201)
        })
})










// cardRouter.post("/create/card",schemaValidator(createCardSchema),validateApiKey,createCard)
// cardRouter.post("/activate/card",schemaValidator(activateCardSchema),validateCardCanBeActivated,activateCard)
// cardRouter.post("/block/card",schemaValidator(blockCardSchema),blockOrUnblockValidator("block"),blockCard)
// cardRouter.post("/unblock/card",schemaValidator(blockCardSchema),blockOrUnblockValidator("unblock"),unblockCard)
// cardRouter.post("/recharge/card",schemaValidator(rechargeSchema),validateApiKey, rechargeCard)
// cardRouter.get("/get/balance/:cardId",getBalance)