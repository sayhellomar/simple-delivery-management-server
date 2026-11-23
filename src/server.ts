import app from "./app";
import initDB from "./db";
const port = process.env.PORT || 8000;

function main() {
    initDB();
    app.listen(port, () => {
        console.log(`Delivery management system is running on port ${port}`);
    });
}

main();
