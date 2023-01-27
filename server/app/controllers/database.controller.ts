import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import { NextFunction } from "express-serve-static-core";
import Types from "../types";


import { Planrepas } from "../../../common/tables/Planrepas";
import { Fournisseur } from "../../../common/tables/Fournisseur";

import * as pg from "pg";




@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/planrepas", (req : Request, res : Response, _ : NextFunction) =>{
    //=== Planrepas ROUTES ====
      // http://localhost:3000/database/planrepas?categorie=Portugais
      
      var numeroplan = parseInt(req.query.numeroplan as string)? parseInt(req.query.numeroplan as string) : -1;
      var categorie = req.query.categorie as string? req.query.categorie as string: "";
      var frequence = parseInt(req.query.frequence as string) ? parseInt(req.query.frequence as string) : -1;
      var nbrpersonnes = parseInt(req.query.nbrpersonnes as string) ? parseInt(req.query.nbrpersonnes as string) : -1;
      var nbrcalories = parseInt(req.query.nbrcalories as string) ? parseInt(req.query.nbrcalories as string) : -1;
      var prix = parseInt(req.query.prix as string) ? parseInt(req.query.prix as string) : -1;
      var numerofournisseur = parseInt(req.query.numerofournisseur as string) ? parseInt(req.query.numerofournisseur as string) : -1;

      this.databaseService
        .filterPlans(numeroplan, categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur)
        .then((result: pg.QueryResult) => {
          const plansrepas : Planrepas[] = result.rows.map((planrepas: Planrepas) => ({
            numeroplan: planrepas.numeroplan,
            categorie : planrepas.categorie,
            frequence: planrepas.frequence,
            nbrpersonnes: planrepas.nbrpersonnes,
            nbrcalories: planrepas.nbrcalories,
            prix: planrepas.prix,
            numerofournisseur: planrepas.numerofournisseur
          }));
          res.json(plansrepas);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.post("/insert", (req : Request, res : Response, _ : NextFunction) =>{
      const planrepas: Planrepas = {
        numeroplan:req.body.numeroplan,
        categorie:req.body.categorie,
        frequence:req.body.frequence,
        nbrpersonnes:req.body.nbrpersonnes,
        nbrcalories:req.body.nbrcalories,
        prix:req.body.prix,
        numerofournisseur:req.body.numerofournisseur
      };
      this.databaseService
        .addPlanrepas(planrepas)
          .then((result:pg.QueryResult) =>{
            res.json(result.rowCount);
          })
          .catch((e:Error) => {
            console.error(e.stack);
            res.json(-1);
          });
    });

    router.put("/update", (req : Request, res : Response, _ : NextFunction) =>{
      const planrepas: Planrepas = {
        numeroplan:req.body.numeroplan,
        categorie:req.body.categorie,
        frequence:req.body.frequence,
        nbrpersonnes:req.body.nbrpersonnes,
        nbrcalories:req.body.nbrcalories,
        prix:req.body.prix,
        numerofournisseur:req.body.numerofournisseur
      };
      this.databaseService
        .updatePlanrepas(planrepas)
          .then((result:pg.QueryResult) =>{
            res.json(result.rowCount);
          })
          .catch((e:Error) => {
            console.error(e.stack);
            res.json(-1);
          });
    });

    router.delete("/delete/:numeroplan", (req : Request, res : Response, _ : NextFunction) =>{
      const numeroplan: string = req.params.numeroplan;
      this.databaseService
        .deletePlanrepas(numeroplan)
          .then((result:pg.QueryResult) =>{
            res.json(result.rowCount);
          })
          .catch((e:Error) => {
            console.error(e.stack);
            res.json(-1);
          });
    });


    //=== Fournisseurs ROUTES ====
    router.get("/fournisseur", (req : Request, res : Response, _ : NextFunction) =>{
      this.databaseService
        .getAllFromTable("Fournisseur")
        .then((result: pg.QueryResult) => {
          const fournisseurs : Fournisseur[] = result.rows.map((fournisseur: Fournisseur) => ({
            numerofournisseur : fournisseur.numerofournisseur,
            nomfournisseur : fournisseur.nomfournisseur,
            adressefournisseur : fournisseur.adressefournisseur
          }));
          res.json(fournisseurs);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    })

    router.get("/categories", (req : Request, res : Response, _ : NextFunction) =>{
      this.databaseService
        .getCategories()
        .then((result: pg.QueryResult) => {
          const categories : String[] = result.rows;
          res.json(categories);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    })


    return router;
  }
}
