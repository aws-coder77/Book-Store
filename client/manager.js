document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});

google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
// google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                    'width':400,
                    'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function getBookComp() {
    return `
        <div class="height-100 bg-light">
            <h4>Add Book</h4>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Book Title</label>
                    <input type="text" class="form-control" name="title" placeholder="Book Title">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Author</label>
                    <input type="text" class="form-control" name="author" placeholder="Author">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Publication</label>
                    <input type="text" class="form-control" name="pub" placeholder="Publication">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">MRP</label>
                    <input type="number" class="form-control" name="mrp" placeholder="MRP">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Price</label>
                    <input type="number" class="form-control" name="price" placeholder="Price">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Quantity</label>
                    <input type="number" class="form-control" name="quantity" placeholder="Quantity">
                </div>
                <div class="form-group divcenter">
                    <input class="btn btn-primary btn-submit" type="submit" value="Submit">
                </div>
            </form>
        </div>
    `;
}

function getStaffComp() {
    return `
        <div class="height-100 bg-light">
            <h4>Add Staff</h4>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Name</label>
                    <input type="text" class="form-control" name="name" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Email</label>
                    <input type="text" class="form-control" name="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Phone Number</label>
                    <input type="number" class="form-control" name="phone" placeholder="Phone Number">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Password</label>
                    <input type="password" class="form-control" name="passeord" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Address</label>
                    <textarea type="text" class="form-control txtarea" name="address" placeholder="Address"></textarea>
                </div>
                <div class="form-group divcenter">
                    <input class="btn btn-primary btn-submit" type="submit" value="Submit">
                </div>
            </form>
        </div>
    `;
}

function getStatsComp() {
    return `
        <div id="chart_div"></div>
    `;
}

const contentDiv = document.getElementById("main-content");
const addBookDiv = document.getElementById("add_book");
const addStaffDiv = document.getElementById("add_staff");
const statsDiv = document.getElementById("stats");

addBookDiv.addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = getBookComp();
});

addStaffDiv.addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = getStaffComp();
});

statsDiv.addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = getStatsComp();
    drawChart();
});