import { promises as fs } from "fs";

const configFile = async () => {
    const file = await fs.readFile(process.cwd() + "/config.json", "utf8");
    return JSON.parse(file);
};

export default configFile;
