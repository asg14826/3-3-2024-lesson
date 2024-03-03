const knex = require('knex')

const data_base = knex({
    client: 'sqlite3',
    connection: {
       // filename: 'memory'
        filename: 'my_db2.db'
    },
    useNullAsDefault: true
})

async function delete_table() {
    await data_base.raw(`DROP TABLE IF EXISTS COMPANY`);
}

delete_table()

async function create_table() {
    data_base.schema.createTableIfNotExists
    await data_base.raw(`CREATE TABLE IF NOT EXISTS COMPANY (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        AGE INT NOT NULL,
        ADDRESS CHAR(50),
        SALARY REAL);`);
}

create_table()

function insert_rows_for_company() {
    `INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Paul', 32, 'California', 20000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Allen', 25, 'Texas', 15000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Teddy', 23, 'Norway', 20000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Mark', 25, 'Rich-Mond ', 65000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('David', 27, 'Texas', 85000.00);
    INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)
    VALUES ('Kim', 22, 'South-Hall', 45000.00);`
    .replaceAll('\n    ', '')
    .split(';')
    .filter(query => query)
    .forEach(async query => { await data_base.raw(query + ';') ;})
}

insert_rows_for_company()

//get all

async function get_all() {
    //const employees = await data_base.raw("select * from COMPANY")
    const employees = await data_base.select('*').from('COMPANY');
    console.log(employees);
}

get_all()
//post
async function insertRow(new_employee) {
    await data_base.raw(`INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY) 
    VALUES ('${new_employee.NAME}', ${new_employee.AGE},'${new_employee.ADDRESS}', ${new_employee.AGE});`)
}

const new_employee = {NAME: 'Dov', AGE: 27, ADDRESS: 'Texas', SALARY: 85000 }
insertRow(new_employee)
//patch
async function updateRow(updated_employee, id) {
    await data_base.raw(`UPDATE COMPANY SET NAME='${updated_employee.NAME}', AGE=${updated_employee.AGE},ADDRESS='${updated_employee.ADDRESS}',SALARY=${updated_employee.SALARY} WHERE id=${id};`)
    // update ... where id = ...
}

const updated_employee = { NAME: 'Dor', AGE: 1001, ADDRESS: 'jerusalem', SALARY: 100 }
updateRow(updated_employee,5 )

//get by id

async function get_by_id(id) {
   let get_by_id= await data_base.raw(`SELECT * from COMPANY WHERE id=${id};`)
   console.log(get_by_id);
    // select * from company where id = ...
}

get_by_id(7)

//delete
async function deleteRow(id) {
    await data_base.raw(`DELETE from COMPANY WHERE id=${id};`)
    // delete ... where id = ...
}

deleteRow(6)