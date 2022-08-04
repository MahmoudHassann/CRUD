let name_input = document.getElementById("siteName");
let url_input = document.getElementById("siteUrl");
let search_input = document.getElementById("search")
let ProductList;

if (localStorage.getItem("list") == null) {
    ProductList = [];
}
else {
    ProductList = JSON.parse(localStorage.getItem("list"));
    
}
function submit() {
    let product = {
        name: name_input.value,
        url: url_input.value,
    }
    ProductList.push(product)
    localStorage.setItem("list", JSON.stringify(ProductList));
    DisplayData()
    clear()
}
function clear() {
    name_input.value = "";
    url_input.value = "";
}


function DisplayData() {
    let temp = "";
    for (let i = 0; i < ProductList.length; i++) {
        temp += `<tr>
        <td><h2 class=" ">`+ ProductList[i].name + `</h2></td>
        <td><button class="btn btn-success" onclick="visit(`+ i + `)">Visit</button></td>
        <td><button class="btn btn-outline-warning" onclick="update(`+ i + `)">Update</button></td>
        <td><button class="btn btn-danger" onclick="del(`+ i + `)">Delete</button></td>
        </tr>`
    }

    document.getElementById("List").innerHTML = temp;
}

function visit(index) {
    window.open("https://" + ProductList[index].url,"_blank");
}

function del(index) {
    ProductList.splice(index, 1)
    localStorage.setItem("list", JSON.stringify(ProductList))
    DisplayData()
}

function search(){
    let searchVal = search_input.value;
    let temp ="";
    for(let i=0;i<ProductList.length;i++)
    {
        if(ProductList[i].name.toLowerCase().includes(searchVal.toLowerCase()))
        {
            temp+= `<tr>
            <td><h2 class=" ">`+ ProductList[i].name + `</h2></td>
            <td><button class="btn btn-success" onclick="visit(`+ i + `)">Visit</button></td>
            <td><button class="btn btn-outline-warning" onclick="update(`+ i + `)">Update</button></td>
            <td><button class="btn btn-danger" onclick="del(`+ i + `)">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById("List").innerHTML = temp;
}

function update(index)
{
    let nameVal = name_input.value;
    let urlVal = url_input.value;
    ProductList[index].name = nameVal;
    ProductList[index].url = urlVal;
    localStorage.setItem("list", JSON.stringify(ProductList));
    DisplayData();
}