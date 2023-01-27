import { Planrepas } from "../tables/Planrepas";

export interface DialogData{
    planrepas: Planrepas;
    pending: boolean;
    success: boolean;
    update: boolean;
    delete: boolean;
}