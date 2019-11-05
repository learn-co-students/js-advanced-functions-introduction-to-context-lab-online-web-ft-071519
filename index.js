// // Your code here
// Assume that employees always check-in and check-out.
// Assume employees always check-in and out on the hour
// The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world
// When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300"
// Employees will never work across days i.e. in at 2200 and out at 0400 the next day.
function createEmployeeRecord(employeeArr) {
   return Object.assign({}, {firstName: employeeArr[0]}, {familyName: employeeArr[1]}, {title: employeeArr[2]}, {payPerHour: employeeArr[3]}, {timeInEvents: []}, {timeOutEvents: []})
}

function createEmployeeRecords(arr) {
    let result = [];
    arr.map(employeeArr => {
        result.push(createEmployeeRecord(employeeArr))
    })
    return result
}

function createTimeInEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(' ')
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date: date })
    return employeeRecord

}

function createTimeOutEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(' ')
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date: date })
    return employeeRecord
}

function hoursWorkedOnDate(employee, timestamp) {
    let timeIn = employee.timeInEvents.find(function (emp) {
        return emp.date === timestamp
    })
    let timeOut = employee.timeOutEvents.find(function (emp) {
        return emp.date === timestamp
    })
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employee, timestamp) {
    let pay = employee.payPerHour
    let hoursWorked = hoursWorkedOnDate(employee, timestamp)
    let wage = (pay * hoursWorked).toString()
    return parseFloat(wage)
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(emp => {
        return emp.date
    })
    let wages = dates.reduce(function (memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return wages
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(function (emp) {
        return emp.firstName === name
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function (memo, emp) {
        return memo + allWagesFor(emp)
    }, 0)
}