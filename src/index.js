import "./style.css";
import startGame from "./controllers/Game";
import renderUI from "./views/DOM";
import createPlayer from "./models/Player";

startGame(renderUI, createPlayer());
