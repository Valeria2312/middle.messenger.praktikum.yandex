import layout from "./components/layout/layout.js";

export default class Router
{
    container = null;
    routes = {};
    constructor(container) {
        if(Router._instans !== null) return Router._instans;
        this.container = container;
        Router._instans = this;
    }
    add(url, page) {
        this.routes[url] = page;
        return this
    }
    go(url) {
        window.history.pushState({}, '', url)
        this.container.innerHTML = '';

        for(let _url in this.routes) {
            if(_url == url) {
                this.container.append(layout(this.routes[_url]()));
                return;
            }
        }
        this.container.append(layout(''))
    }
}
Router._instans = null;
Router.do = function (url) {
    if(Router._instans !==null) Router._instans.go(url)
}