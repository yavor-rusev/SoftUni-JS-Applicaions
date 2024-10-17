import { dataService } from "../service/dataService.js";

export async function onDelete(ctx) {
    const userConfirmaton = confirm("Do you really want to delete this item?");

    if (userConfirmaton) {
        const itemId = ctx.params.id;

        await dataService.deleteFurniture(itemId);
        ctx.goTo("/");
    }
}