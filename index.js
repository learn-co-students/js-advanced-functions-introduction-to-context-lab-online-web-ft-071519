// Your code here
function createEmployeeRecord(array){

let result = {}
result.firstName = array[0]
result.familyName = array[1]
result.title = array[2]
result.payPerHour = array[3]
result.timeInEvents = []
result.timeOutEvents =[]

  return result
}

function createEmployeeRecords(array){
 let result = []
 array.forEach(function(e) {
    result.push(createEmployeeRecord(e));
  });
 
  return result
}

function createTimeInEvent(employee,datestamp){
  let [date, hour] = datestamp.split(' ')
  employee.timeInEvents.push({       
       type: "TimeIn",
        hour: parseInt(hour, 10),
        date,})
return employee
}

function createTimeOutEvent(employee,datestamp){
  let [date, hour] = datestamp.split(' ')
  employee.timeOutEvents.push({       
       type: "TimeOut",
        hour: parseInt(hour, 10),
        date,})
return employee  
}

function hoursWorkedOnDate(employee, dateday){
  let inobject = employee.timeInEvents.find(function(e){
        return e.date === dateday
    })
    
   let   outobject = employee.timeOutEvents.find(function(e){
        return e.date === dateday
    })
    
    return (outobject.hour - inobject.hour)/100
}

function wagesEarnedOnDate(employee, dateday){
  return hoursWorkedOnDate(employee, dateday) * employee.payPerHour
  
}

function allWagesFor(employee){
  let sum = 0
  employee.timeInEvents.forEach(function(e) {
   sum = sum+ wagesEarnedOnDate(employee, e.date)
  });
  return sum
}
function calculatePayroll(arrayemployees){
  let sum = 0
  arrayemployees.forEach(function(employee){
   sum = sum+ allWagesFor(employee)
  })
  return sum
}

function findEmployeeByFirstName(arrayemployees,firstName){
  let result = arrayemployees.find(function(employee){
        return employee.firstName === firstName
    })
    return result
}