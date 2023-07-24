import Block from "./block";

export function renderDom(appSelector: string, block: Block) {
    const app = document.getElementById(appSelector);
    app!.innerHTML = "";
    app!.append(block.getContent()!);
}
