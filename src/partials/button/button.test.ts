import { Button } from './button';

describe("", () => {
    it("transfer of props to the button", () => {
        const button = new Button({ name: "отправить" });
        console.log(`btn `, button);
    });
});
