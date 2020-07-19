function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
}

function createEmployeeRecords(nestedArr) {
  return nestedArr.map(array => {
      return createEmployeeRecord(array)
  });
}

function createTimeInEvent(employee, dateStamp) {
  let time = dateStamp.split(" ")[1];

  employee['timeInEvents'].push({
      type: 'TimeIn',
      hour: parseInt(time, 10),
      date: dateStamp.split(" ")[0]
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let time = dateStamp.split(' ')[1];

    employee['timeOutEvents'].push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date: dateStamp.split(" ")[0]
    })
    return employee;
}

function hoursWorkedOnDate(employee, thisDate) {
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === thisDate
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === thisDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);

  return (employee.payPerHour * hours);
}

function allWagesFor(employee) {
    //use map to return an arr of wagesEarnedOnDate
    //use reduce to sum the elements
    let wageArr = employee.timeOutEvents.map(workDay => {
      return wagesEarnedOnDate(employee, workDay.date)
    });

    return wageArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
}

function calculatePayroll(array) {
  let allWages = array.map(employee => {
      return allWagesFor(employee);
  });

  return allWages.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
  }, 0);
}

function findEmployeeByFirstName(array, name) {
  return array.find(function(employee){
      return employee.firstName === name;
  });
}