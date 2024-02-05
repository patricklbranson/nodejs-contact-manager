/*
 *  Copyright 2024 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error.middleware");
const connectDb = require("./config/db.config");

// Allows access to the .env file(s)
require("dotenv").config();

connectDb();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", require("./routes/contact.route"));
app.use("/api/users", require("./routes/user.route"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is Listening on Port: ${PORT}`);
});
