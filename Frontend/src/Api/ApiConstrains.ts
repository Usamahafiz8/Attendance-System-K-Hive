
export const ApiConstrains =   {
  Admin : "/auth/login",
//
///attendance
  Attendance:{

    AllAttendance : "/attendance/",
    MarkAttendace : (EmployeeID: string)=> {return "/attendance/" + EmployeeID },
    GetEmployeeAttendance : (EmployeeID : string) => { return "/attendance/EmployeeAttendanceStats/" + EmployeeID},
    GetAttendanceDateWie : (EmployeeID : string) => { return '/attendance/EmployeeAttendance/' + EmployeeID}
  },

  Employee:{
    AddEmployee : "/employee/Add",
    AllEmployee: "/employee/",
    FindEmployee : (ID: string )=>{
        return "/employee/" + ID ;
    },



  }
}
