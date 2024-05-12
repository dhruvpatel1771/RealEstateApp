import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import http from "http";
import io from "../socket/app.js";


const app = express();
const server = http.createServer(app);



// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Allow requests from all origins
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// ------------------------------------Deployment---------------------------------------

const __dirname1 =  path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname1,"REALESTATEAPP","/client/dist")));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1, "REALESTATEAPP","client","dist","index.html"))
  })
} else {
  app.get("/",(req,res) =>{
    res.send("API is running Successfully");
  });
}

// Define the directory where the server script is located
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'client/dist' directory
  app.use(express.static(path.join(__dirname,'..', 'client', 'dist')));

  // Serve the 'index.html' file for any route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..','client', 'dist', 'index.html'));
  });
} else {
  // In development mode, respond with a message for the root route
  app.get('/', (req, res) => {
    res.send('API is running successfully');
  });
}

// ------------------------------------Deployment---------------------------------------


io.listen(server);

app.listen(process.env.PORT, () => {
  console.log(`Server is running!`);
});
