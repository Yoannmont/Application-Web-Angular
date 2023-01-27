import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Planrepas } from "../../../common/tables/Planrepas";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "BD_TP4",
    password: "root",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ===== TABLE =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult>{
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM BD_TP4.${tableName};`);
    client.release();
    return res;
  }

  // ===== PLANS REPAS =======
  public async filterPlans(
    numeroplan: number,
    categorie: string,
    frequence: number,
    nbrpersonnes: number,
    nbrcalories: number,
    prix: number,
    numerofournisseur: number): Promise<pg.QueryResult>{
      const client = await this.pool.connect();

      const searchTerms: string[] = [];
      if (numeroplan != -1) searchTerms.push(`numeroplan = ${numeroplan}`);
      if (categorie.length > 0) searchTerms.push(`categorie = '${categorie}'`);
      if (frequence != -1) searchTerms.push(`frequence = ${frequence}`);
      if (nbrpersonnes != -1) searchTerms.push(`nbrpersonnes = ${nbrpersonnes}`);
      if (nbrcalories != -1) searchTerms.push(`nbrcalories = ${nbrcalories}`);
      if (prix != -1) searchTerms.push(`prix = ${prix}`);
      if (numerofournisseur != -1) searchTerms.push(`numerofournisseur = ${numerofournisseur}`);

      let queryText = `SELECT * FROM BD_TP4.Planrepas`;
      if (searchTerms.length > 0){
        queryText += " WHERE " + searchTerms.join(" AND ");
      }
      queryText += " ORDER BY numeroplan;";

      const res = await client.query(queryText);
      client.release();
      return res;
    }
  
  public async addPlanrepas(planrepas:Planrepas): Promise<pg.QueryResult>{
    const client = await this.pool.connect();

    const values: (string|number)[] = [
      planrepas.categorie,
      planrepas.frequence,
      planrepas.nbrpersonnes,
      planrepas.nbrcalories,
      planrepas.prix,
      planrepas.numerofournisseur
    ]
    const queryText: string = `INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT, $1,$2,$3,$4,$5,$6);`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async updatePlanrepas(planrepas:Planrepas): Promise<pg.QueryResult>{
    const client = await this.pool.connect();
    const values: (string|number)[] = [
      planrepas.categorie,
      planrepas.frequence,
      planrepas.nbrpersonnes,
      planrepas.nbrcalories,
      planrepas.prix,
      planrepas.numerofournisseur,
      planrepas.numeroplan
    ]
    const queryText: string = `UPDATE BD_TP4.Planrepas \
                              SET categorie = $1,\
                              frequence = $2,\
                              nbrpersonnes = $3,\
                              nbrcalories = $4,\
                              prix = $5,\
                              numerofournisseur = $6\
                              WHERE numeroplan = $7;`;
    const res = await client.query(queryText,values);
    client.release();
    return res;
  }

  public async deletePlanrepas(numeroplan:string): Promise <pg.QueryResult>{
    const client = await this.pool.connect();
    if (!numeroplan) {
      throw new Error("Impossible de supprimer le plan repas sélectionné.");
    }
    const values : string[] = [
      numeroplan
    ]
    const queryText: string = `DELETE FROM BD_TP4.Planrepas WHERE numeroplan = $1;`;
    const res = await client.query(queryText,values);
    client.release();
    return res;
  }

  // ===== CATEGORIES des PLANS REPAS =======
  public async getCategories() : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = 'SELECT DISTINCT(categorie) FROM BD_TP4.Planrepas;';
    const res = await client.query(queryText);
    client.release();
    return res;
  }




}


