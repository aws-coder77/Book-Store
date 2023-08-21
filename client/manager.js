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

function addBook() {
    return `
        <div class="height-100 bg-light">
            <h4>Add Book</h4>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Book Title</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Book Title">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Author</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Author">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Publication</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Publication">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">MRP</label>
                    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="MRP">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Price</label>
                    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Price">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Quantity</label>
                    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Quantity">
                </div>
                <div class="form-group divcenter">
                    <input class="btn btn-primary btn-submit" type="submit" value="Submit">
                </div>
            </form>
        </div>
    `;
}

function addStaff() {
    return `
        <div class="height-100 bg-light">
            <h4>Add Staff</h4>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Email</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Phone Number</label>
                    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Phone Number">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Password</label>
                    <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Address</label>
                    <textarea type="text" class="form-control txtarea" id="formGroupExampleInput2" placeholder="Address"></textarea>
                </div>
                <div class="form-group divcenter">
                    <input class="btn btn-primary btn-submit" type="submit" value="Submit">
                </div>
            </form>
        </div>
    `;
}

const contentDiv = document.getElementById("main-content");
const addBookDiv = document.getElementById("add_book");
const addStaffDiv = document.getElementById("add_staff");
const statsDiv = document.getElementById("stats");

addBookDiv.addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = addBook();
});

addStaffDiv.addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = addStaff();
});

statsDiv    .addEventListener("click", function (event) {
    event.preventDefault();
    contentDiv.innerHTML = "<p>This is the content for Link 3.</p>";
});