import Pocketbase from "pocketbase";
export const dbUrl = `https://feb2024-team5.pockethost.io/`; // Replace with your database URL
const pb = new Pocketbase(dbUrl);
pb.autoCancellation(false);
export default pb;
