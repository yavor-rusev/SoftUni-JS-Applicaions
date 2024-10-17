import { get, post, del } from "./requester.js";
import { showDashboardView } from "./dashboardView.js";

export async function getAllIdeas(ctx) {
    return await get(ctx.endpoints.allIdeas);
}

export async function getIdeaDetails(ctx, ideaId) {
    const url = ctx.endpoints.singleIdea + "/" + ideaId;
    return await get(url);
}

export async function uploadIdea(ctx, idea) {    
    const url = ctx.endpoints.singleIdea;
    await post(url, idea);
}

export async function onDelete(ctx, ideaId) {
    deleteIdea(ctx, ideaId);
    showDashboardView(ctx);
}

async function deleteIdea(ctx, ideaId) {
    const url = ctx.endpoints.singleIdea + "/" + ideaId;
    return await del(url);
}

