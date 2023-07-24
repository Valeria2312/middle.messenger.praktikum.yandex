import Block from "./block";

export function renderDom(appSelector: string, block: Block) {
     let app = document.getElementById(appSelector);
    app!.innerHTML = "";
    app!.append(block.getContent()!);
}