#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// initialize use balnce and pin code 
let myBalance = 10000;
let myPin = 5555;
// Print a Welcome Message 
console.log(chalk.blue("\n \tWelcome to Huzair Ahmed - ATM Machine\n "));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nCorrect pin, Login Succesfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select a withdrwal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(chalk.blueBright(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (WithdrawAns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount to Withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Succesfully`);
                console.log(chalk.greenBright(`Your remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
