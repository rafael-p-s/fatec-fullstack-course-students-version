import { Sequelize } from "sequelize";

export const connection = new Sequelize({
    dialect: 'sqlite',
    storage:  "./db.sqlite",
})

// Vamos iniciar o banco de dados, fazendo o connect com o banco.
export async function ininitializeDatabase(){
    try{
        await connection.authenticate();
        await connection.sync();
    }catch(error){
        console.log(`Unable to connect the database: ${error}`)
    }
}