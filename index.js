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
