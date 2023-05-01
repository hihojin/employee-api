const express = require('express');
const employeeRouter = express.Router();
const employeeModel = require("../schema/employee");

employeeRouter.post('/', async(req, res) => {
    const {name, age, phoneNumber, yearsOfExp, department, skills} = req.body;
    if (phoneNumber && phoneNumber.toString().match(/\d/g).length!==10) {
        res.send('phone number is not valid');
        return;
    }
    if (!name || !age || !phoneNumber || !department) {
        res.send('required fields are empty');
        return;
    }

    const newEmployee = {
        name,
        age,
        phoneNumber,
        yearsOfExp,
        department,
        skills: []
    };

    if (skills) {
        const skillList = skills.split(',')
        for (let skill of skillList) {
            skill = skill.trim();
            newEmployee.skills.push(skill);
        }
    }

    try {
        await employeeModel.create(newEmployee);
        res.send('new employee has been added');
    } catch(error) {
        res.status(500).send('employee was not created');
    }
})

employeeRouter.get('/', async(req, res) => {
    try {
        const everyEmployee = await employeeModel.find();
        res.send(everyEmployee);
    } catch(error) {
        res.status(500).send('could not bring employee list');
    }
})

// for now searching an employee by their name by following the sample data of employees.
// But it would make more sense to add employee id in db and search by the id instead.
employeeRouter.get('/:name', async(req, res) => {
    const name = req.params.name;
    foundEmployee = await employeeModel.findOne({name: name});
    res.send(foundEmployee);
})

// for now searching an employee by their name by following the sample data of employees.
// But it would make more sense to add employee id in db and search by the id instead.
employeeRouter.put('/:name', async(req, res) => {
    const name = req.params.name;
    const {phoneNumber, skills} = req.body;
    let foundEmployee;

    try {
        foundEmployee = await employeeModel.findOne({name: name});
    }
    catch(error) {
        res.send('user not found');
        return;
    }

    try {
        if (phoneNumber) {
            foundEmployee.phoneNumber = phoneNumber;
        }
        if (skills) {
            const skillList = skills.split(',')
            for (let skill of skillList) {
                skill = skill.trim();
                foundEmployee.skills.push(skill);
            }
        }
        await foundEmployee.save();
        res.send(foundEmployee);
    } catch(error) {
        res.status(500).send('information update was not processed');
    }
})

// for now searching an employee by their name by following the sample data of employees.
// But it would make more sense to add employee id in db and search by the id instead.
employeeRouter.delete('/:name', async(req, res) => {
    const name = req.params.name;
    const foundEmployee = await employeeModel.findOne({name: name});
    try {
        await employeeModel.deleteOne(foundEmployee);
        res.send('deleted the employee');
    }
    catch(error) {
        res.status(500).send('delete failed');
    }

})

module.exports = employeeRouter;