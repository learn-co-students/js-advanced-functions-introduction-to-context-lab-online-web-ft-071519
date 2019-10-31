
// process an Array of Arrays into an Array of employee records
// ✓ has a function called createEmployeeRecords
// createEmployeeRecords
// 7) creates two records
// 8) correctly assigns the first names



// 9) has a function called createTimeInEvent
// createTimeInEvent

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record

// 10) creates the correct type
// 11) extracts the correct date
// 12) extracts the correct hour




// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// 13) has a function called createTimeOutEvent
// createTimeOutEvent
// 14) creates the correct type
// 15) extracts the correct date
// 16) extracts the correct hour
// Given an employee record with a date - matched timeInEvent and timeOutEvent
// 17) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
// hoursWorkedOnDate
// 18) calculates that the employee worked 2 hours
// Given an employee record with a date - matched timeInEvent and timeOutEvent
// 19) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
// 20) calculates that the employee earned 54 dollars
// Given an employee record with MULTIPLE date - matched timeInEvent and timeOutEvent
// 21) allWagesFor aggregates all the dates' wages and adds them together
// allWagesFor
// 22) calculates that the employee earned 378 dollars
// Given an array of multiple employees
// 23) calculatePayroll aggregates all the dates' wages and adds them together
// calculatePayroll
// 24) calculates that the employees earned 770 dollars
// runs payroll using the mock data provided by Ultron data systems
// Dependent functions: createEmployeeRecords
// takes CSV data, returns an array of employee records
// ✓ exists
// 25) returns an Array with 2 records for Loki and Natalia
//       Dependent functions: findEmployeeByFirstName
// 26) exists
// 27) finds "Loki"
// Full Payroll Test
// from several imported CSV structures
// calculatePayroll
// 28) exists
// 29) correctly sums the payroll burden to $11, 880 when passed an array of employee records

const createEmployeeRecord = function (arrayOfEmployeeInfo) {
    const employee = {
        firstName: arrayOfEmployeeInfo[0],
        familyName: arrayOfEmployeeInfo[1],
        title: arrayOfEmployeeInfo[2],
        payPerHour: arrayOfEmployeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = function(arrayOfEmployeeInfo) {
    return arrayOfEmployeeInfo.map(function(employeeInfo) {
        return createEmployeeRecord(employeeInfo)
    })
}
// Arrow version of createEmployeeRecords
// const createEmployeeRecords = function(arrayOfEmployeeInfo) {
//     return arrayOfEmployeeInfo.map(r => createEmployeeRecord(r))
// }

const createTimeInEvent = function(employeeRecord, dateTimeString) {
   
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0] 
    });

    return employeeRecord
}

const createTimeOutEvent = function (employeeRecord, dateTimeString) {
    
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    });

    return employeeRecord
}

const hoursWorkedOnDate = function (employee, date) {    
    // Arrow version.
    let timeOutDate = employee.timeOutEvents.find((e) => {
        return e.date === date
    })
    /* // Regular version.
    employee.timeOutEvents.find(function(e){
        return e.date === date
    })
    */
   
   let timeInDate = employee.timeInEvents.find((e) => {
       return e.date === date
    })
    
    return (timeOutDate.hour - timeInDate.hour)/100
}

const wagesEarnedOnDate = function(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}


const allWagesFor = function(employee) {
    let datesWorked = employee.timeInEvents
    // console.log(datesWorked)
   
    let totalWages = 0
    
    datesWorked.forEach(function(e) { 
        totalWages += wagesEarnedOnDate(employee, e.date)
    })

    return totalWages
}


const findEmployeeByFirstName = function(employeesArray, firstName) {
    
    return employeesArray.find(function(emp) {
        // console.log(employeesArray)
        // console.log(emp.firstName)
        // console.log(emp.firstName === firstName)
        return emp.firstName === firstName
    })
}

const calculatePayroll = function(employeesArray) {
   
    return employeesArray.reduce(function(totalPayroll, employee) {
        console.log(totalPayroll)
        console.log(employee)
        return totalPayroll + allWagesFor(employee)
    }, 0)
}
