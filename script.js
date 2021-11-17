const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const cancel = document.getElementById("tlqkf")


populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function upedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const soldseats = document.querySelectorAll(".row .seat.sold");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const soldseatsIndex = [...soldseats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  localStorage.setItem("soldSeats", JSON.stringify(soldseatsIndex));


  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const soldseats = JSON.parse(localStorage.getItem("soldSeats"));

  if (soldseats !== null && soldseats.length > 0) {
    seats.forEach((seat, index) => {
      if (soldseats.indexOf(index) > -1) {
        seat.classList.add("sold");
      }
    });
  }



  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", function(e){
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  upedCount();
});
cancel.addEventListener("click",function(e){
  var count =0;

  for(var i in seats)
  {
    if(seats.item(i).classList.contains("selected")&&!seats.item(i).classList.contains("sold"))
    {
      count+=1;
      seats.item(i).classList.add("sold");
      alert(i);
    }
  }
  upedCount();
  if(count!=0)
  {

  }
})
// var patt = new RegExp("[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}");
// var res = patt.test( $("#tlno").val());

// if( !patt.test( $("#tlno").val()) ){
//     alert("전화번호를 정확히 입력하여 주십시오.");
//     return false;
// }


// Seat click event
container.addEventListener("click", function(e){
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold") )
  {

    e.target.classList.toggle("selected");

    upedCount();
  }
});

// Initial count and total set
upedCount();

