export function showHomeView(ctx) {
    const context = ctx;    
    context.refs.main.replaceChildren();    
    context.refs.main.appendChild(context.refs.homeDiv);    
}