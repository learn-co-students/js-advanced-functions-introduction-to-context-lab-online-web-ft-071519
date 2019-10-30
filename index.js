const createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    let employee = {};
    employee.firstName = firstName;
    employee.familyName = familyName;
    employee.title = title;
    employee.payPerHour = payPerHour;
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

const createEmployeeRecords = function(arrays) {
    return arrays.map(createEmployeeRecord)
}

const createTimeInEvent = function(employee, dateStamp) {
    let timeIn = {};
    timeIn.type = "TimeIn";
    timeIn.hour = parseInt(dateStamp.split(" ")[1], 10);
    timeIn.date = dateStamp.split(" ")[0];
    employee.timeInEvents.push(timeIn);
    return employee
}

const createTimeOutEvent = function(employee, dateStamp) {
    let timeOut = {};
    timeOut.type = "TimeOut";
    timeOut.hour = parseInt(dateStamp.split(" ")[1], 10);
    timeOut.date = dateStamp.split(" ")[0];
    employee.timeOutEvents.push(timeOut);
    return employee
}

const hoursWorkedOnDate = function(employee, dateStamp) {
    let timeOut = employee.timeOutEvents.find(function(event) {return event.date === dateStamp})
    let timeIn = employee.timeInEvents.find(function(event) {return event.date === dateStamp})
    return employee.hoursWorked = (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(employee, dateStamp) {
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

const allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(event) {return event.date});
    // return dates.reduce(function(total, date) {
    //     console.log(total)
    //     console.log(date)
    //     return total + wagesEarnedOnDate(employee, date)
    // })
    let total = 0
    dates.forEach(date => {
        total += wagesEarnedOnDate(employee, date)
    });
    return total
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    function nameMatch(employee) {
        return employee.firstName === firstName
    }
    return srcArray.find(nameMatch)
}

const calculatePayroll = function(srcArray) {
    let total = 0
    srcArray.forEach(employee => {
        total += allWagesFor(employee)
    });
    return total
}