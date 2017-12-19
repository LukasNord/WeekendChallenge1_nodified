console.log('js');


$(document).ready(start);

function start(){
  console.log('jQuery');
$('#submit').on('click', formSubmit);
$('#tableBody').on('click', '.deleteRow', deleteRow);
}// end start function

class Employee {

  constructor(firstName,lastName,idNum,jobTitle,annualSalary){
    this.firstName=firstName;
    this.lastName=lastName;
    this.idNum=idNum;
    this.jobTitle=jobTitle;
    this.annualSalary=annualSalary;
  }//end constructor
  monthlyCost(){
    var mCost = (this.annualSalary / 12);
    return Number(mCost.toFixed(2));
  }//end monthly Cost
}//end class

var costArray = []; //track our monthly costs as they are submitted
var trackDeletes = []; //track monthly costs as they are deleted

function formSubmit(){
  //create new employee object
  employee = new Employee($('#firstName').val(),$('#lastName').val(),$('#idNum').val(),$('#jobTitle').val(),$('#annualSalary').val());

  //save our employee cost data for future manipulation.
  costArray.push( employee.monthlyCost() );
  //send employee data to the DOM
  var $row = $('tbody:last-child');
  $row.append('<tr><td>' + employee.firstName + '</td><td>' + employee.lastName + '</td><td>' + employee.idNum + '</td><td>' + employee.jobTitle + '</td><td>' + employee.annualSalary+ '</td><td class="monthlyCost">' + employee.monthlyCost() + '</td><td id="deleteButton"><button type="button" class="deleteRow">' + 'Delete' + '</button></td></tr>');

  updateMonthly(); //calculate monthlyCost and push to DOM
  //clear inputs
  $('input').val('');
}//end formSubmit

function deleteRow(){

  var confirm = window.confirm("Are you sure you want to delete this row?");
  if (confirm == true){
    //send deleted selection to an array.
    trackDeletes.push(Number($(this).closest('tr').find('.monthlyCost').text()));
    updateMonthly(); //calculate monthlyCost and push to DOM
    $(this).parent().parent().fadeOut('slow');
  }//end if statement
}//end deleteRow

//calculate monthlyCost and push to DOM
function updateMonthly(){
  var monthlyTotalCost = 0;
  var totalDeletes = 0;
  var totalAnnual = 0;

  for(var i = 0; i<trackDeletes.length;i++){
    totalDeletes += trackDeletes[i];
  }//end for loop
  for(var k= 0; k<costArray.length; k++){
    monthlyTotalCost +=  costArray[k];
  }//end for loop
  var pushNewTotal = (monthlyTotalCost - totalDeletes).toFixed(2);
  $('#showCost').text('$' + pushNewTotal);

  //update total annual cost
  totalAnnual = Number((monthlyTotalCost - totalDeletes) * 12).toFixed(2);
  $('#totalAnnual').text('$' + totalAnnual);

}//end updateMonthly
