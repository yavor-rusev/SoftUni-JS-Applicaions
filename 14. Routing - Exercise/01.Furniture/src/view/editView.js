import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const editTemplate = (item, errors) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onEdit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${!!errors ? errors.make ? "is-invalid" : "is-valid" : ""}" id="new-make" type="text" name="make" value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${!!errors ? errors.model ? "is-invalid" : "is-valid" : ""}" id="new-model" type="text" name="model" value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${!!errors ? errors.year ? "is-invalid" : "is-valid" : ""}" id="new-year" type="number" name="year" value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${!!errors ? errors.description ? "is-invalid" : "is-valid" : ""}" id="new-description" type="text" name="description" value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${!!errors ? errors.price ? "is-invalid" : "is-valid" : ""}" id="new-price" type="number" name="price" value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${!!errors ? errors.img ? "is-invalid" : "is-valid" : ""}" id="new-image" type="text" name="img" value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`

let context = null;
let item = null;
let itemId = null;

export async function showEditView(ctx) {  
    context = ctx;
    context.updateNav();

    itemId = context.params.id;    
    item = await dataService.getFurnitureDetails(itemId);
    context.myRenderer(editTemplate(item, null));
}


async function onEdit(event) {
    event.preventDefault();
    debugger
    const formData = new FormData(event.target);
    const trimmedData = [...formData.entries()].map(([k, v]) => [k, v.trim()]);
    let {description, img, make, material, model, price, year} = Object.fromEntries(trimmedData);

    const errors = {};
    let dataIsValid = true;

    if(make.length < 4) {
        errors.make = true;
        dataIsValid = false;
    }

    if(model.length < 4) {
        errors.model = true;
        dataIsValid = false;
    }

    if(Number(year) <= 1950 || Number(year) >= 2050){
        errors.year = true;
        dataIsValid = false;        
    }

    if(description.length <= 10) {
        errors.description = true;
        dataIsValid = false;
    }

    if(!price || Number(price) < 0) {
        errors.price = true;
        dataIsValid = false;
    }

    if(!img){
        errors.img = true;
        dataIsValid = false;
    }   

    if(dataIsValid) {
        await dataService.updateFurniture(itemId, {description, img, make, material, model, price, year});         
        context.goTo("/");

    }else {
        context.myRenderer(editTemplate(item, errors));
    }
}
/*
description
: 
"Medium table"
img
: 
"./images/table.png"
make
: 
"Table"
material
: 
"Hardwood"
model
: 
"Swedish"
price
: 
235
year
: 
2015
_createdOn
: 
1615545143015
_id
: 
"53d4dbf5-7f41-47ba-b485-43eccb91cb95"
_ownerId
: 
"35c62d76-8152-4626-8712-eeb96381bea8"
*/