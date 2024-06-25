Sequelize Commands
1. Create model & migration (table)
npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string
2. Migrate table
sequelize db:migrate