
const cds = require("@sap/cds");

class NorthwindService extends cds.ApplicationService {
    async init() {
        const NorthwindRemote = await cds.connect.to("Northwind");

        this.on("READ", ["Products"], req => {
            return NorthwindRemote.run(req.query)
        });

        return super.init();
    }
}

module.exports = { NorthwindService }
