const reader = require("readline-sync");
const fs = require('fs');
const uuid = require('uuid');

let myDB = {
    users: []
};

function updateDB() {
    fs.writeFileSync(
        './myDB.json',
        JSON.stringify(myDB, null, 4),
        {flag: 'w+'}
    );
}

// checks if db is not created, then initializes an empty boiler plate
fs.writeFileSync('./myDB.json', '', {flag: 'a+'});
if (fs.readFileSync('./myDB.json', {encoding: "utf-8"}) === '') {
    updateDB();
}

// read content from db file, and update my_db variable.
myDB = JSON.parse(fs.readFileSync('./myDB.json', {encoding: "utf8"}));

let notifyMsg = 'Hello!';
function setMessage(msg) {
    notifyMsg = msg;
}

function displayMessage() {
    if (notifyMsg !== null) {
        console.log(`\n\t :: ${notifyMsg}\n`);
        notifyMsg = null
    }
}

const main=()=>{
    while (true){

      console.clear()
        console.log("\u001b[33mPlease Login or Sign-Up")
       loginPage();
      break;
    }
}

const timeOut=()=>{
    console.clear()
    console.log(" \u001b[36mWelcome to Our FaceBook")
    setTimeout(main, 3000)

}


const loginPage=()=> {
    while (true) {
        console.clear();
        displayMessage();
        console.log("\u001b[31m1. Sign-Up:");
        console.log("\u001b[35m2. Login");
        console.log("\u001b[36m3. Forget Password?");
        console.log("\u001b[33m0. Exit\u001b[0m");
        const n = parseInt(reader.question("Enter Value: "));
        if (isNaN(parseInt(n))) {
            setMessage('Invalid Input! Please  Enter  Valid Input')
            continue;
        }
        if (n === 0) {
            console.log("Thanks for Visiting!")
            break;
        }
        else if (n === 1) {
            signUp();
        } else if (n === 2) {
            loginUser();
        }
    }
}
    function loginUser() {
     while (true){
         console.clear()
         displayMessage()
        const epassword = (reader.question("Enter Email/Number:"));
        const password = (reader.question("Enter Password:"));
        // check user if exist with phone and email.
        const users = myDB.users.filter(u => {
            return (u.email=== epassword || u.phone == epassword) && u.password === password
        });

        if (users.length === 0) {
            setMessage("User Not found, Please Register!")
            return;
        }

        else if (users.length === 1) {
            // setMessage(`\u001b[32mWelcome ${users[0].name}`)
            setMessage(`Welcome ${users.name} .`);
        }
     }

    }




function signUp() {
    const activated = true;
    while (true) {
        console.clear()
        displayMessage();
        const name = reader.question("Enter Name:");
        const phone = parseInt(reader.question("Enter Phone:"));
        if (isNaN(parseInt(phone))) {
            setMessage('Invalid Input! Please  Enter Again All Values')
            continue;
        }
        const address = reader.question("Enter Address:");
        const cnic = parseInt(reader.question("Enter Cnic:"));
        if (isNaN(parseInt(cnic))) {
            setMessage('Invalid Input! Please  Enter Again All Values')
            continue;
        }
        const email = reader.question("Enter Email:");
        const password = reader.question("Enter Password:");

        // check user if exist with phone and email.
        const isUserExist = myDB.users.filter(u => {
            return u.email === email && u.phone === phone
        }).length === 1;

        if (isUserExist) {
            setMessage("User Already Exist, Please Login!")
            return;
        }
        myDB = {
            ...myDB,
            users: [
                ...myDB.users,
                createUserEntity(
                    uuid.v4(),
                    name,
                    phone,
                    address,
                    cnic,
                    password,
                    email,
                    activated,
                )
            ]
        }
        updateDB();
        setMessage(`${name}, Thanks for Registering!`)
        break;
    }
}
function createUserEntity(id, name, phone, address, cnic, password, email,) {
    return {
        id: id,
        name: name,
        phone: phone,
        address: address,
        cnic: cnic,
        password: password,
        email: email,
        activated: false,
    }
}


timeOut();


// if(epassword===myDB.users.email){
//    return  myDB.users.email;
// }else if(epassword===myDB.users.phone){
//    return  myDB.users.phone;
// }

// const f = typeof epassword === 'string' || epassword instanceof String
