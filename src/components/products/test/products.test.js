import chai from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";
import { ProductsController } from "../productsController.js";
import dotenv from "dotenv";
dotenv.config();


const { expect } = chai;
const requester = supertest(`${process.env.DOMAIN_NAME}`);

describe("Products API", () => {
  let productsController = new ProductsController();

  describe("GET /products", () => {
    it("should get all products", (done) => {
      requester.get("/api/products").end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body.payload).to.be.an("array");
        done();
      });
    });
  });

  describe("GET /products/:pid", () => {
    it("should get a product by id", (done) => {
      const productId = "63fd0407e34d90b073107b6a"; // Reemplaza con un ID de producto existente en la base de datos
      requester.get(`/api/products/${productId}`).end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body[0]).to.be.an("object");
        expect(res.body[0]._id).to.equal(productId);
        done();
      });
    });

    it("should return an error if the product id is invalid", (done) => {
      const invalidProductId = "invalid_id";
      requester.get(`/products/${invalidProductId}`).end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an("object");
        done();
      });
    });
  });
});
