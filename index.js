const createEmployeeRecord = function(array) {
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee
};

const createEmployeeRecords = function(array) {
    return array.map(e => createEmployeeRecord(e))
};

const createTimeInEvent = function(record, dateStamp) {
    dateStamp = dateStamp.split(' ');
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp[1]),
        date: dateStamp[0]
    });
    return record
};

const createTimeOutEvent = function(record, dateStamp) {
    dateStamp = dateStamp.split(' ');
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp[1]),
        date: dateStamp[0]
    });
    return record
};

const hoursWorkedOnDate = function (record, d) {
    const timeOut = record.timeOutEvents.find(e => e.date === d);
    const timeIn = record.timeInEvents.find(e => e.date === d);
    return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = function (record, date) {
    const hours = hoursWorkedOnDate(record, date);
    const rate = record.payPerHour;
    return hours * rate
};

const allWagesFor = function(record) {
    const dates = record.timeInEvents.map(e => e.date);
    const wages = dates.map(date => wagesEarnedOnDate(record, date));
    return wages.reduce(
        ( accumulator, currentValue ) => accumulator + currentValue,
        0
    );
};

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(e => e.firstName == firstName)
};

const calculatePayroll = function(array) {
    const wages = array.map(r => allWagesFor(r));
    return wages.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    );
};